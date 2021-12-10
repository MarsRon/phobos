const mongoose = require('mongoose')
const { Model, Schema } = mongoose

/**
 * Class representing a database item.
 * @extends Map
 */
class DBItem extends Map {
  _saving = false
  _set = Map.prototype.set
  /**
   * Create a database item.
   * @constructor
   * @param {string} id - ID of this item
   * @param {Document} doc - mongoose Document of this item
   * @param {Schema} schema - Schema of this database
   * @param {Object} defaultValues - Default values of this database
   */
  constructor (id, doc, defaultValues) {
    super()

    this.id = id
    this._doc = doc

    this._set('id', id)

    const docValues = doc.toObject()
    for (const [key, value] of Object.entries(defaultValues)) {
      this._set(key, docValues[key] ?? value)
    }

    return this
  }

  /**
   * Save this item to the database.
   * @returns {DBItem}
   */
  save () {
    this._doc.save()
    return this
  }

  /**
   * Set a value of this item.
   * @param {string} key - Key
   * @param {any} value - Value
   * @returns {DBItem}
   */
  set (key, value) {
    this._set(key, value)
    this._doc.set(key, value)
  }

  /**
   * Set multiple values of this item at once.
   * @param {object} keyValue - Keys and values in Object form
   * @returns {DBItem}
   */
  setMultiple (keyValue) {
    for (const [key, value] of Object.entries(keyValue)) {
      this._set(key, value)
      this._doc.set(key, value)
    }
    return this.save()
  }

  /**
   * Increment a value of this item.
   * @param {string} key - Key
   * @param {any} increment - Increment value
   * @returns {DBItem}
   */
  inc (key, increment) {
    return this.set(key, this.get(key) + increment)
  }

  /**
   * Get the values of this item as an Object.
   * @returns {Object}
   */
  data () {
    return Object.fromEntries(this)
  }
}

const IdSchema = {
  id: { type: String, required: true, unique: true }
}

/** Class representing a database item manager. */
class DBManager {
  constructor (name, schema = new Schema(IdSchema), defaultValues = {}) {
    /**
     * Name of this database.
     * @type {string}
     */
    this.name = name

    /**
     * Schema of this database.
     * @type {Schema}
     */
    this.schema = schema.add(IdSchema)

    /**
     * Default values of this database.
     * @type {Object}
     */
    this.defaultValues = defaultValues

    /*
      NOTE:
      The following line makes VSCode intellisense very very slow 😑
      I use 'new Model()' instead of 'mongoose.model()' when I want intellisense
      But 'new Model()' is only used for intellisense, it won't actually work as code
    */

    /**
     * mongoose Model of this database.
     * @type {Model}
     */
    this.Model = mongoose.model(this.name, this.schema)

    /**
     * Item cache of this database.
     * @type {Map}
     */
    this.cache = new Map()
  }

  /**
   * Obtain a item from the database, or the item cache if it's already available.
   * @param {string} id - ID of the item
   * @returns {Promise<DBItem>}
   */
  async get (id) {
    let item = this.cache.get(id)
    if (typeof item !== 'undefined') {
      return item
    }

    let doc = await this.Model.findOne({ id })
    if (doc === null) {
      doc = await this.Model.create({ id, ...this.defaultValues })
    }

    item = new DBItem(id, doc, this.defaultValues)
    this.cache.set(id, item)

    return item
  }

  /**
   * Obtain all items from the database, or the items cache if it's already available.
   * @returns {Promise<DBItem[]>}
   */
  async getAll () {
    const docs = (await this.Model.find()).map(doc => {
      const item = new DBItem(doc.id, doc, this.defaultValues)
      this.cache.set(item.id, item)
      return item
    })
    return docs
  }

  /**
   * Refresh all items in the database.
   * @returns {Promise<DBItem[]>}
   */
  refreshAll () {
    this.cache.clear()
    return this.getAll()
  }
}

module.exports = DBManager
