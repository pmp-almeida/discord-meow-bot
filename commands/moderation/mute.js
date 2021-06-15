const mongoose = require('../../data/mongoose/api.js');

function handleError(e) {
	console.log(e);
}

module.exports = {
	name: 'mute',
	description: 'WIP - Tag a member and mute them.',
	help: 'mute <member> [reason]',
	usage: '<member> [reason]',
	cooldown: 1,
	guildOnly: true,
	permissions: 'MUTE_MEMBERS',
	args: true,
	execute(client, message) {
		mongoose.getRoleIdCallback('Muted', function(e, docs) {
			const taggedUser = message.mentions.members.first();
			if(e) {
				handleError(e);
				return;
			}
			if(docs.length > 0) {
				// message.guild.roles.fetch(docs[0].id);
				const role = message.guild.roles.cache.find(r => r.id == docs[0].role_id);
				if(role) {
					taggedUser.roles.add(role);
				} else {
					message.guild.roles.create({
						data: {
							name: 'Muted',
						},
						reason: 'necessary role to mute people.',
					})
						.then(role2 => {
							docs[0].role_id = role2.id;
							docs[0].save();
							taggedUser.roles.add(role2);
						})
						.catch(console.error);
				}

			} else {
				message.guild.roles.create({
					data: {
						name: 'Muted',
					},
					reason: 'necessary role to mute people.',
				})
					.then(role => {
						mongoose.addRole('Muted', role.id);
						taggedUser.roles.add(role);
					})
					.catch(console.error);
			}
		});
	},
};
