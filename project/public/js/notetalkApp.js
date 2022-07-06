/*
$(document).ready(() => {
   $("#modal-button").click(() => {
     $(".modal-body").html('');
     $.get(`/users/${currentUser._id}/chatroomInvitations?format=json`, (data) => {
    data.forEach((chatroom) => {
    $(".modal-body").append(
      `<div>
        <span class="chatroom-title">
          ${chatroom.title}
        </span>

        <button class="join-button" data-id="${chatroomInvitation._id}">
         Join
        </button>

        <div class="chatroom-description">
          ${chatroom.description}
        </div>
      </div>`
      );
    });
     });
   });
});
*/



$(document).ready(() => {
   $("#modal-button").click(() => {
     $(".modal-body").html("");
     console.log("modelTry")
       $.get(`/users/${user._id}/chatroomInvitations?format=json`, (results = {}) => {
      let data = results.data;
      if (!data || !data.chatroomInvitations) return;
      data.chatroomInvitations.forEach((chatroomInvitation) => {
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
 $.get(`/users/${user._id}/chatroomInvitations/${chatroomInvitationId}/join`, (results = {}) => {
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
