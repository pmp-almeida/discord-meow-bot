const {
	UNSPECIFIED,
	NOT_IN_SERVER_OR_NOT_TAGGED,
} = require('../../utils/strings.js');

module.exports = {
	name: 'kick',
	description: 'Tag a member and kick them.',
	help: 'kick <member> [reason]',
	usage: '<member> [reason]',
	cooldown: 1,
	guildOnly: true,
	permissions: 'KICK_MEMBERS',
	args: true,
	execute(client, message, args) {
		if (!message.mentions.users.size) {
			return message.reply(NOT_IN_SERVER_OR_NOT_TAGGED);
		}

		const taggedUser = message.mentions.members.first();
		let reason = args.slice(1).join(' ');
		if(!reason) reason = UNSPECIFIED;

		const msg = `${taggedUser.displayName} was unbanned.\nReason: \`${reason}\``;

		taggedUser.kick(reason);
		message.channel.send(msg);
	},
};
