var params = new URLSearchParams(window.location.search);

if (!params.has("name") || !params.has("chat")) {
  window.location = "index.html";
  throw new Error("The name and chat are mandatories");
}

const usuario = {
  name: params.get("name"),
  chat: params.get("chat"),
};

socket.on("connect", function () {
  console.log("Connected to server");

  socket.emit("enterChat", usuario, function (resp) {
    renderUsers(resp);
  });
});

socket.on("disconnect", function () {
  console.log("We've lost the connection");
});

socket.on("createMessage", function (mensaje) {
  renderMessages(mensaje);
  scrollBottom();
});

socket.on("peopleList", function (personas) {
  renderUsers(personas);
});

socket.on("privateMessage", function (mensaje) {
  console.log("Private message:", mensaje);
});
