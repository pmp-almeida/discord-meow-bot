let Role;

function handleError(e) {
	console.log(e);
}

module.exports = {
	init: function() {
		Role = require('mongoose').model('Role');
	},
	getRoleId: function(role_name) {
		Role.find({ role_name: role_name },
			function(e, docs) {
				if(e) handleError(e);
				console.log('Docs: ' + docs);
			});
	},
	getRoleIdCallback: function(role_name, callback) {
		Role.find({ role_name: role_name }, callback);
	},
	addRole: function(name, id) {
		Role.create({ role_name: name, role_id: id },
			function(e, role) {
				if(e) handleError(e);
				return role;
			});
	},
};
