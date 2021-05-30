const exec = require('child_process').exec;
const os = require('os');

function puts(error, stdout, stderr) {
	if(error) {
		if(error.code == 127 && error.cmd == 'mongo -version');
		throw 'mongoNotFound';
	} else if(stdout) {
		if(!stdout.startsWith('MongoDB shell version v')) {
			console.log(stdout);
		}
	}
}

// MONGODB SETUP
function mongodb(op_sys) {
	console.log('--------------------------------------------');
	try {
		exec('mongo -version', puts);
		console.log('MongoDB already installed. Skipping.');
	} catch(e) {
		console.log('Downloading and installing MongoDB. This may take a while...');
		// Windows
		if (op_sys == 0) {
			exec('powershell.exe "curl https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.6-signed.msi -outfile mongodb.msi"', puts);
			exec('msiexec.exe /l*v mdbinstall.log  /qb /i mongodb-windows-x86_64-4.4-signed.msi SHOULD_INSTALL_COMPASS="0"', puts);
			// Mac
		} else if (op_sys == 1) {
			// TODO
			// Linux
		} else if (op_sys == 2) {
			const linux_version = os.version().split('~')[1].substring(0, 5);
			exec('wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -', puts);
			if (linux_version === '20.04') {
				exec('echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list', puts);
			} else if (linux_version === '18.04') {
				exec('echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list', puts);
			} else if (linux_version === '16.04') {
				exec('echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list', puts);
			}
		}
		exec('sudo apt-get update', puts);
		exec('sudo apt-get install -y mongodb-org', puts);
		exec('echo "mongodb-org hold" | sudo dpkg --set-selections', puts);
		exec('echo "mongodb-org-server hold" | sudo dpkg --set-selections', puts);
		exec('echo "mongodb-org-shell hold" | sudo dpkg --set-selections', puts);
		exec('echo "mongodb-org-mongos hold" | sudo dpkg --set-selections', puts);
		exec('echo "mongodb-org-tools hold" | sudo dpkg --set-selections', puts);
		console.log('MongoDB setup done.');
	}
}


console.log('Executing first time setup...');
// Run command depending on the OS
if (os.type() === 'Windows_NT') {
	console.log('Running on a Windows based OS');
	mongodb(0);
} else if (os.type() === 'Darwin') {
	console.log('Running on a macOS based OS');
	mongodb(1);
} else if (os.type() === 'Linux') {
	console.log('Running on Linux based OS');
	mongodb(2);
} else {
	throw new Error('Unsupported OS found: ' + os.type());
}

console.log('--------------------------------------------');
console.log('Installing third-part dependencies...');
exec('npm install', puts);
