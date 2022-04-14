const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');
const { execute } = require('./ping');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shinyhunt')
        .setDescription('Rolls for the requested pokemon to be shiny.')
        .addStringOption(option =>
            option.setName('pokemon')
                .setDescription('The name of the pokemon to look up its shiny version')
                .setRequired(true)),
        
        async execute(interaction) {
            const pokemonName = interaction.options.get('pokemon')
            if (randomIntFromInterval(1, 4096) == 420) { 
                fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.value.toLowerCase()}`)
                    .then(response => response.json())
                    .then(data => {

                        interaction.reply({
                            content: `Congratulations! You've caught a shiny ${pokemonName.value.capitalize()}\n\n${data.sprites.front_shiny}\n`
                        })
                    })
                    .catch((err) => console.error(err));
            } else {
                interaction.reply({
                    content: `${pokemonName.value.capitalize()} was not shiny! \:cry:\n`,
                    ephemeral: true
                })
            }
        }
};

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }