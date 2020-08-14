const MemberSchema = require("../../database/modules/Member.js");

module.exports = {
name: "leaderboard",
aliases: ["top"],
run: async (client, message, args) => {
const data = await MemberSchema
    .find({ guild: message.channel.guild.id })
    .sort({ xp: -1 })
    .limit(5);
  
const user = data.map(z => z.member);
const xp = data.map(y => y.xp);
const next = data.map(x => x.next);
const lb = user.map((a, b) => { 
  return [`#${b + 1}: ${client.users.get(a) ? `<@${a}>` : `\`Unknown#0000\``} | XP: \`${xp[b]}/${next[b]}\``];  
});

message.channel.createMessage({
embed: new client.MessageEmbed()
                    .setTitle(`Leaderboard of ${message.channel.guild.name}`)
                    .setDescription(lb.join("\n"))
                    .setColor(0x2ecc71).get()
});
}};