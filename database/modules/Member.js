const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model("Member", 
new Schema({
    member: { type: String },
    guild: { type: String },
    xp: { type: Number, default: 1},
    next: { type: Number, default: 50},
    level: { type: Number, default: 0},
    rank: { type: Number, default: 0 }
  }));