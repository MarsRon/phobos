# Phobos

[![Invite me!](https://img.shields.io/badge/Invite%20me!-%237289DA.svg?logo=discord&logoColor=white)](https://discord.com/oauth2/authorize?client_id=738252807525892139&scope=bot&permissions=8)

Stupid discord.js bot by MarsRon with even worse code.

Phobos plays music and does useless stuff.\
Commands include music, fun, images/GIFs, economy, utility and more.

Started this project since 21 March 2021.

> Note: Phobos has not been under active development since 2023. I will continue to patch any major issues, but other than that, there will be no more major updates to the bot. Thank you for your understanding.

## Features

- Music system using [DisTube](https://distube.js.org)
- Kazuma AI chatbot command
- Some fun(?) commands
- Weird images/GIFs commands
- Very lacking economy system
- Stupid, and I mean very stupid, word catchers
- Some other trash

## Tech Stack

- [Node.js v20+](https://nodejs.org/en), I recommend using [nvm](https://github.com/nvm-sh/nvm#readme)
- [Discord.js v14](https://github.com/discordjs/discord.js)
- [DisTube v5](https://github.com/skick1234/DisTube)
- [Express](https://expressjs.com) for website
- [MongoDB](https://www.mongodb.com)
- [FFmpeg](https://www.ffmpeg.org/) install globally, or [`ffmpeg-static`](https://www.npmjs.com/package/ffmpeg-static)
- And some other packages which can be found in [`package.json`](./package.json)

## Developing

Phobos is created for my own personal use, but feel free to take any inspiration from it.

If you want to create your own Discord bot, I recommend learning from [discordjs.guide](https://discordjs.guide) instead of cloning Phobos.

Clone the repo

```bash
$ git clone https://github.com/MarsRon/phobos
$ cd phobos
```

Install NPM dependencies

```bash
$ npm i
```
> Note: If you encounter some issues with `node-canvas`, try [installing the necessary dependencies](https://github.com/Automattic/node-canvas?tab=readme-ov-file#compiling).

Copy `.env.example` to `.env`

```bash
$ cp .env.example .env
```

Put your Discord bot token and MongoDB URL into `.env`.

Edit `src/config.js` to your likings.

There might be some other configs in the source code, but I hardcoded them, so umm good luck changing them ¯\\\_(ツ)\_/¯

Start developing

```bash
$ npm start
```

## Deploying

### PM2

I use [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) to deploy Phobos.

Install pm2 globally

```bash
$ npm i -g pm2
```

Start Phobos

```bash
$ pm2 start src/index.js --name phobos --log-date-format YYYY-MM-DD\ HH:mm:ss
```

### Docker

(WIP)

```bash
$ docker build -t phobos .
$ docker run --env-file=.env phobos
```

or

```bash
$ docker compose up -d
```

## Contact

Feel free to contact me at https://marsron.name.my for stuff.

## License

This project is licensed under the MIT License. See [LICENSE.md](https://github.com/MarsRon/phobos/blob/main/LICENSE.md) for details.
