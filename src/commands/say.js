module.exports = {
name: "say",
aliases: [],
run: async (client, message, args) => {
  message
    .channel
    .createMessage(args[0] ? args.join(" ") : "Nothing");
}};