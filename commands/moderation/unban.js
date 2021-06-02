module.exports = {
	name: 'unban',
	description: 'Tag a user and unban them.',
	args: true,
	help: 'unban <member> [reason]',
	usage: '<member> [reason]',
	cooldown: 1,
	guildOnly: true,
	execute(client, message, args) {
		const user_id = args[0].substring(3, args[0].length - 1);

		client.users.fetch(user_id)
			.then(user => {
				if (!user) {
					return message.reply('either the user in not currently banned, or you didn\'t tag them!');
				}
				let reason = args.slice(1).join(' ');
				if(!reason) reason = 'Unspecified';
				const msg = `${user.username} was unbanned.\nReason: \`${reason}\``;
				message.guild.members.unban(user, reason)
					.catch(err => {
						if(err) {
							console.log(err);
							return message.channel.send('Oops... Something went wrong');
						}
					});

				message.channel.send(msg);
			})
			.catch(err => { console.log(err); });

	},
};
