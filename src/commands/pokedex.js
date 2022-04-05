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
            

            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.value.toLowerCase()}`)
                .then(response => response.json())
                .then(data => {

                    interaction.reply({
                        content: `${pokemonName.value.capitalize()} #${String(data.id).padStart(3, '0')}\nHeight: ${toFeet(data.height*10)}\nWeight: ${data.weight} lbs\n\nBase Stats:\n${data.stats[0].stat.name.capitalize()}: ${data.stats[0].base_stat}\n${data.stats[1].stat.name.capitalize()}: ${data.stats[1].base_stat}\n${data.stats[2].stat.name.capitalize()}: ${data.stats[2].base_stat}\n${data.stats[3].stat.name.capitalize()}: ${data.stats[3].base_stat}\n${data.stats[4].stat.name.capitalize()}: ${data.stats[4].base_stat}\n${data.stats[5].stat.name.capitalize()}: ${data.stats[5].base_stat}\n${data.sprites.front_default}`
                    })
                })
                .catch((err) => console.error(err));
        }
};

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });

// Converts CM to Feet/Inches
function toFeet(n) {
    var realFeet = ((n*0.393700) / 12);
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + "\' " + String(inches).padStart(2, '0') + '\"';
}