const mongoose = require("mongoose")
const Schema = mongoose.Schema



const Materiel = new Schema({
  marque: {
    type: String,
    default: "",
  },
  modele: {
    type: String,
    default: "",
  },
  numero_serie: {
    type: String,
    default: "",
  },
  annee: {
    type: String,
    default: "",
  },
})
const MaterielExport = mongoose.model("Materiel", Materiel)

module.exports = MaterielExport