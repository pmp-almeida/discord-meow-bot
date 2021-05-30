module.exports = {
	name: 'beep',
	description: 'Beep!',
	execute(client, message) {
		message.channel.send('Boop.');
	},
};
