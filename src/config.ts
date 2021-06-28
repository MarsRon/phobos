interface PhobosEmbedConfig {
  avatar: string
  color: number
  url: string
}

export const embed: PhobosEmbedConfig = {
  avatar: 'https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp',
  color: 0x4336F3,
  url: 'https://phobos.marsron.repl.co'
}

interface PhobosConfig {
  embed: PhobosEmbedConfig
}

const config: PhobosConfig = {
  embed
}

export default config
