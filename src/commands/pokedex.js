const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');
const { execute } = require('./ping');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokedex')
        .setDescription('Replies with details about the request Pokemon')
        .addStringOption(option =>
            option.setName('pokemon')
                .setDescription('The name of the pokemon to look up in the pokedex')
                .setRequired(true)),
        
        async execute(interaction) {
            const pokemonName = interaction.options.get('pokemon')
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.value}`)
                .then(response => response.json())
                .then(data => console.log(data));
            await interaction.reply({
                content: `Looking up ${pokemonName.value}`,
                ephemeral: true
            })
        }
};