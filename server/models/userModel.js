const { model, Schema } = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    email: String,
    name: String
  }, 
  {
    timestamps: true
  }
);
// We add the passport local mongoose super powers, we also define which field passport local mongoose will use
userSchema.plugin(passportLocalMongoose, { usernameField: "email" }); 
const User = model("User", userSchema);



module.exports = User;