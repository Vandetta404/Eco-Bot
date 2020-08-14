const EcoClient = require("./Base/EcoClient.js");
const client = new EcoClient(require("./config.json").TOKEN,  {
    disableEveryone: true,
    defaultImageSize: 512
});

client.on("disconnect", () => console.warn("Eco is Disconnecting..."))
	.on("error", (err) => console.error(err))
	.on("warn", (info) => console.log(info));

  process.on("uncaughtException", err => {
    console.error(`Uncaught Exception: ${err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./")}`);
    process.exit(1);
  }).on("unhandledRejection", err => console.error(`Unhandled rejection: ${err}`));

client.connect();