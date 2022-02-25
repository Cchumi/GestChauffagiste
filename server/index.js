const express = require("express")
const cors = require("cors")
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const passport = require("passport")
const session = require('express-session');
const path = require("path");
if (process.env.NODE_ENV !== "production") {
    // Load environment variables from .env file in non prod environments
    require("dotenv").config()
}
require("./utils/connectdb")

require("./strategies/JwtStrategy")
require("./strategies/LocalStrategy")
require("./authenticate")

const userRouter = require("./routes/userRoutes/userRoutes")
const clientRouter = require("./routes/clientRoutes/clientsRoutes")
const app = express()

app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
// use the express-static middleware
//app.use(express.static("public"))
if (process.env.NODE_ENV === "production") {
    console.log('we are on production!')
    // Step 1:
    app.use(express.static(path.resolve(__dirname, "../client/build")));
    // Step 2:
    app.get("/", function (request, response) {
        response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    });
}
//app.use(express.static(__dirname + '/public'));

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
    ? process.env.WHITELISTED_DOMAINS.split(",")
    : []
console.log(whitelist)
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    //origin: true,
    credentials: true,
}

app.use(cors(corsOptions))
const server = http.createServer(app);

global.io = socketIo(server); // < Interesting!
require("./utils/listeners")
app.use(passport.initialize())

app.use("/users", userRouter)
app.use("/clients", clientRouter)

io.of("/api/socket").on("connection", (socket) => {
    console.log("socket.io: User connected: ", socket.id);
  
    socket.on("disconnect", () => {
      console.log("socket.io: User disconnected: ", socket.id);
    });
  });


server.listen(process.env.PORT || 8081, function () {
    const port = server.address().port

    console.log("App started at port:", port)
})