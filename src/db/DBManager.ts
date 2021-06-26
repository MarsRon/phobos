import mongoose, { Document, Model, Schema } from 'mongoose'

/**
 * Class representing a database item.
 * @extends Map
 */
export class DBItem extends Map {
  id: string
  _doc: Document
  _saving: boolean = false

  _set = Map.prototype.set

  /**
   * Create a database item.
   * @constructor
   * @param {string} id - ID of this item
   * @param {Document} doc - mongoose Document of this item
   * @param {Schema} schema - Schema of this database
   * @param {Object} defaultValues - Default values of this database
   */
  constructor (id: string, doc: Document, defaultValues: Record<string, any>) {
    super()

    this.id = id
    this._doc = doc

    this.set('id', id)

    const docValues = doc.toObject() as Record<string, any>
    for (const [key, value] of Object.entries(defaultValues)) {
      this.set(key, docValues[key] ?? value)
    }

    return this
  }

  /**
   * Save this item to the database.
   * @returns {DBItem}
   */
  save (): DBItem {
    if (!this._saving) {
      this._saving = true
      this._doc.save().then(() => {
        this._saving = false
      })
    }
    return this
  }

  /**
   * Set a value of this item.
   * @param {string} key - Key
   * @param {any} value - Value
   * @returns {DBItem}
   */
  set (key: string, value: any) {
    this._set(key, value)
    this._doc.set(key, value)
    this.save()
    return this
  }

  /**
   * Set multiple values of this item at once.
   * @param {object} keyValue - Keys and values in Object form
   * @returns {DBItem}
   */
  setMultiple (keyValue: Record<string, any>): DBItem {
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
  inc (key: string, increment: any): DBItem {
    return this.set(key, this.get(key) + increment)
  }
}

const IDSchema = {
  id: { type: String, required: true, unique: true }
}

/** Class representing a database item manager. */
class DBManager {
  name: string
  defaultValues: Record<string, any>
  schema: Schema

  Model: Model<Document>
  cache: Map<string, DBItem>

  constructor (
    name: string,
    schema: Schema = new Schema(IDSchema),
    defaultValues: Record<string, any> = {}
  ) {
    /**
     * Name of this database.
     * @type {string}
     */
    this.name = name

    /**
     * Schema of this database.
     * @type {Schema}
     */
    this.schema = schema.add(IDSchema)

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
  async get (id: string): Promise<DBItem> {
    let item = this.cache.get(id)
    if (item !== undefined) {
      return item
    }

    let doc = await this.Model
      .findOne({ id })
    if (doc === null) {
      doc = await this.Model
        .create({ id, ...this.defaultValues })
    }

    item = new DBItem(id, doc, this.defaultValues)
    this.cache.set(id, item)

    return item
  }

  /**
   * Obtain all items from the database, or the items cache if it's already available.
   * @returns {Promise<DBItem[]>}
   */
  async getAll (): Promise<DBItem[]> {
    const docs = await this.Model.find()
    return docs.map(doc => new DBItem(doc.id, doc, this.defaultValues))
  }

  /**
   * Refresh all items in the database.
   * @returns {Promise<DBItem[]>}
   */
  refreshAll (): Promise<DBItem[]> {
    this.cache.clear()
    return this.getAll()
  }
}

export default DBManager
