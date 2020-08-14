
const userSchema = require("../../database/modules/User.js");

module.exports = {
name: "rep",
aliases: [],
run: async (client, message, args ) => {
if(!args[0])return message.channel.createMessage("**:x: | Plz mention someone.**");
const user = client.tools.getUser(args.join(' '));
if(!user)return message.channel.createMessage("**:x: | User not found.**");
if(user.bot)return message.channel.createMessage("**:x: | The bots cannot have rep.**");
if(user.id == message.author.id)return message.channel.createMessage("**:x: | You can't rep youself.**");
const messageAuthor = await client.findOrCreateUser(message.author.id);
const targetUser = await client.findOrCreateUser(user.id);
const time = client.ms(messageAuthor.rep_cooldown - Date.now());
if(messageAuthor.rep_cooldown > Date.now()) message.channel.createMessage(`**:x: | You can rep someone after ( \`${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds\` )**`);
else {
message.channel.createMessage(`**🆙 | You have been repsected <@${user.id}>**`);
await userSchema.findOneAndUpdate({user: message.author.id},{ rep_cooldown: (Date.now() + 86400000) });
await userSchema.findOneAndUpdate({user: user.id},{ rep: (targetUser.rep + 1) });
}
}};
