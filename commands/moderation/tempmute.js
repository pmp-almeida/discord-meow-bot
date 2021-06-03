module.exports = {
	name: 'tempmute',
	description: 'WIP - Tag a member and mute them temporarily.',
	help: 'tempmute <member> [reason]',
	aliases: ['tmute'],
	usage: '<member> [reason]',
	cooldown: 1,
	guildOnly: true,
	permissions: 'MUTE_MEMBERS',
	args: true,
	execute(client, message, args) {

	},
};
