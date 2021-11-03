var socket = io();

const params = new URLSearchParams(window.location.search);

if (!params.has("name") || !params.has("chat")) {
  window.location = "index.html";
  throw new Error("The name is necessary");
}

const user = { name: params.get("name"), chat: params.get("chat") };

socket.on("connect", function () {
  console.log("Connected to server");
  socket.emit("enterChat", user, (response) => {
    console.log("Usuarios conectados: ", response);
  });
});

socket.on("createMessage", (response) => {
  console.log("System: ", response);
});

socket.on("peopleList", (response) => {
  console.log("Conectados: ", response);
});

socket.on("privateMessage", (response) => {
  console.log("Private message: ", response);
});
