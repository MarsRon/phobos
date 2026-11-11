# Phobos - Agent Guidelines

## Project Overview

Phobos is a Discord.js bot written in Node.js (v20+) using CommonJS modules. It uses Discord.js v14, DisTube v5 for music, MongoDB for data persistence, and Express for a web server.

## Build & Run Commands

### Development

```bash
npm run dev  # Start with nodemon for hot reload
npm start    # Start the bot normally (node .)
```

### Docker

```bash
docker build -t phobos .
docker compose up -d
```

### PM2 Deployment

```bash
pm2 start src/index.js --name phobos --log-date-format YYYY-MM-DD\ HH:mm:ss
```

### No test or lint commands exist

This project currently has no test suite or linter configured.

## Code Style Guidelines

### General Conventions

- **Modules**: CommonJS (`require`/`module.exports`) - no ES modules in source files
- **Indentation**: 2 spaces (enforced by existing code)
- **Semicolons**: Always use semicolons at end of statements
- **Strings**: Single quotes for strings, except when containing single quotes

### Naming Conventions

- **Files**: camelCase (e.g., `command.js`, `wordCatcher.js`)
- **Classes**: PascalCase (e.g., `PhobosClient`, `DBManager`, `Util`)
- **Functions/variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE for static config values

### Imports Pattern

```javascript
// Core discord.js import
const { Client, Collection, GatewayIntentBits } = require("discord.js");

// Local imports
const config = require("../config");
const client = require("../client");
```

### Command Structure

Commands are modules in `src/commands/<category>/<command>.js`:

```javascript
module.exports = {
  name: "commandname",
  alias: ["alias1", "alias2"], // Optional array of aliases
  description: "What it does.",
  usage: "<required> [optional]", // Optional usage string
  guildOnly: true, // Optional - true if DM disabled
  permission: "PermissionName", // Optional - Discord permission
  args: true, // Optional - requires arguments
  cooldown: 3, // Optional - seconds (default 3)
  async execute(message, args) {
    // Command implementation
  },
};
```

### Error Handling

- Use try/catch blocks for async operations
- Log errors via `client.log.error(err)`
- Reply with friendly error message to user
- Send error details to log channel

```javascript
try {
  await command.execute(message, args);
} catch (error) {
  client.log.error(error);
  message.reply(":x: Sorry, something went wrong. Please try again later");
}
```

### Database (Mongoose)

- Models defined in `src/db/<model>.js`
- Use DBManager wrapper class for CRUD operations
- Schema uses camelCase field names

### Logging

- Use Winston logger via `client.log`
- Log levels: `info`, `debug`, `error`, `warn`
- Format: `client.log.info('Message: ' + JSON.stringify({...}))`

### Event Handlers

- Located in `src/events/<event>.js`
- Use `client.on(eventName, handler)` to register

### Utility Functions

- Static methods in `src/utils.js` (Util class)
- Examples: `timeToDHMS()`, `timeToStr()`, `getUserFromMessage()`, `formatDate()`, `splitMessage()`

### Embeds

- Use Discord.js embed object format
- Access config values: `config.embed.color`, `config.embed.avatar`, `config.embed.url`

### Message Replies

- Use emoji prefixes: `:x:` for errors, `:white_check_mark:` for success, `:mag_right:` for searching
- Include helpful usage info when arguments are wrong

## Key Files

- `src/index.js` - Entry point
- `src/client.js` - Custom client class (PhobosClient)
- `src/config.js` - Bot configuration
- `src/utils.js` - Utility functions
- `src/commands/` - Command categories
- `src/events/` - Event handlers
- `src/handlers/` - Core handlers (command loader, event loader, logger, etc.)
- `src/db/` - Database models

## Important Notes

1. Owner ID in `config.js` has access to dangerous `eval` command - be careful
2. The bot is not actively developed; major features won't be added but patches are welcome
3. `.env` file required with `DISCORD_TOKEN` and `MONGODB_URI`
4. FFmpeg required globally for music playback
