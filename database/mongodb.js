const mongoose = require("mongoose");
module.exports = (client) => {
mongoose .connect(client.config.mongoDB, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true })
  .then(() => console.log("Connected to the Mongodb database."))
   .catch(err => console.error("Unable to connect to the Mongodb database. Error:" + err));
};