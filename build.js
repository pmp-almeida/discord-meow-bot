var sys = require('util');
var exec = require('child_process').exec;
var os = require('os');

function puts(error, stdout, stderr) { console.log(stdout) }

// Run command depending on the OS
if (os.type() === 'Windows_NT') {
  exec('cls', puts)
  console.log('Running on a Windows based OS')
  console.log('Executing first time setup...')
  console.log('--------------------------------------------')

  //MONGODB SETUP
  console.log('Downloading and installing MongoDB. This may take a while...')
  exec('powershell.exe "curl https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.6-signed.msi -outfile mongodb.msi"', puts)

  console.log('Done')
  
  //exec("node build-linux.js", puts);
} else if (os.type() === 'Darwin') {
  console.log('Running on a macOS based OS')
} else if (os.type() === 'Linux') {
  exec('clear', puts)
  console.log('Running on Linux based OS')
  console.log('Executing first time setup...')
  console.log('--------------------------------------------')

  //MONGODB SETUP
  console.log('Downloading and installing MongoDB. This may take a while...')
  const linux_version = os.version().split("~")[1].substring(0,5)
  exec('wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -', puts)
  if (linux_version === '20.04')
    exec('echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list', puts)
  else if (linux_version === '18.04')
    exec('echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list', puts)
  else if (linux_version === '16.04')
    exec('echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list', puts)

  exec('sudo apt-get update', puts)
  exec('sudo apt-get install -y mongodb-org', puts)
  exec('echo "mongodb-org hold" | sudo dpkg --set-selections', puts)
  exec('echo "mongodb-org-server hold" | sudo dpkg --set-selections', puts)
  exec('echo "mongodb-org-shell hold" | sudo dpkg --set-selections', puts)
  exec('echo "mongodb-org-mongos hold" | sudo dpkg --set-selections', puts)
  exec('echo "mongodb-org-tools hold" | sudo dpkg --set-selections', puts)


  //SMTH ELSE


} else
  throw new Error('Unsupported OS found: ' + os.type());

exec('npm install', puts)
