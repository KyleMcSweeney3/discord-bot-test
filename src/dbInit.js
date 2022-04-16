const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = require('./models/CurrencyShop.js')(sequelize, Sequelize.DataTypes);
require('./models/Users.js')(sequelize, Sequelize.DataTypes);
require('./models/UserItems.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Potion', cost: 100 }),
		CurrencyShop.upsert({ name: 'Pokeball', cost: 200 }),
		CurrencyShop.upsert({ name: 'Great-Ball', cost: 500 }),
		CurrencyShop.upsert({ name: 'Revive', cost: 1500 }),
		CurrencyShop.upsert({ name: 'Full-Heal', cost: 800 }),
		CurrencyShop.upsert({ name: 'Super-Potion', cost: 900 }),
		CurrencyShop.upsert({ name: 'Master-Ball', cost: 50000 }),
		CurrencyShop.upsert({ name: 'Full-restore', cost: 2500 }),
		CurrencyShop.upsert({ name: 'Ultra-Ball', cost: 800 }),
	];

	await Promise.all(shop);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);