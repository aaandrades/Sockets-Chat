var params = new URLSearchParams(window.location.search);
var socket = io();

// Jquery references
const divUsuarios = $("#divUsuarios");
const formSend = $("#formSend");
const txtMessage = $("#txtMessage");
const divChatbox = $("#divChatbox");
const showPanel = document.querySelector('#arrow');

const user = params.get("name");
const chat = params.get("chat");

let showingPanel = true;

document.getElementById('room-title').innerHTML = "Chat Room: " + chat;

// Functions to render users
const renderUsers = (users) => {
  let html = "";

  html += "<li>";
  html += `<div class="active">Welcome, <span> ${params.get("name")}</span></div>`;
  html += `<p class="connected">Users</p>`;
  html += "</li>";

  for (let i = 0; i < users.length; i++) {
    html += "<li class='li-container'>";
      html += `<div data-id="${users[i].id}" class="user-row"><img src="assets/images/users/${i + 1}.jpg" alt="user-img" class="img-circle"/>`;
      html += `<div class="chat-description"><span>${users[i].name}</span>`;
      html += `<span class="text-success">online</span></div></div>`;
    html += "</li>";
  }
  divUsuarios.html(html);
};

// Listeners
divUsuarios.on("click", "div", function () {
  let id = $(this).data("id");
  if (id) {
    console.log("If you need the ID: ", id);
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
        html += `<span class="user-name">${message.user}</span>`;
        html += `<div class="chat-text"><span>${message.message}</span><span class="chat-time">${time}</span></div>`;
        html += ``;
      html += "</div>";
      html += '<img src="assets/images/users/5.jpg" alt="user" class="img-circle chat-modifier"/>';
    html += "</li> ";
  } else {
    html += "<li class='complete animated fadeIn'>";
    if(message.user !== 'Admin') {
      html += '<div class="chat-img"> <img src="assets/images/users/1.jpg" alt="user" class="img-circle chat-modifier"/></div>';
    }
      html += '<div class="chat-left">';
        html += `<span class="user-name">${message.user}</span>`;
        html += `<div class="chat-complete color-${adminClass}"> ${message.message} <span class="chat-time">${time}</span></div>`;
        html += ``;
      html += "</div>";
    html += "</li>";
  }

  divChatbox.append(html);
};

const scrollBottom = () => {

  // selectors
  const newMessage = divChatbox.children('li:last-child');

  // heights
  const clientHeight = divChatbox.prop('clientHeight');
  const scrollTop = divChatbox.prop('scrollTop');
  const scrollHeight = divChatbox.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      divChatbox.scrollTop(scrollHeight);
  }
}

showPanel.addEventListener('click', ()=> {
  const panel = document.getElementById('panel');
  if(showingPanel){
    panel.classList.remove("hide-panel");
    panel.classList.add("overflow-panel");
    document.getElementById("chevron").innerHTML = 'chevron_left'
    showingPanel = false;
  } else {
    panel.classList.add("hide-panel");
    document.getElementById("chevron").innerHTML = 'chevron_right'
    showingPanel = true;
  }
});
