const { readdirSync } = require("fs");
const { join, resolve } = require("path");
module.exports = (client) =>{
  
const commandFiles = readdirSync(join(__dirname, "../src/commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "../src/commands", `${file}`));
  client.commands.set(command.name, command);
  command.aliases.forEach(alias => client.aliases.set(alias, command.name) );
}
  
  
const eventFiles = readdirSync(join(__dirname, "../src/events")).filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
const event = require(join(__dirname, "../src/events", `${file}`));
const eventName = file.substring(0, file.indexOf(".js"));
client.on(eventName, event.bind(null, client));
delete require.cache[require.resolve(resolve("src", "events", `${file}`))];
  }
}
