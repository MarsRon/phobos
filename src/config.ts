// Types
interface PhobosEmbedConfig {
  avatar: string
  color: number
  url: string
}
interface PhobosConfig {
  prefix: string
  ownerID: string
  invite: string
  supportServer: string
  embed: PhobosEmbedConfig
}

// Change the embed configurations here!
export const embed: PhobosEmbedConfig = {
  avatar: 'https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp',
  color: 0x4336F3,
  url: 'https://phobos.marsron.repl.co'
}

// Change the bot configurations here!
const config: PhobosConfig = {
  prefix: '.',
  ownerID: '611166639534112769',
  invite: 'https://discord.com/oauth2/authorize?client_id=738252807525892139&scope=bot&permissions=8589934591',
  supportServer: 'https://discord.gg/TSqw3jx',
  embed
}

export default config
