function generateXp(min, max) {
    return Math.ceil(Math.random() * (max - min + 1));
}
const cooldown = new Set();
module.exports = async (client, message) => {
  const MemberSchema = require("../database/modules/Member.js"),
  UserSchema = require("../database/modules/User.js"),
  Member = await client.findOrCreateMember(message.author.id, message.channel.guild.id ),
  User = await client.findOrCreateUser(message.author.id);
  
try {
  
/* >>>> Guild Scores  <<<<*/
if (!cooldown.has(message.author.id)) {
if (Member.xp >= Member.next){
  
await MemberSchema.findOneAndUpdate({ member: Member.member, guild: message.channel.guild.id  }, { xp: (Member.xp + 1), level: (Member.level + 1), next: Math.floor(Member.next * 1.45) });

} else await MemberSchema.findOneAndUpdate({ member: Member.member, guild: message.channel.guild.id }, { xp: (Member.xp + 1) });
  
  
  
/* >>>> Globla Scores  <<<<*/
if (User.xp >= User.next){
  
await UserSchema.findOneAndUpdate({ user: User.user}, {xp: (User.xp + 1), level: (User.level + 1), next: Math.floor(User.next * 1.45), coins: (User.coins + 36)});

} else await UserSchema.findOneAndUpdate({ user: User.user }, { xp: (User.xp + 1), coins: (User.coins + generateXp(1, 15)) });

  
/* >>>> Sorting Guild Scores Ranks  <<<<*/
await MemberSchema.find({guild: message.channel.guild.id }, async (err, row) => {
if(err)return;
let setRanks = row.map((x) => x.user),
        i = 0;
while (setRanks[i]) {
await MemberSchema.findOneAndUpdate({user: setRanks[i], guild: message.channel.guild.id }, { rank: i + 1 });
i++;
}}).sort({ xp: -1 });
 
 cooldown.add(message.author.id);
  setTimeout(() => cooldown.delete(message.author.id), 5000);
 }
}catch(e){ console.error(e) }
};