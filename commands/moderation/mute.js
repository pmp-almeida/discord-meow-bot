const {
	NOT_IN_SERVER_OR_NOT_TAGGED,
} = require('../../utils/strings.js');
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
		if (!message.mentions.users.size) {
			return message.reply(NOT_IN_SERVER_OR_NOT_TAGGED);
		}

		mongoose.getRoleIdCallback('Muted', function(e, docs) {
			const taggedUser = message.mentions.members.first();
			const muteRole = {
				data: {
					name: 'Muted',
				},
				reason: 'necessary role to mute people.',
			};

			if(e) {
				handleError(e);
				return;
			}
			if(docs.length > 0) {
				const role = message.guild.roles.cache.find(r => r.id == docs[0].role_id);
				if(role) {
					taggedUser.roles.add(role);
				} else {
					message.guild.roles.create(muteRole)
						.then(role2 => {
							message.guild.channels.cache.forEach(async (channel, id) => {
								await channel.updateOverwrite(role2, {
									SEND_MESSAGES: false,
									SPEAK: false,
									ADD_REACTIONS: false,
								});
							});
							docs[0].role_id = role2.id;
							docs[0].save();
							taggedUser.roles.add(role2);
						})
						.catch(console.error);
				}

			} else {
				message.guild.roles.create(muteRole)
					.then(role => {
						mongoose.addRole('Muted', role.id);
						taggedUser.roles.add(role);
						message.guild.channels.cache.forEach(async (channel, id) => {
							await channel.updateOverwrite(role, {
								SEND_MESSAGES: false,
								SPEAK: false,
								ADD_REACTIONS: false,
							});
						});
					})
					.catch(console.error);
			}
		});
	},
};
