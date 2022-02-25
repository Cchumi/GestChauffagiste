const mongoose = require("mongoose")
const Schema = mongoose.Schema

//const passportLocalMongoose = require("passport-local-mongoose")



const Societe = new Schema({
    societeName: {
        type: String,
        default: "",
    },
    directorFirstName: {
        type: String,
        default: "",
    },
    directorLastName: {
        type: String,
        default: "",
    },
    tvaIntra: {
        type: String,
        default: "",
    },
    address1: {
        type: String,
        default: "",
    },
    address2: {
        type: String,
        default: "",
    },
    code_postal: {
        type: Number,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    telephone: {
        type: String,
        default: "",
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
    {
        timestamps: true
    })

  /*  socket.io.on('connection', function(socket){
        console.log(socket.id);
    
        socket.on('disconnect', (reason) => {
            console.log(reason);
        });
    });*/

//User.plugin(passportLocalMongoose, { usernameField: "email" });
const SocieteExport = mongoose.model("Societe", Societe)


module.exports = SocieteExport