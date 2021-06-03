module.exports = {
	name: 'ping',
	description: 'Pong!',
	cooldown: 5,
	execute(client, message) {
		message.channel.send('Pong.');
	},
};
