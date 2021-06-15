const mongoose = require('../../data/mongoose/api.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		mongoose.init();
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
