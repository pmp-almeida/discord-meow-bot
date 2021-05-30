const exec = require('child_process').exec;
const os = require('os');

function puts(error, stdout) { console.log(stdout); }

// MONGODB SETUP
// windows
function mongodb_win_handler(error) {
	if(error && error.code == 127 && error.cmd == 'mongo -version') {
		console.log('Downloading and installing MongoDB. This may take a while...');
		exec('powershell.exe "curl https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.6-signed.msi -outfile mongodb.msi" &&\
msiexec.exe /l*v mdbinstall.log  /qb /i mongodb-windows-x86_64-4.4-signed.msi SHOULD_INSTALL_COMPASS="0" &&\
\nMongoDB setup complete.', puts);
	} else {
		console.log('MongoDB already installed. Skipping.');
	}
}

// linux
function mongodb_lin_handler(error) {
	if(error && error.code == 127 && error.cmd == 'mongo -version') {
		console.log('Downloading and installing MongoDB. This may take a while...');
		const linux_version = os.version().split('~')[1].substring(0, 5);
		let url_string;
		if (linux_version === '20.04') {
			url_string = 'focal';
		} else if (linux_version === '18.04') {
			url_string = 'bionic';
		} else if (linux_version === '16.04') {
			url_string = 'xenial';
		}
		exec(`wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add - &&\
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu ${url_string}/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list &&\
sudo apt-get update &&\
sudo apt-get install -y mongodb-org &&\
echo "mongodb-org hold" | sudo dpkg --set-selections &&\
echo "mongodb-org-server hold" | sudo dpkg --set-selections &&\
echo "mongodb-org-shell hold" | sudo dpkg --set-selections &&\
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections &&\
echo "mongodb-org-tools hold" | sudo dpkg --set-selections &&\
echo "\nMongoDB setup complete."`, puts);
	} else {
		console.log('MongoDB already installed. Skipping.');
	}
}

console.log('Executing first time setup...');
// Run command depending on the OS
if (os.type() === 'Windows_NT') {
	console.log('Running on a Windows based OS');
	exec('mongo -version', mongodb_win_handler);
} else if (os.type() === 'Darwin') {
	console.log('Running on a macOS based OS');
	console.log('Automatic setup not supported. Please check README.md');
	// exec('mongo -version', mongodb_handler);
} else if (os.type() === 'Linux') {
	console.log('Running on Linux based OS');
	exec('mongo -version', mongodb_lin_handler);
} else {
	throw new Error('Unsupported OS found: ' + os.type());
}
