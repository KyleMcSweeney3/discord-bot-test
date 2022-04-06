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
					var chars = {'-i':' 1','-ii':' 2','-iii':' 3','-iv': ' 4', '-v':' 5', '-vi': ' 6', '-vii': ' 7', '-viii': ' 8', '-iv': ' 9', '-x': ' 10'}
                    interaction.reply({
						content: `\`\`\`Name: ${data.name.capitalize()}\nType: ${data.type.name.capitalize()}\nAccuracy: ${(data.accuracy == null) ? 'This attack never misses' : data.accuracy}\nPower: ${data.power}\nPP: ${data.pp}\nDamage type: ${data.damage_class.name.capitalize()}\nIntroduced in ${data.generation.name.replace(/-i|i{2}|i{3}|-iv|-vi|-vii|-viii|-iv|-x/g, m => chars[m])}\nEffect: ${data.effect_entries[0].effect}\`\`\`\n\n`
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