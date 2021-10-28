const { io } = require("../server");
const Users = require("../classes/users");
const { createMessage } = require("../helpers/util");

const users = new Users();

io.on("connection", (client) => {
  client.on("enterChat", (user, callback) => {
    if (!user.name) {
      return callback(createMessage("Admin", "The name is mandatory"));
    }
    const newPerson = users.addPerson(client.id, user.name);
    client.broadcast.emit("peopleList", users.getAllPeople());
    callback(newPerson);
  });

  client.on("createMessage", (data) => {
    let person = users.getPersonById(client.id);
    let message = createMessage(person.name, data.message);
    client.broadcast.emit("createMessage", message);
  });

  client.on("disconnect", () => {
    let deletePerson = users.deletePersonById(client.id);
    console.log(deletePerson);
    client.broadcast.emit(
      "createMessage",
      createMessage("Admin", `${deletePerson.name} left the chat`)
    );
    client.broadcast.emit("peopleList", users.getAllPeople());
  });
});
