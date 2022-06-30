$(document).ready(() => {
   $("#modal-button").click(() => {
     $(".modal-body").html('');
     $.get(`/users/${currentUser._id}/chatrooms?format=json`, (data) => {
    data.forEach((chatroom) => {
    $(".modal-body").append(
      `<div>
        <span class="chatroom-title">
          ${chatroom.title}
        </span>
        <div class="chatroom-description">
          ${chatroom.description}
        </div>
      </div>`
      );
    });
     });
   });
});
