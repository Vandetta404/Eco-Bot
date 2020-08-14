
module.exports = {
name: "profile",
aliases: [],
run: async (client, message, args) => {
const user = client.tools.getUser(args.length >= 1 ? args.join(' ') : message.author.id);
if(user.bot)return message.channel.createMessage("**:x: | The bots cannot have profile card.**");
const userBalance = await client.findOrCreateUser(user.id);
message.channel.createMessage({
embed: new client.MessageEmbed()
        .setTitle(`Profile Card`)
        .addField(`User`, `<@${userBalance.user}>`)
        .addField(`Balance`, `\`$${userBalance.coins}\` 💸`, true)
        .addField(`XP`, `\`${userBalance.xp}/${userBalance.next}\`` , true)
        .addField(`Level`, `\`${userBalance.level}\``, true)
        .addField(`REPs`, `\`${userBalance.rep}\``, true)
        .setColor(0x2ecc71)
        .setThumbnail(user.avatarURL)
        .setTimestamp().get()
});
}};