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

//TODO:
/*
eine möglichkeit invitations an andere zu geben:
- ein ejs erstellen um das zu machen
      - email feld
- get,post in userRoutes-> users/:id/invite

- js code in usersController
      - get -> gerade erstelltes ejs rendern
      - post -> user mit email bekommt invitations -> bei dem user wird unter chatroom inviations der charoom hinzugefügt

DONE:ein möglichkeit einladungen anzunehmen:
DONE:- wenn man auf jion gruckt wird aus chatroomInivations eins gelöscht und in chatrooms hinzugefügt
*/



$(document).ready(() => {
   $("#modal-button").click(() => {
     $(".modal-body").html("");
     console.log("modelTry");

    let link = document.baseURI;//$('#footer');//.attr('baseURI');
    var linkSplitted=link.split("/users/");
    var id = linkSplitted[1];
console.log(id);
       $.get(`/users/${id}/chatroomInvitations?format=json`, (results = {}) => {
      let data = results.data;
      if (!data || !data.chatroomInvitations) {console.log("no data");return;}
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
let link = document.baseURI;//$('#footer');//.attr('baseURI');
   console.log(link);
var linkSplitted=link.split("/users/");
var id = linkSplitted[1];
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
