module.exports = {
	name: 'messageCreate',
	execute(message) {
        console.log(`${message.content}`)
        if (message.content === 'ping') {
            message.reply({
                content: 'pong',
            });
        }
    },
};