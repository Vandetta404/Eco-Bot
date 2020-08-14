const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model("User", 
new Schema({
    user: { type: String, unique: true},
    coins: { type: Number, default: 5},
    xp: { type: Number, default: 1},
    next: { type: Number, default: 50},
    level: { type: Number, default: 0},
    rep: {type: Number, default: 0},
    rep_cooldown: { type: Number, default: 0},
    daily_cooldown: { type: Number, default: 0},
  }));