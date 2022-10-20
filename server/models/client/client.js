const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Client = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  societe: {
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
  address3: {
    type: String,
    default: "",
  },
  codePostal: {
    type: String,
    default: "",
  },
  ville: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  telephone_mobile: {
    type: String,
    default: "",
  },
  telephone_fixe: {
    type: String,
    default: "",
  },
  points: {
    type: Number,
    default: 50,
  },
  materiels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Materiel"
    }
  ],
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


const ClientExport = mongoose.model("Client", Client)
/*UserExport.watch().
    on('change', data => console.log(new Date(), data));*/
module.exports = ClientExport