const { io } = require("../server");
const Users = require("../classes/users");
const { createMessage } = require("../helpers/util");

const users = new Users();

io.on("connection", (client) => {
  client.on("enterChat", (user, callback) => {
    if (!user.name || !user.chat) {
      return callback(createMessage("Admin", "The name/chat are mandatory"));
    }
    client.join(user.chat);
    users.addPerson(client.id, user.name, user.chat);
    client.broadcast.to(user.chat).emit("peopleList", users.getPeopleByRoom(user.chat));
    callback(users.getPeopleByRoom(user.chat));
  });

  client.on("createMessage", (data) => {
    let person = users.getPersonById(client.id);
    let message = createMessage(person.name, data.message);
    client.broadcast.to(data.chat).emit("createMessage", message);
  });

  client.on("disconnect", () => {
    let deletePerson = users.deletePersonById(client.id);
    if(deletePerson?.name){
      client.broadcast.to(deletePerson.chat).emit("createMessage",createMessage("Admin", `${deletePerson?.name} left the chat`));}    
      client.broadcast.to(deletePerson.chat).emit("peopleList", users.getPeopleByRoom(deletePerson.chat));
  });

  // Private messages
  client.on("privateMessage", (data) => {
    let person = users.getPersonById(client.id);

    client.broadcast.to(data.to).emit(
      "privateMessage",
      createMessage(person.name, data.message)
    );
  });
});
