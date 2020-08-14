module.exports = async (client, message) =>{
if(!message.channel.guild || message.author.bot)return;
if(!message.channel.permissionsOf(client.user.id).has("allText"))return;
const { PREFIX } = client.config;
require("../../EcoSystem/Core.js")(client, message);
if(!message.content.startsWith(PREFIX))return;
const args = message.content.slice(PREFIX.length).trim().split(/ +/);
const commandName = args.shift().toLowerCase();
const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
if (!command) return;
try {
    command.run(client, message, args);
  } catch (error) {
    console.error(error);
  }
};