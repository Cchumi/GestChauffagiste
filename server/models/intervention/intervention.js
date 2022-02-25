const mongoose = require("mongoose")
const Schema = mongoose.Schema

//const passportLocalMongoose = require("passport-local-mongoose")



const Intervention = new Schema({
    nomIntervention: {
        type: String,
        default: "",
    },
    typeIntervention: {
        type: String,
        default: "",
    },
    dateIntervention: {
        type: String,
        default: "",
    },
    dateDebutIntervention: {
        type: String,
        default: "",
    },
    dateFinIntervention: {
        type: String,
        default: "",
    },
    statutIntervention: {
        type: String,
        default: "",
    },
    urgenceIntervention: {
        type: String,
        default: "",
    },
    client:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
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
const InterventionExport = mongoose.model("Intervention", Intervention)


module.exports = InterventionExport