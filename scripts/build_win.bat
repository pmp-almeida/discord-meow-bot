powershell "curl https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.6-signed.msi -outfile mongodb.msi"

msiexec.exe /l*v mdbinstall.log  /qb /i mongodb.msi ADDLOCAL="ServerService,Client" SHOULD_INSTALL_COMPASS="0"

powershell -Command "Start-Process %cd%\\scripts\\set_env_variables.bat -Verb RunAs"

set PATH=%PATH%;C:\\Program Files\\MongoDB\\Server\\4.4\\bin

echo MongoDB setup complete.