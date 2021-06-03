const {
	UNSPECIFIED,
	NOT_IN_SERVER_OR_NOT_TAGGED,
	NEED_TIME,
	SECOND_ARG_NUMBER,
} = require('../../utils/strings.js');
const EXAMPLE = 'Example: `tempban <member> <time (seconds)> [reason]`';

module.exports = {
	name: 'tempban',
	description: 'Tag a member and ban them temporarily.',
	help: 'tempban <member> <time> [reason]',
	aliases: ['tban'],
	usage: '<member> <time (seconds)> [reason]',
	cooldown: 5,
	guildOnly: true,
	permissions: 'BAN_MEMBERS',
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

		const msg = `${taggedUser.displayName} was banned for ${time} seconds(s).\
\nReason: \`${reason}\``;

		taggedUser.ban({ reason: reason });
		message.channel.send(msg);

		setTimeout(async () => {
			await message.guild.members.unban(taggedUser, 'Temporary ban finished.');
			message.channel.send(`${taggedUser} has been unbanned after ${time} second(s).`);
		}, time * 1000);
	},
};
