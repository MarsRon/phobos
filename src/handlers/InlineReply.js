import { APIMessage, Structures } from 'discord.js'

class ExtAPIMessage extends APIMessage {
  resolveData () {
    if (this.data) return this
    super.resolveData()
    if (this.data.allowed_mentions === undefined) {
      this.data.allowed_mentions = {}
    }
    Object.assign(this.data.allowed_mentions, { replied_user: false })
    if (this.options.replyTo !== undefined) {
      Object.assign(this.data, {
        message_reference: { message_id: this.options.replyTo.id }
      })
    }
    return this
  }
}

class Message extends Structures.get('Message') {
  reply (content, options) {
    return this.channel.send(
      ExtAPIMessage.create(
        this, content, options, { replyTo: this }
      ).resolveData()
    )
  }

  edit (content, options) {
    return super.edit(
      ExtAPIMessage.create(this, content, options).resolveData()
    )
  }
}

Structures.extend('Message', () => Message)
