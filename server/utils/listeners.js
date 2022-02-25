const mongoose = require("mongoose")
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database connected");

    console.log("Setting change streams");
    const userChangeStream = connection.collection("users").watch([], {fullDocument: "updateLookup"});

    userChangeStream.on("change", (change) => {

        switch (change.operationType) {
            case "update":
                /*const user = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    description: change.fullDocument.description,
                };*/

                io.of("/api/socket").emit("updateUser", change.fullDocument);
                break;
            case "insert":
                const user = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    description: change.fullDocument.description,
                };

                io.of("/api/socket").emit("newUser", user);
                break;

            case "delete":
                io.of("/api/socket").emit("deletedUser", change.documentKey._id);
                break;
        }
    });
    const societeChangeStream = connection.collection("societes").watch([], {fullDocument: "updateLookup"});

    societeChangeStream.on("change", (change) => {
        
        switch (change.operationType) {
            case "update":
               /* const societe = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    description: change.fullDocument.description,
                };*/
                console.log("CHANGE SOCIETE", change.fullDocument)
                io.of("/api/socket").emit("updateSociete", change.fullDocument);
                break;
            case "insert":
                const societe = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    description: change.fullDocument.description,
                };

                io.of("/api/socket").emit("newSociete", societe);
                break;

            case "delete":
                io.of("/api/socket").emit("deletedSociete", change.documentKey._id);
                break;
        }
    });
});

//schedule deletion of users at midnight
/*cron.schedule("0 0 0 * * *", async () => {
  await connection.collection("users").drop();

  io.of("/api/socket").emit("usersCleared");
});*/

connection.on("error", (error) => console.log("Error: " + error));