const {
	UNSPECIFIED,
	NOT_IN_SERVER_OR_NOT_TAGGED,
	NEED_TIME,
	SECOND_ARG_NUMBER,
} = require('../../utils/strings.js');
const EXAMPLE = 'Example: `tempmute <member> <time (seconds)> [reason]`';
const mongoose = require('../../data/mongoose/api.js');

function handleError(e) {
	console.log(e);
}

module.exports = {
	name: 'tempmute',
	description: 'Tag a member and mute them temporarily.',
	help: 'tempmute <member> <time (seconds)> [reason]',
	aliases: ['tmute'],
	usage: '<member> <time (seconds)> [reason]',
	cooldown: 1,
	guildOnly: true,
	permissions: 'MUTE_MEMBERS',
	args: true,
	execute(client, message, args) {
		if(!message.mentions.users.size) {
			return message.reply(NOT_IN_SERVER_OR_NOT_TAGGED);
		}
		if(args.size < 1) {
			return message.reply(NEED_TIME + '\n' + EXAMPLE);
		}

		const time = parseInt(args[1]);
		if(isNaN(time)) {
			return message.reply(SECOND_ARG_NUMBER + '\n' + EXAMPLE);
		}

		const taggedUser = message.mentions.members.first();
		let reason = args.slice(2).join(' ');
		if(!reason) reason = UNSPECIFIED;

		mongoose.getRoleIdCallback('Muted', function(e, docs) {
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

			setTimeout(async () => {
				await message.guild.members.unban(taggedUser, 'Temporary ban finished.');
				message.channel.send(`${taggedUser} has been unbanned after ${time} second(s).`);
			}, time * 1000);
		});
	},
};
