
const userSchema = require("../../database/modules/User.js");

module.exports = {
name: "credits",
aliases: ["bal", "coins", "money"],
run: async (client, message, args ) => {
const user = client.tools.getUser(args.length >= 1 ? args[0] : message.author.id);
if(user.bot)return message.channel.createMessage("**:x: | The bots cannot have money card.**");
const targetUser = await client.findOrCreateUser(user.id);
const messageAuthor = await client.findOrCreateUser(message.author.id);
if(args[1]){
if(user.id == message.author.id)return message.channel.createMessage("**:x: | You can't give yourself money..**");
if(isNaN(parseInt(args[1])))return message.channel.createMessage("**:x: | Inviled Amount**");    
if(parseInt(args[1]) > messageAuthor.coins)return message.reply("**:x: | You don't have enough money!**");
await userSchema.findOneAndUpdate({user: message.author.id},{ coins: (messageAuthor.coins - Math.floor(parseInt(args[1]))) });
await userSchema.findOneAndUpdate({user: user.id},{ coins: (targetUser.coins + Math.floor(parseInt(args[1]))) });
message.channel.createMessage(`**<@${message.author.id}>, You have been sent \`$${Math.floor(parseInt(args[1]))}\` to <@${user.id}>**`);
}else return message.channel.createMessage(`**💳 | <@${targetUser.user}>'s have a \`$${targetUser.coins}\`**`);
}};