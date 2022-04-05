module.exports = {
    name: 'messageCreate',
    ephemeral: true,
	execute(message) {
        if (message.content === 'ping') {
            message.reply({
                content: `pong`,
            });
        }
    },
};