const { EmbedBuilder } = require('discord.js')
const config = require('../../config')
const { getUserFromMessage } = require('../../utils')

const { color } = config.embed

const domains = [
  'rickroll.xyz',
  'nevergonnagiveyouup.lol',
  'superidol.xiaorong',
  'bobux.free',
  'get.free.vbux',
  'free-mc.net',
  'sussy.baka.sus',
  'jenshin.impact',
  'get-rekt.haha',
  'urnoob.boo',
  'amogus.sus',
  'roblox.guest',
  'deez.nuts',
  'ur-getting.ddos',
  'yousuck.cringe',
  'getlostya.bum'
]

const passwords = [
  'DeezTastyNuts',
  'i<3redditmodsUWU',
  'yh-loves-h',
  'AmBestDiscordModEver',
  'BananaTastesAwful',
  'bread_gud',
  'fuckiforgotmypassword',
  'GetRektHackers',
  'ummmmmmmmmm',
  'password',
  'VERYVERYVERYsecurePassword',
  'youtubewhereisdislikebutton',
  'ihadastroke',
  'YAMETEONIICHAN~',
  'WTFisApassword',
  'ZAWARUDO',
  'secretlyLikeCandice',
  'pinkyFeb04'
]

const ips = [
  '96.213.98.110.51',
  '118.188.254.78.186',
  '54.166.211.54.214',
  '39.81.36.61.185',
  '111.27.193.111.227',
  '248.86.159.105.207',
  '201.232.152.210.248',
  '12.153.62.5.231',
  '153.228.80.222.213',
  '130.212.26.243.156',
  '69.69.69.69.69'
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
  description: "Hack some 8yo's account. 20% fail rate.",
  args: true,
  usage: '<user>',
  async execute (message, args) {
    try {
      const { author, channel } = message
      const target = await getUserFromMessage(message, args[0])

      // why tf are you hacking yourself
      if (target.id === author.id) {
        return message.reply(
          ':x: Why tf are you hacking yourself are you stupid ._.'
        )
      }

      // 20% fail rate
      if (Math.random() < 0.2) {
        return message.reply(
          ":x: Hacking failed. You've been found out by the FBI. Run while you can."
        )
      }

      // Random fake email password and IP address
      const domain = rand(domains)
      const password = rand(passwords)
      const ip = rand(ips)

      // Hack sequence

      let text = `Hacking ${target}...`
      const msg = await message.reply(text)

      const editMsg = async str => {
        text = `${text}\n${str}`
        return msg.edit(text)
      }

      await editMsg('Status: □□□□□□□□□□ 3%: Hacking Email...')
      await wait(1.5)
      editMsg(
        `Status: ■□□□□□□□□□ 9%: Hacked email\nEmail: ${target.username}@${domain}\nPassword: ${password}`
      )
      await wait(3)
      editMsg('Status: ■■□□□□□□□□ 12%: Turning off the antivirus...')
      await wait(1.4)
      editMsg('Status: ■■■□□□□□□□ 24%: Logging in to the Email...')
      await wait(1.7)
      editMsg('Status: ■■■■□□□□□□ 36%: Downloading SYNAPSE X...')
      await wait(2.5)
      editMsg('Status: ■■■■■□□□□□ 47%: Deleting Captcha...')
      await wait(1.6)
      editMsg('Status: ■■■■■■□□□□ 54%: Deleting Paypal account...')
      await wait(1.46)
      editMsg('Status: ■■■■■■■□□□ 69%: Email password changed')
      await wait(3)
      editMsg(`Status: ■■■■■■■■□□ 79%: IP address found: ${ip}`)
      await wait(1.8)
      editMsg('Status: ■■■■■■■■■□ 85%: Starting DDoS attack on IP address...')
      await wait(3.5)
      editMsg('Status: ■■■■■■■■■■ 97%: Almost there...')
      await wait(2)
      await editMsg('Status: ■■■■■■■■■■ 100%: Completed')

      // Hacking result
      const embed = new EmbedBuilder()
        .setTitle('Hacking completed successfully')
        .setDescription(`${target} has been hacked!`)
        .addFields([
          {
            name: 'INFO',
            value: 'Information about the user that you hacked.'
          },
          { name: 'EMAIL', value: `${target.username}@${domain}` },
          { name: 'PASSWORD', password },
          { name: 'IP ADDRESS', ip }
        ])
        .setFooter({
          text: "Wow you hacked some 8yo's account, you happy now?"
        })
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
