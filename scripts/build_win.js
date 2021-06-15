const exec = require('child_process').exec;

function puts(error, stdout) { console.log(stdout); }

module.exports = {
	mongodb_win_handler: function(error) {
		if(error && error.code == 1 && error.cmd == 'mongo -version') {
			console.log('Downloading and installing MongoDB. This may take a while...');
			exec('powershell "curl https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.6-signed.msi -outfile mongodb.msi" &&\
msiexec.exe /l*v mdbinstall.log  /qb /i mongodb.msi SHOULD_INSTALL_COMPASS="0" &&\
powershell -Command "Start-Process %cd%/set_env_variables.bat -Verb RunAs" &&\
set PATH=%PATH%;C:\\Program Files\\MongoDB\\Server\\4.4\\bin &&\
echo MongoDB setup complete.', puts);
		} else {
			console.log('MongoDB already installed. Skipping.');
		}
	},
};
