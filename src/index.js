const { Client, Intents, Collection, Formatters } = require('discord.js')
const { token } = require('../config.json')
const Sequelize = require('sequelize');
const fs = require('node:fs');
const { Users, CurrencyShop } = require('./dbObjects.js');

// Intents.FLAGS.GUILDS is necessary for the client to work properly
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.commands = new Collection();
const currency = new Collection();
const prefix = "!";

Reflect.defineProperty(currency, 'add', {
	value: async (id, amount) => {
		const user = currency.get(id);

		if (user) {
			user.balance += Number(amount);
			return user.save();
		}

		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);

		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	value: id => {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

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

// sync the currency collection with the database for easy access later
client.once('ready', async () => {
	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => currency.set(b.user_id, b));
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    

    if (!message.content.startsWith(prefix)) {
        // Add 1 currency for each message sent in the chat
        currency.add(message.author.id, 1);
        return;
    }
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "sum") {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
    } else if (command === "balance") {
        message.reply({
            content: `${message.member.user.tag} has ${currency.getBalance(message.member.user.id)} PokeBUX`
        })
    } else if (command === "trade") {
        const currentAmount = currency.getBalance(message.member.user.id);
        const transferAmount = args[0]
        const transferTarget = args[1].replace(/[<!@>]/g, '');
        
        if (transferAmount > currentAmount) return message.reply(`Sorry ${message.member.user}, you only have ${currentAmount} PokeBux.`);
        if (transferAmount <= 0) return message.reply(`Please enter an amount greater than zero, ${message.member.user}.`);
        
        currency.add(message.member.user.id, -transferAmount);
        currency.add(transferTarget, transferAmount);

        return message.reply(`Successfully transferred ${transferAmount} PokeBux. Your current balance is ${currency.getBalance(message.member.user.id)}💰`);
    } else if (command === "inventory") {
        const target = args[0].replace(/[<!@>]/g, '');
        message.reply(`${client.users.cache.get(target)}`);
        // const user = await Users.findOne({ where: { user_id: target } });
        // const items = await user.getItems();

        // if (!items.length) return message.reply(`${target.tag} has nothing!`);

	    // return message.reply(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
    }
});

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