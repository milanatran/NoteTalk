const socket = io("http://localhost:3000");
const messageForm = document.getElementById("send-container");
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");

// TODO: Connect user to chatroom
const name = prompt("Type in your name: ");
appendMessage("You joined");
socket.emit("new-user", name);

socket.on("chat-message", data => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", name => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", name => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", e => {
  // Prevent refreshing the site to not lose the chat messages
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${data.message});
  socket.emit("send-chat-message", message);
  // Clear out message input everytime we send a message
  messageInput.value = "";
});

// Put out the messages on to the chatroom.html
function appendMessage(message){
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement)
}
