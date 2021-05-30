var sys = require('sys');
var exec = require('child_process').exec;
var os = require('os');

function puts(error, stdout, stderr) { sys.puts(stdout) }

// Run command depending on the OS
if (os.type() === 'Linux')
  console.log("Running on a Linux based OS")
   //exec("node build-linux.js", puts);
else if (os.type() === 'Darwin')
  console.log("Running on a macOS based OS")
   //exec("node build-mac.js", puts);
else if (os.type() === 'Windows_NT')
  console.log("Running on a Windows based OS")
   //exec("node build-windows.js", puts);
else
   throw new Error("Unsupported OS found: " + os.type());
