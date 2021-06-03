module.exports = {
	name: 'beep',
	description: 'Boop!',
	execute(client, message) {
		message.channel.send('Boop.');
	},
};
