const exec = require('child_process').exec;
const os = require('os');
const build_win = require('./build_win');

function puts(error, stdout) {
	console.log(error);
	console.log(stdout);
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
	exec('mongo -version', build_win.mongodb_win_handler);
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
