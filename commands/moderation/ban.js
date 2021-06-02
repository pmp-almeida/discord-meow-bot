module.exports = {
	name: 'ban',
	description: 'Tag a member and ban them.',
	args: true,
	help: 'ban <member> [reason]',
	usage: '<member> [reason]',
	cooldown: 1,
	guildOnly: true,
	permissions: 'BAN_MEMBERS',
	execute(client, message, args) {
		if (!message.mentions.users.size) {
			return message.reply('either the user in not in the server, or you didn\'t tag them!');
		}

		const taggedUser = message.mentions.members.first();
		let reason = args.slice(1).join(' ');
		if(!reason) reason = 'Unspecified';

		const msg = `${taggedUser.displayName} was unbanned.\nReason: \`${reason}\``;

		taggedUser.ban({ reason: reason });
		message.channel.send(msg);
	},
};
