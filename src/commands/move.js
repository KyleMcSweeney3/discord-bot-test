const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');
const { execute } = require('./ping');
const fetch = require('node-fetch');
const pokeEndpoint = 'https://pokeapi.co/api';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('move')
        .setDescription('Replies with details about the requested move')
        .addStringOption(option =>
            option.setName('move')
                .setDescription('The name of the move to look up in the pokedex')
                .setRequired(true)),
        
        async execute(interaction) {
            const moveName = interaction.options.get('move')

            fetch(`${pokeEndpoint}/v2/move/${moveName.value.toLowerCase().replace(/ /g, '-')}`)
                .then(response => response.json())
                .then(data => {
                    interaction.reply({
						content: `\`\`\`Name: ${data.name.capitalize().replace(/-/g, ' ')}\nType: ${data.type.name.capitalize()}\nAccuracy: ${(data.accuracy == null) ? 'This attack never misses' : data.accuracy}\nPower: ${data.power}\nPP: ${data.pp}\nDamage type: ${data.damage_class.name.capitalize()}\nIntroduced in ${data.generation.name.replace(/-/g, ' ')}\nEffect: ${data.effect_entries[0].effect}\n${(data.effect_chance !== null) ? 'Effect chance: ' + data.effect_chance : ''}\`\`\`\n\n`
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