module.exports = {
	name: 'unbanall',
	description: 'Unban all users.',
	help: 'unbanall',
	aliases: ['uball'],
	cooldown: 10,
	guildOnly: true,
	permissions: 'BAN_MEMBERS',
	execute(client, message) {
		message.guild.fetchBans().then(bans => {
			if (bans.size == 0) {
				message.reply('There are no banned users.');
				throw 'No members to unban.';
			}
			bans.forEach(ban => {
				message.guild.members.unban(ban.user.id);
			});
		}).then(() => message.reply('Unbanned all users.'))
			.catch(e => console.log(e));
	},
};
