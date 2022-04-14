const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');
const { execute } = require('./ping');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
	    .setName('shinycounter')
        .setDescription('Rolls for the requested pokemon to be shiny.')
        .addStringOption(option =>
            option.setName('pokemon')
                .setDescription('The name of the pokemon to increment')
                .setRequired(true)),
        
        async execute(interaction) {
            const pokemonName = interaction.options.get('pokemon')
        }
};
