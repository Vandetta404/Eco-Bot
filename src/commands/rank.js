module.exports = {
name: "rank",
aliases: [],
run: async (client, message, args) => {
let user = client.tools.getUser(args.length >= 1 ? args.join(' ') : message.author.id);
if(user.bot)return message.channel.createMessage("**:x: | The bots cannot have money card.**");
var userBalance = await client.findOrCreateMember(user.id, message.channel.guild.id);

message.channel.createMessage({
embed: new client.MessageEmbed()
.setTitle(`Rank Card of ${user.username}`)
.setColor(0x2ecc71)
  .addField("LEVEL: ", `\`${userBalance.level}\``, true)
  .addField("XP: ",`\`${userBalance.xp}/${userBalance.next}\``, true).get()
   });
}};