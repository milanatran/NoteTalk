//Client Side
const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

socket.on('chat-message', data => {
  appendMessage(data);
});

messageForm.addEventListener('submit', e => {
  //Stop site from refreshing so the chat does not disappear
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

// add the messages to the page
function appendMessage(message){
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
// $(document).ready(() => {
//   const socket = io();
//   $("#chatForm").submit(() => {
//    socket.emit("message");
//    $("#chat-input").val("");
//    return false;
//   });
//
//   socket.on("message", (message) => {
//    displayMessage(message.content);
//   });
//
//   let displayMessage = (message) => {
//    $("#chat").prepend($("<li>").html(message));
//   };
// }
