const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');
const { execute } = require('./ping');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shinylookup')
        .setDescription('Replies with shiny version of the requested pokemon')
        .addStringOption(option =>
            option.setName('pokemon')
                .setDescription('The name of the pokemon to look up its shiny version')
                .setRequired(true)),
        
        async execute(interaction) {
            const pokemonName = interaction.options.get('pokemon')
            

            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.value.toLowerCase()}`)
                .then(response => response.json())
                .then(data => {

                    interaction.reply({
                        content: `${data.sprites.front_shiny}\n${data.sprites.back_shiny}`
                    })
                })
                .catch((err) => console.error(err));
        }
};