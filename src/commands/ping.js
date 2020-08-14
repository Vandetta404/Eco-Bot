
const responses = ["can't you see me?", "gotta go fast", "( ͡° ͜ʖ ͡°)", "try to take this [̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]", "vex is a meme"];
module.exports = {
name: "ping",
aliases: [],
run: async (client, message, args) => {
  let inbf = Date.now();
        message.channel.createMessage(responses[Math.floor(Math.random() * responses.length)]).then(sentMsg => {
            let naw = Date.now();
            let final = naw - inbf;
            message.channel.editMessage(sentMsg.id, `**Pong** ${final}ms`);
        });
}};