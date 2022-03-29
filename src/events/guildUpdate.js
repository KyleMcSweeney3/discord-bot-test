module.exports = {
	name: 'guildUpdate',
	execute(oldGuild, newGuild) {
		console.log(`A guild update has occured! Name has been updated to ${newGuild} from ${oldGuild}`);
	},
};