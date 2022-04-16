const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');
const { execute } = require('./ping');
const fetch = require('node-fetch');
const pokeEndpoint = 'https://pokeapi.co/api';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
        .setDescription('Displays all of the available commands and how to use each of them.'),
        
        async execute(interaction) {
            interaction.reply({
                content: `The Pokedex discord bot utilises the PokeAPI to pull and display information about the many entities within the Pokemon universe. This includes pokemon, abilites, moves, items, etc. The various commands allows users to lookup these entities and displays all the relevant information about each of them.\n\nGENERAL COMMANDS:\n/pokedex <pokemon> -> Looks up the requested pokemon in the pokedex\n/move <move> -> Looks up the requested move and provides general information\n/item <item> -> Provides detail on the requested item\n/randompokemon -> Provides high level pokedex data on a random pokemon\n/shinylookup <pokemon> -> Displays a front and back view of the requested pokemon in its shiny form.\n/shinyhunt <pokemon> -> Rolls at default shiny odds for the requested pokemon. Displays shiny form if successful.\n\nPOKEBUX COMMANDS:\n!balance -> Displays your current PokeBUX balance\n!shop -> Displays a list of all items available for purchase\n!inventory -> Displays your current inventory of items.\n!buy <item> -> Purchase an item from the PokeBux shop.\n!leaderboard -> Displays a leaderboard of users who have the highest amount of PokeBux.\n`,
                ephemeral: true
            })
        }
};