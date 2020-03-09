
function click1(){
  
  chatListCmd(roomArray("Golden","morpheus"));
      
  return false;

}

function click2(){
 
  chatListCmd(roomArray("Ninja","ninja"));
      
  return false;




}



function roomArray(RoomName,pictureName){
  if(username=""){username="User"}
  var username = $('#chat_page > #chat_login > #divBut > #form1 > #divUser > #username').val();
 
  roomInfo = [RoomName,username,pictureName];
  $('#chat_page > #chat_login').css('display','none');

  $('#chat_page > #chat_list').attr('style',"");
return roomInfo;
}

      
 
       function chatListCmd(roomInfo){
 
        


        
        var socket = io();

    let messagePosition = ["in","out"];
    let position = messagePosition[Math.floor(Math.random()* messagePosition.length)];
    
  //  module.exports = arrayRoomInfo;
 
    socket.on("join_room",(roomInfo)=>{
   
     
   $("#info").text('');    
    $("#info").text(`A new User ${roomInfo[1]} is connected (${roomInfo[0]} Room).`);
 
 
 });  
 



 socket.emit("join_room",roomInfo);
        
 
 
    socket.on('room_message', function(room,arrayOfInfo){
    
    
 
 $('#messages').append(`<li class=${arrayOfInfo[1]}>
  <div class="chat-img">
   <img alt="Avtar" src="assets/${arrayOfInfo[3]}.jpg">
    </div>
    <div class="chat-body">
      <div class="chat-message">
        <h5>${arrayOfInfo[2]}</h5>
         <p>  ${arrayOfInfo[0]} </p>
        </div></div></li>`);
 });
    
 
 socket.on("disconnect",()=>{


  
 })
 
 
 socket.on("leave_room",(roomInfo)=>{
 //if(arrayOfUserInf[1] > 0){
 //arrayOfUserInf[1]-=1;}
 $("#chat_page > #chat_list > #info").text('');    
  $("#chat_page > #chat_list > #info").text(`User ${roomInfo[1]} left (${roomInfo[0]} Room).`);
  $('#chat_page > #chat_list').css('display','none');

  $('#chat_page > #chat_login').attr('style',"");

 });
 
 $('#chat_page > #chat_list > #btnLeave').click(()=>{
  
  
socket.emit("leave_room",roomInfo);

 })
    $('#chat_page > #chat_list > #form2').submit(function(){
      //e.preventDefault();
      arrayOfInfo= [$('#inputM').val(),position,roomInfo[1],roomInfo[2]]
      socket.emit('room_message',roomInfo[0], arrayOfInfo);
      
      $('#inputM').val('');
      return false;
    });
    
       }
   

  

      
 //});

  
  //chat room by providing the name, image, roomname, display all lists needed