const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');
const { execute } = require('./ping');
const fetch = require('node-fetch');
const pokeEndpoint = 'https://pokeapi.co/api';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('item')
        .setDescription('Replies with details about the requested item')
        .addStringOption(option =>
            option.setName('item')
                .setDescription('The name of the item to look up in the pokedex')
                .setRequired(true)),
        
        async execute(interaction) {
            const moveName = interaction.options.get('item')

            fetch(`${pokeEndpoint}/v2/item/${moveName.value.toLowerCase()}`)
                .then(response => response.json())
                .then(data => {
					
                    interaction.reply({
						content: `\`\`\`Effect: ${data.effect_entries[0].effect.replace(/\n/g, '')}\nCost: ${data.cost}\`\`\`Sprite: ${data.sprites.default}`
                    })
                })
                .catch((err) => {
                  console.log(err);
                  interaction.reply({
                    content: 'The requested move does not exist.'
                  })
                });
        }
};