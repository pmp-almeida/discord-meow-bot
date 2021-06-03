module.exports = {
	name: 'unban',
	description: 'Tag a user and unban them.',
	args: true,
	help: 'unban <member> [reason]',
	usage: '<member> [reason]',
	cooldown: 1,
	guildOnly: true,
	permissions: 'BAN_MEMBERS',
	execute(client, message, args) {
		const user_id = args[0].substring(3, args[0].length - 1);
		let msg;

		client.users.fetch(user_id)
			.then(user => {
				if (!user) {
					return message.reply('either the user in not currently banned, or you didn\'t tag them!');
				}
				let reason = args.slice(1).join(' ');
				if(!reason) reason = 'Unspecified';
				msg = `${user.username} was unbanned.\nReason: \`${reason}\``;
				message.guild.members.unban(user, reason)
					.catch(e => {
						console.log(e);
						return message.channel.send('Oops... Something went wrong');
					});
			})
			.then(() => {	message.channel.send(msg);})
			.catch(e => { console.log(e); });
	},
};
