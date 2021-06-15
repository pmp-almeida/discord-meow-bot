
echo "MongoDB setup complete 1."
echo "MongoDB setup complete 2."
sleep 1
echo "MongoDB setup complete 3."
echo "MongoDB setup complete 4."

printf "\n-----------------------------------\n"
echo "MongoDB installation complete."
echo "-----------------------------------"
printf "\n"

sleep 1

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

echo "Checking for existing MongoDB database..."
if [ $(mongo --eval 'db.getMongo().getDBNames().indexOf("discord-bot")' --quiet) -lt 0 ]; then
    echo "Database does not exists"
else
    echo "Database exists"
fi
