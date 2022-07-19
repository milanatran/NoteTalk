
$(document).ready(() => {

  const socket = io();

  $("#chatForm").submit(() => {
 let text = $("#chat-input").val(),
 userName = $("#chat-user-name").val(),
 userId = $("#chat-user-id").val();
 socket.emit("message", {
 content: text,
 userName: userName,
 userId: userId
 });
 $("#chat_input").val("");
 return false;
});

socket.on("message", (message) => {
  displayMessage(message);
  for (let i = 0; i < 2; i++) {
    $(".chat-icon").fadeOut(200).fadeIn(200);
  }
});

  socket.on("load all messages", (data) => {
   data.forEach(message => {
     displayMessage(message);
   });
  });

  socket.on("user disconnected", () => {
   displayMessage({
   userName: "Notice",
   content: "User left the chat"
   });
  });

  let displayMessage = (message) => {
    $("#chat").prepend($("<li>").html(`
   <strong class="message ${getCurrentUserClass(message.user)}">
   ${message.userName}
   </strong>: ${message.content}
   `));
  };

let getCurrentUserClass = (id) => {
 let userId = $("#chat-user-id").val();
 return userId === id ? "current-user": "";
};

   $("#modal-button").click(() => {
     $(".modal-body").html("");
     console.log("modelTry");

    let link = document.baseURI;//$('#footer');//.attr('baseURI');
    var linkSplitted=link.split("/users/");
    var idWithSlash =linkSplitted[1];
    var id =idWithSlash.split("/")[0];

console.log(id);
       $.get(`/users/${id}/chatroomInvitations?format=json`, (results = {}) => {
      let data = results;
      console.log(data);
      console
      if (!data || data.length<1) {console.log("no data");return;}
      data.forEach((chatroomInvitation) => {
        $(".modal-body").append(`<div>
        <span class="chatroomInvitation-title">
        ${chatroomInvitation.title}
        </span>
        <button class="join-button" data-id="${chatroomInvitation._id}">
        Join
        </button>
        <div class="chatroomInvitation-description">
        ${chatroomInvitation.description}
        </div>
        </div>`
        );
        });
    }).then(() => {
    addJoinButtonListener();
     });
   });
});


let addJoinButtonListener = () => {
 $(".join-button").click((event) => {
 let $button = $(event.target),
chatroomInvitationId = $button.data("id");

let link = document.baseURI;//$('#footer');//.attr('baseURI');
var linkSplitted=link.split("/users/");
var idWithSlash =linkSplitted[1];
var id =idWithSlash.split("/")[0];
 $.get(`/users/${id}/chatroomInvitations/${chatroomInvitationId}/join`, (results = {}) => {
let data = results.data;
if (data && data.success) {
$button
.text("Joined")
.addClass("joined-button")
.removeClass("join-button");
} else {
$button.text("Try again");
}
 });
 });
}
