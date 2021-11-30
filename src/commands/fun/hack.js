const { MessageEmbed } = require('discord.js')
const config = require('../../config')
const { getUserFromMessage } = require('../../utils')

const { color } = config.embed

const domains = [
  'yousuck.noob',
  'mail.discord.com',
  'hesnoob.haha',
  'thisguy.suck',
  'paypal.removed',
  'noob.haha',
  'hacked.xyz',
  'susmate.com',
  'gmail.sus',
  'why-im.withyou',
  'someone-end.me',
  'isnoob.io',
  'you-are.noob',
  'hahaget.lost',
  'yahoo.sus',
  'botmail.zip',
  'gmail.com',
  'yahoo.com'
]

const passwords = [
  'Disb\\*\\*\\*\\*',
  'mdsb\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*',
  'disc\\*\\*\\*\\*\\*\\*',
  'pass\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*',
  'get\\*\\*\\*\\*',
  'mails\\*\\*\\*',
  'endm\\*\\*\\*\\*',
  'gamer\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*',
  'asegeio\\*\\*\\*\\*\\*\\*\\*\\*\\*',
  'whys\\*\\*\\*\\*\\*\\*\\*',
  'Brot\\*\\*\\*\\*\\*\\*',
  'imwith\\*\\*\\*\\*\\*\\*\\*',
  'lucky-you-got-this-password-lol-nocencor',
  'starb\\*\\*\\*\\*\\*\\*\\*',
  'egghunt2\\*\\*\\*',
  'secr\\*\\*\\*\\*\\*'
]

const ips = [
  '10.313.523.502.00.1',
  '25.537.753.462.29.2',
  '21.175.866.974.07.08',
  '32.653.587.825.35.5',
  '12.172.764.781.22.8',
  '91.723.242.452.09.3',
  '92.743.116.896.85.6',
  '84.091.000.853.54.7',
  '51.071.124.129.12.0'
]

/**
 * Get random element from array
 * @param {array} array Input array
 * @returns Random element
 */
const rand = array => array[Math.floor(Math.random() * array.length)]

/**
 * Promise wait for seconds
 * @param {number} sec Seconds to wait
 * @returns {Promise<void>}
 */
const wait = sec => new Promise(res => setTimeout(res, sec * 1000))

module.exports = {
  name: 'hack',
  description: "Hack some 8yo's account",
  args: true,
  usage: '<user>',
  async execute (message, args) {
    try {
      const { channel } = message
      const target = await getUserFromMessage(message, args[0])

      // Random fake email password and IP address
      const domain = rand(domains)
      const password = rand(passwords)
      const ip = rand(ips)

      // Hack sequence
      message.reply(`Hacking ${target}...`)
      const msg = await channel.send('Status: □□□□□□□□□□ 3%: Hacking Email...')
      await wait(1.5)
      msg.edit(`Status: ■□□□□□□□□□ 9%: Hacked email\nEmail: ${target.username}@${domain}\nPassword: ${password}`)
      await wait(2.3)
      msg.edit('Status: ■■□□□□□□□□ 12%: Turning off the antivirus...')
      await wait(1.4)
      msg.edit('Status: ■■■□□□□□□□ 24%: Logging in to the Email...')
      await wait(1.7)
      msg.edit('Status: ■■■■□□□□□□ 36%: Downloading SYNAPSE X...')
      await wait(1.3)
      msg.edit('Status: ■■■■■□□□□□ 47%: Deleting Captcha...')
      await wait(1.6)
      msg.edit('Status: ■■■■■■□□□□ 54%: Deleting Paypal account...')
      await wait(1.46)
      msg.edit('Status: ■■■■■■■□□□ 69%: Email password changed')
      await wait(3)
      msg.edit(`Status: ■■■■■■■■□□ 79%: IP address found: ${ip}`)
      await wait(1.8)
      msg.edit('Status: ■■■■■■■■■□ 85%: Starting DDoS attack on IP address...')
      await wait(1.2)
      msg.edit('Status: ■■■■■■■■■■ 97%: Almost there...')
      await wait(2)
      await msg.edit('Status: ■■■■■■■■■■ 100%: Completed')

      // Hacking result
      const embed = new MessageEmbed()
        .setTitle('Hacking completed successfully')
        .setDescription(`${target} has been hacked!`)
        .addField('INFO', 'Information about the user that you hacked.')
        .addField('EMAIL', `${target.username}@${domain}`)
        .addField('PASSWORD', password)
        .addField('IP address', ip)
        .setFooter("Wow you hacked some 8yo's account, you happy now?")
        .setColor(color)
      
      channel.send({ embeds: [embed] })
    } catch (error) {
      message.client.log.error(error)
      message.reply(
        ":x: Hacking failed. You've been found out by the FBI. Run while you can."
      )
    }
  }
}
