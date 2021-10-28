var socket = io();

const params = new URLSearchParams(window.location.search);

if (!params.has("name")) {
  window.location = "index.html";
  throw new Error("The name is necessary");
}

const user = { name: params.get("name") };

socket.on("connect", function () {
  console.log("Connected to server");
  socket.emit("enterChat", user, (response) => {
    console.log("Usuarios conectados: ", response);
  });
});

socket.on("createMessage", (response) => {
  console.log("Get information: ", response);
});

socket.on("peopleList", (response) => {
  console.log("Conectados: ", response);
});
