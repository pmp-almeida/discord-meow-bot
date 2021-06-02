module.exports = {
	name: 'kick',
	description: 'Tag a member and kick them.',
	args: true,
	help: 'kick <member> [reason]',
	usage: '<member> [reason]',
	cooldown: 1,
	guildOnly: true,
	permissions: 'KICK_MEMBERS',
	execute(client, message, args) {
		if (!message.mentions.users.size) {
			return message.reply('either the user in not in the server, or you didn\'t tag them!');
		}

		const taggedUser = message.mentions.members.first();
		let reason = args.slice(1).join(' ');
		if(!reason) reason = 'Unspecified';

		const msg = `${taggedUser.displayName} was unbanned.\nReason: \`${reason}\``;

		taggedUser.kick(reason);
		message.channel.send(msg);
	},
};
