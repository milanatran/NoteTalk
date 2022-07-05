const socket = io();
$("#chatForm").submit(() => {
 socket.emit("message");
 $("#chat-input").val("");
 return false;
});

socket.on("message", (message) => {
 displayMessage(message.content);
});

let displayMessage = (message) => {
 $("#chat").prepend($("<li>").html(message));
};
