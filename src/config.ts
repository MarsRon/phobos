import { ActivityOptions, Snowflake } from 'discord.js'
import { PhobosClient } from './client'

// Types
interface PhobosEmbedConfig {
  avatar: string
  color: number
  url: string
}
interface PhobosActivity {
  name: (client: PhobosClient) => string
  options: ActivityOptions
}
export interface PhobosConfig {
  prefix: string
  ownerID: Snowflake
  invite: string
  supportServer: string
  embed: PhobosEmbedConfig
  activity: PhobosActivity
  logChannelID: Snowflake
}

// Change the bot configurations here!

const config: PhobosConfig = {

  // Command prefix (e.g. !help, ?help, >help, .help etc.)
  prefix: '.',

  // YOUR Discord user ID
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // NOTE: DO NOT PUT IDS OF ANYONE EXCEPT YOURSELF
  // BECAUSE THIS WILL ALLOW THEM TO USE THE EVAL COMMAND
  // THIS IS VERY DANGEROUS PLEASE KEEP THAT IN MIND
  // FOR MORE INFORMATION PLEASE READ:
  // https://anidiots.guide/examples/making-an-eval-command#securing-your-eval
  // Or you can just remove the eval command ;)
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  ownerID: '611166639534112769',

  // Bot invite
  invite: 'https://discord.com/oauth2/authorize?client_id=738252807525892139&scope=bot&permissions=8589934591',

  // Discord support server invite link, or just your personal discord server
  supportServer: 'https://discord.gg/TSqw3jx',

  // Embed configurations
  embed: {

    // Image of the embeds
    avatar: 'https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp',

    // Color of the embeds (Number)
    color: 0x4336F3,

    // URL of the embeds
    url: 'https://phobos.marsron.repl.co'

  } as PhobosEmbedConfig,

  // Bot activity (optional)
  // For more info please read:
  // https://discord.js.org/#/docs/main/stable/class/ClientUser?scrollTo=setActivity
  activity: {

    // Bot activity string (optional)
    // This is a function that returns a string
    name: (client: PhobosClient): string =>
      `${config.prefix}help | ${client.guilds.cache.size} Servers`,

    // Bot activity options (optional)
    // All available options here:
    // https://discord.js.org/#/docs/main/stable/typedef/ActivityOptions
    options: { type: 'PLAYING' }

  },

  // Logging channel
  // This is where the bot logs errors
  logChannelID: '823168168276131851'

}

export default config
