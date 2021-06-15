const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/discord-bot', { useNewUrlParser: true, useUnifiedTopology: true });
let roleSchema, Role;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connection to database estabilished.\n');

	roleSchema = Schema({
		role_name: String,
		role_id: Number,
	});
	Role = mongoose.model('Role', roleSchema);

});


function init(client) {
	Role.find({ role_name: 'muted' }, 'role_id',
		function(e, docs) {
			if(docs == '') {
				client.guild.roles.create({
					data: {
						name: 'Super Cool People',
						color: 'BLUE',
					},
					reason: 'we needed a role for Super Cool People',
				})
					.then(console.log)
					.catch(console.error);
			}
		});
}

function getRoleId(role_name) {
	Role.find({ role_name: role_name }, 'role_id',
		function(e, docs) {
			if(e) return handleError(e);
			return docs;
		});
}

function addRole(name, id) {
	Role.create({ role_name: name, role_id: id },
		function(e, role) {
			if(e) return handleError(e);
			return role;
		});
}

function handleError(e) {
	console.log(e);
}
