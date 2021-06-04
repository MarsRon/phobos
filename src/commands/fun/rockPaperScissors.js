const emojis = ["🧱", "📄", "✂️"];
const names = [":bricks: Rock", ":page_facing_up: Paper", ":scissors: Scissors"];

/**
 * Rock Paper Scissors result
 * @param {number} p1 - Player 1's index
 * @param {number} p2 - Player 2's index
 * @returns {number} - 1 if player 1 wins, -1 if player 2 wins, 0 if draw
 */
const rps = (p1, p2) =>
	p1 === p2 ? 0 : (p1 === 0 && p2 === 2) || (p1 === 1 && p2 === 0) || (p1 === 2 && p2 === 1) ? 1 : -1;

module.exports = {
	name: "rock-paper-scissors",
	alias: ["rps"],
	description: "Play rock paper scissors with the bot.",
	cooldown: 5,
	execute(message) {
		const { author, client } = message;
		message.reply("Please react with :bricks:, :page_facing_up: or :scissors:")
			.then(async msg => {
				msg.awaitReactions(
					(reaction, user) => emojis.includes(reaction.emoji.name) && user.id === author.id,
					{ max: 1, time: 15000, errors: ["time"] })
					.then(collected => {
						const reaction = collected.first();
						const user = emojis.indexOf(reaction.emoji.name);
						const bot = Math.floor(Math.random() * emojis.length);
						const res = rps(user, bot);
						message.channel.send({embed: {
							description: `**Congratulations, ${
								res === 0 ? "it's a draw" :
									`<@${res === 1 ? author.id : client.user.id}> wins`
							}!**`,
							fields: [
								[names[user], `<@${author.id}>`],
								["vs", "vs"],
								[names[bot], `<@${client.user.id}>`]
							].map(([name, value]) => ({ name, value, inline: true })),
							color: 4404979,
							author: {
								name: "Rock Paper Scissors",
								url: "https://phobos.marsron.repl.co",
								icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
							}
						}});
					})
					.catch(() => {
						message.channel.send(":x: You didn't react in time.");
					});
				for (const emoji of emojis)
					await msg.react(emoji);
			});
	}
};
