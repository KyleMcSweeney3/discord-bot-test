const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('move')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pongg!');
	},
};