module.exports = {
name: "help",
aliases: [],
run: async (client, message, args) => {

message.channel.createMessage({
  embed: new client.MessageEmbed()
                    .setTitle("Commands List")
                    .setDescription(client.commands.map(c=> `\`${c.name}\``).join(", "))
                    .setColor("RANDOM").get()
});
}};