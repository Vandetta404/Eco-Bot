const userSchema = require("../../database/modules/User.js");

module.exports = {
name: "daily",
aliases: ["claim"],
run: async (client, message, args) => {
const userBalance = await client.findOrCreateUser(message.author.id);
let amount = Math.floor(Math.random() * 500) + 100;
const dailyTime = userBalance.daily_cooldown;
const time = client.ms(dailyTime - Date.now());
if(dailyTime > Date.now())
message.channel.createMessage(`**:x: | You can get your daily reward after ( \`${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds\` )**`);
else {
await userSchema.findOneAndUpdate({user: message.author.id},{ coins: (userBalance.coins + amount), daily_cooldown: (Date.now() + 86400000) });
message.channel.createMessage(`**:moneybag: | You got \`$${amount}\` money!!**`);
 }
}};