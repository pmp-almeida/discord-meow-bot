#!/bin/bash

echo "Starting up MongoDB..."
v1=$(ps --no-headers -o comm 1)
v2="systemd"
if [ "$v1" = "$v2" ]; then
{
  sudo systemctl start mongod
} || {
  sudo systemctl daemon-reload &&
  sudo systemctl start mongod
}
else
  sudo service mongod start
fi
printf "Done.\n\n"

sleep 1
