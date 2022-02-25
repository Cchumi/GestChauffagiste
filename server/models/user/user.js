const mongoose = require("mongoose")
const Schema = mongoose.Schema

const passportLocalMongoose = require("passport-local-mongoose")

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const User = new Schema({
    firstName: {
        type: String,
        default: "",
    },
    userName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    password: {
        type: String,
    },
    authStrategy: {
        type: String,
        default: "local",
    },
    role: {
        type: String,
        default: "user"
    },
    online: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: [Session],
    },
    societe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Societe"
    },
    interventions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Intervention"
        }
    ]
},
    {
        timestamps: true
    })

   /* User.pre("save", async function (next) {
        if (!this.isModified("password")) {
          return next();
        }
        const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
        this.password = hash;
        next();
      });*/
//Remove refreshToken from the response
User.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})

User.plugin(passportLocalMongoose, { usernameField: "email" });
const UserExport = mongoose.model("User", User)
/*UserExport.watch().
    on('change', data => console.log(new Date(), data));*/
module.exports = UserExport