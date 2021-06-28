# Phobos

[![Total Lines][total-lines-shield]][repo]
[![Dependencies][dependencies-shield]][dependencies]
[![License][license-shield]][license]

The not so cool multi-purpose dumb Discord bot.

Phobos has zero uses except playing music and other cool but useless stuff.\
It includes commands for Fun, Economy, Music, Moderation, Utility and more.\
If you liked this open-source project, adding a star on this repository will be greatly appreciated.

## Features

 - Music system - Thanks to [DisTube][distube] :)
 - Bad economy system
 - Stupid word catchers
 - Some other trash commands


## Self-hosting

> **NOTE: SELF-HOSTING ISN'T COMPLETED YET**\
> Yeah basically this bot isn't documented very well. Hopefully it will be customizable enough in the future.

Clone the project
```bash
  git clone https://github.com/MarsRon/phobos
```

Change directory into the project directory
```bash
  cd phobos
```

Install dependencies
```bash
  npm i
```

Start the development server
```bash
  npm start
```

## Deployment

To deploy this project run
```bash
  npm run deploy
```

## Scripts

| Script | Description |
|-|-|
| `start` | Start the development server |
| `build` | Build the project |
| `deploy` | Deploy the project (Run `build` beforehand) |
| `lint` | Find problems with code using ESLint |
| `lint:fix` | Basically `lint` but automatically fixes some of the problems |
| `prepare` | Install [`husky`](https://typicode.github.io/husky) |
## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file. You can also look at the `.env.example` file for reference.

| Variable | Description |
|-|-|
| `DEBUG` | Enables debug mode if value is `true` |
| `DISCORD_TOKEN` | Authorization token for the Discord bot |
| `MONGODB_URI` | MongoDB database connection URI |

## Contributing

Contributions are always welcome!

Please contact [MarsRon#7602](https://discord.com/users/611166639534112769) or <marsron204@gmail.com> for anything.

## Links

[![Invite Bot][bot-invite-shield]][bot-invite]
[![GitHub Repo][repo-shield]][repo]
[![Replit][repl-shield]][repl]

## License

This project is licensed under the MIT License. See [LICENSE.md][license] for details.



[repo]: https://github.com/MarsRon/phobos
[dependencies]: https://david-dm.org/MarsRon/phobos
[license]: https://github.com/MarsRon/phobos/blob/master/LICENSE.md
[bot-invite]: https://discord.com/oauth2/authorize?client_id=738252807525892139&scope=bot&permissions=8589934591
[repl]: https://replit.com/@MarsRon/phobos

[total-lines-shield]: https://img.shields.io/tokei/lines/github/MarsRon/phobos.svg
[dependencies-shield]: https://status.david-dm.org/gh/MarsRon/phobos.svg
[license-shield]: https://img.shields.io/github/license/MarsRon/phobos.svg
[bot-invite-shield]: https://img.shields.io/badge/Invite%20bot!-%237289DA.svg?logo=discord&logoColor=white
[repo-shield]: https://img.shields.io/badge/GitHub%20Repo-%23181711.svg?logo=github&logoColor=white
[repl-shield]: https://img.shields.io/badge/Replit-%23667881.svg?logo=replit&logoColor=white

[distube]: https://distube.js.org