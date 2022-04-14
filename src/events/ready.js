
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Beep Boop, Bot is ready at ${client.readyAt}!\nLogged in as ${client.user.tag}`);
	},
};