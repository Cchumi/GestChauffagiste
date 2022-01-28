const mongoose = require("mongoose")
const url = process.env.MONGO_DB_CONNECTION_STRING
//console.log(url)
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 // useCreateIndex: true,
})
connect
  .then(db => {
    console.log("connected to db")
  })
  .catch(err => {
    console.log(err)
  })