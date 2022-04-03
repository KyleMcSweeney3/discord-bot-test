module.exports = {
    name: 'messageCreate',
    ephemeral: true,
	execute(message) {
        console.log(`${message.content}`)
        if (message.content === 'ping') {
            message.reply({
                content: `pong`,
            });
        }
    },
};