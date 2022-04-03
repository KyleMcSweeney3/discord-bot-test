const { Client, Intents, Collection } = require('discord.js')
const { token } = require('../config.json')
const fs = require('node:fs');

// Intents.FLAGS.GUILDS is necessary for the client to work properly
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.commands = new Collection();

// Takes in all event listener files and adds them to our client
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Takes in all our command .js files and adds them to the bot
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

// Listens for a user interaction and responds with the command logic.
client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
    }
});

client.login(token);