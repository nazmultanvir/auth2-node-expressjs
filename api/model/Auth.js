const mongoose = require("mongoose");


const authSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  name: {
    fristName: String,
    lastName: String,
  },
  bday: Date,
  email: {
    type: String,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  phone: Number,
  password: String,
});

module.exports = mongoose.model("Auth", authSchema);
