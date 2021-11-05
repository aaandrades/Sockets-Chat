

var params = new URLSearchParams(window.location.search);

if (!params.has("name") || !params.has("chat")) {
  window.location = "index.html";
  throw new Error("The name and chat are mandatories");
}

var usuario = {
  name: params.get("name"),
  chat: params.get("chat"),
};

socket.on("connect", function () {
  console.log("Conectado al servidor");

  socket.emit("enterChat", usuario, function (resp) {
    renderUsers(resp);
  });
});

// escuchar
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

// Escuchar información
socket.on("createMessage", function (mensaje) {
//   console.log("Servidor:", mensaje);
  renderMessages(mensaje);
  scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on("peopleList", function (personas) {
  console.log(personas);
  renderUsers(personas);
});

// Mensajes privados
socket.on("privateMessage", function (mensaje) {
  console.log("Mensaje Privado:", mensaje);
});
