const { Client, Collection } = require("eris");
const Functions = require('./Functions.js');
const userSchema = require("../database/modules/User.js");
const memberSchema = require("../database/modules/Member.js");
class EcoClient extends Client {
constructor (options) {
super(options);
this.tools = new Functions(this);
this.commands = new Collection();
this.aliases = new Collection();
this.config = require("../config.json");
this.MessageEmbed = require("../structures/MessageEmbed.js");
this.findOrCreateUser = async function (userID){
let row = await userSchema.findOne({
      user: userID
    }).catch(()=> {});
if (!row) {
let data = new userSchema({ user: userID });
await data.save().catch(console.error);
return data;
} else return row;
};
  
this.findOrCreateMember = async function (userID, guildID){
let row = await memberSchema.findOne({
      member: userID,
      guild: guildID
    }).catch(() => {});
if (!row) {
let data = new memberSchema({ member: userID, guild: guildID });
await data.save().catch(console.error);
return data;
} else return row;
};

this.ms = function(milliseconds) {
const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
        return {
            days: roundTowardsZero(milliseconds / 86400000),
            hours: roundTowardsZero(milliseconds / 3600000) % 24,
            minutes: roundTowardsZero(milliseconds / 60000) % 60,
            seconds: roundTowardsZero(milliseconds / 1000) % 60,
            milliseconds: roundTowardsZero(milliseconds) % 1000,
            microseconds: roundTowardsZero(milliseconds * 1000) % 1000,
            nanoseconds: roundTowardsZero(milliseconds * 1e6) % 1000
        }
    };
  
///// Load Files /////
(async () => {
try {
await require("./LoadFiles.js")(this);
await require("../database/mongodb.js")(this);
}catch(err){
  console.error("Can't load files.. :. ", err);
}
})();
  
}};

module.exports = EcoClient;