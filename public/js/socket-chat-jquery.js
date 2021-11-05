var params = new URLSearchParams(window.location.search);
var socket = io();

// Jquery references
const divUsuarios = $("#divUsuarios");
const formSend = $("#formSend");
const txtMessage = $("#txtMessage");
const divChatbox = $("#divChatbox");

const user = params.get("name");
const chat = params.get("chat");

document.getElementById('room-title').innerHTML = "Chat Room: " + chat

// Functions to render users
const renderUsers = (users) => {
  // title.val("Chat Room:" + chat);
  let html = "";

  html += "<li>";
  html += `<a href="javascript:void(0)" class="active">Chat de <span> ${params.get(
    "chat"
  )}</span></a>`;
  html += "</li>";

  for (let i = 0; i < users.length; i++) {
    html += "<li>";
    html += `<a data-id="${
      users[i].id
    }"href="javascript:void(0)"><img src="assets/images/users/${
      i + 1
    }.jpg" alt="user-img" class="img-circle"/>`;
    html += `<span>${users[i].name}<small class="text-success">online</small></span></a>`;
    html += "</li>";
  }
  divUsuarios.html(html);
};

// Listeners
divUsuarios.on("click", "a", function () {
  let id = $(this).data("id");
  if (id) {
    console.log(id);
  }
});

formSend.on("submit", function (e) {
  e.preventDefault();

  if (txtMessage.val().trim().length === 0) {
    return;
  }

  socket.emit(
    "sendMessage",
    { name: user, message: txtMessage.val(), chat },
    (resp) => {
      txtMessage.val("").focus();
      renderMessages(resp, true);
      scrollBottom();
    }
  );
});

const renderMessages = (message, own = false) => {

  let html = "";
  const currentData = new Date(message.date);
  const time = currentData.getHours() + ":" + currentData.getMinutes();

  let adminClass = 'info';

  if(message.user === 'Admin'){
    adminClass = 'danger';
  }
  
  if (own) {
    html += "<li class='reverse animated fadeIn'>";
    html += '<div class="chat-content">';
    html += `<h5>${message.user}</h5>`;
    html += `<div class="box bg-light-inverse">${message.message}</div>`;
    html += "</div>";
    html +='<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
    html += `<div class="chat-time">${time}</div>`;
    html += "</li> ";
  } else {
    html += "<li class='animated fadeIn'>";
    if(message.user !== 'Admin'){
      html += '<div class="chat-img"> <img src="assets/images/users/1.jpg" alt="user" /></div>';
    }
    html += '<div class="chat-content">';
    html += `<h5>${message.user}</h5>`;
    html += `<div class="box bg-light-${adminClass}"> ${message.message} </div>`;
    html += "</div>";
    html += `<div class="chat-time">${time}</div>`;
    html += "</li>";
  }

  divChatbox.append(html);
};

const scrollBottom = () => {

  // selectors
  var newMessage = divChatbox.children('li:last-child');

  // heights
  var clientHeight = divChatbox.prop('clientHeight');
  var scrollTop = divChatbox.prop('scrollTop');
  var scrollHeight = divChatbox.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      divChatbox.scrollTop(scrollHeight);
  }
}
