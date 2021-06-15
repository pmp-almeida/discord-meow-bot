#!/bin/bash

echo "Downloading and installing MongoDB. This may take a while..."
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

linux_version=$(grep 'VERSION_CODENAME' /etc/os-release | cut -c18-)
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $linux_version/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

sudo apt-get update
sudo apt-get install -y mongodb-org

echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections

printf "\n-----------------------------------\n"
echo "MongoDB installation complete."
echo "-----------------------------------"
printf "\n"

sleep 1
