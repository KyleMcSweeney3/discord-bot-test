# **Pokedex - A discord bot**

The Pokedex discord bot utilises the PokeAPI to pull and display information about the many entities within the Pokemon universe. This includes pokemon, abilites, moves, items, etc.
The various commands allows users to lookup these entities and displays all the relevant information about each of them.

Developed using [Discord.js](https://discord.js.org/#/). A powerful node module that allows you to interact with the Discord API very simply.

## Features and Commands
The commands implmented in this bot are used by prefixing each message with a '/' and invoking the relevant command.

### Features
1. All information from Generation 1-9 is accessible via the lookup commands.
2. Error Handling with user-friendly messaging
3. Sprites for each pokemon. Access to shiny version sprites.

### Commands
1. /help -> Displays each of the available commands, and example usages.
2. /pokedex `pokemon` -> Displays high level pokedex data on the requested pokemon. Includes sprite image of the pokemon.
3. /move `move` -> Provides information on the requested move
4. /item `item` -> Provides detail on the requested item
5. /randompokemon -> Provides high level pokedex data on a random pokemon
6. /shinylookup `pokemon` -> Displays a front and back view of the requested pokemon in its shiny form.
7. /shinyhunt `pokemon` -> Rolls at default shiny odds for the requested pokemon. Displays shiny form if successful.

## Dependencies
[PokeAPI](https://pokeapi.co/)

## Extendability
1. Currently, the PokeAPI has a limit on the number of requests it can receive under its fair use policy. Implementing caching of the data to minimise these requests made to the PokeAPI. Could potentially store all this data on our own server.
2. Adding more interactive commands, i.e. pokemon quiz, pokemon battler, party, shiny game.

## Authors
Kyle McSweeney - Sole Developer - [Github](https://github.com/KyleMcSweeney3)


Pokémon © 2002-2022 Pokémon. © 1995-2022 Nintendo/Creatures Inc./GAME FREAK inc. TM, ® and Pokémon character names are trademarks of Nintendo. No copyright or trademark infringement is intended.

