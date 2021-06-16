const exec = require('child_process').exec;
const os = require('os');

function puts(error, stdout) {
	console.log(error);
	console.log(stdout);
}

function windows_setup(error) {
	if(error && error.code == 1 && error.cmd == 'mongo -version') {
		console.log('Downloading and installing MongoDB. This may take a while...');
		exec('%cd%\\scripts\\build_win.bat &&\
		%cd%\\scripts\\start_win.bat', puts);
	} else {
		console.log('MongoDB already installed. Skipping.');
		exec('%cd%\\scripts\\start_win.bat', puts);
	}
}

function linux_setup(error) {
	if(error && error.code == 127 && error.cmd == 'mongo -version') {
		exec('chmod +x ./scripts/build_linux.sh &&\
		./scripts/build_linux.sh &&\
		chmod +x ./scripts/start_linux.sh &&\
		./scripts/start_linux.sh', puts);
	} else {
		console.log('MongoDB already installed.');
		exec('chmod +x ./scripts/start_linux.sh &&\
		./scripts/start_linux.sh', puts);
	}
}

// MONGODB SETUP
console.log('Executing first time setup...');
// Run command depending on the OS
if (os.type() === 'Windows_NT') {
	console.log('Running on a Windows based OS');
	exec('mongo -version', windows_setup);
} else if (os.type() === 'Darwin') {
	console.log('Running on a macOS based OS');
	console.log('Automatic setup not supported. Please check README.md');
	// exec('mongo -version', mongodb_handler);
} else if (os.type() === 'Linux') {
	console.log('Running on Linux based OS');
	exec('mongo -version', linux_setup);
} else {
	throw new Error('Unsupported OS found: ' + os.type());
}
