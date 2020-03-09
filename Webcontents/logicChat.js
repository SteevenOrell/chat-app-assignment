
  $(function () {
   // $('#chat_page > #chat_list').css('display','none');
    let username="";
    
    let imageName = "";

    
    var arrayRoomInfo = [];
    var socket = io();
  
    
    socket.on("changePicture",(image)=>{
    
    $('#chat_page > #chat_login > #imageDiv > #ima').attr('src',`assets/${image}.jpg`);
    console.log("Picture client" + image)
    
    // eventEmitter.emit(image);
    });

 
   
    $('#chat_page > #chat_login > #div1 > #div2 > #div3 > #form1 >#divOption > #select1').bind("change",()=>{
    
    //if option selected change take its value and change the picture.
      imageName = $(' #chat_page > #chat_login > #div1 > #div2 > #div3 > #form1 > #divOption > #select1').find(":selected").val();
       console.log(imageName);
       
        if(imageName ==""){imageName = "ninja"};
     
      socket.emit("changePicture",imageName);
      
    
    });
    
    // when submitting chat login disappear and chat list appear
    $('#chat_page > #chat_login > #div1 > #div2 > #div3 > #form1').submit(function(){
      var username = $('#chat_page > #chat_login > #div1 > #div2 > #div3 > #form1 > #divUser > #username').val();
      console.log(username);
     
      $('#chat_page > #chat_login').css('display','none');

      $('#chat_page > #chat_list').attr('style',"");
      
      chatListCmd(username,imageName);
       
       return false;
     
        });
       
       
       
  
        function chatListCmd(username,imageName){
  


         
         // position of chat user is a randomly chosen

     let messagePosition = ["in","out"];
     let position = messagePosition[Math.floor(Math.random()* messagePosition.length)];
     
   //  module.exports = arrayRoomInfo;
  arrayOfUserInfo = [username];
     socket.on("getUsername",(arrayOfUserInfo)=>{
    
    $("#info").text('');    
     $("#info").text(`A new User ${arrayOfUserInfo[0]} is connected (Main Room).\n There are ${arrayOfUserInfo[1]} user(s) connected.`);
  
  
  });  
  
 


  socket.emit("getUsername",arrayOfUserInfo);
         //
  
  
     socket.on('chat message', function(arrayOfInfo){
     
     
  
  $('#messages').append(`<li class=${arrayOfInfo[3]}>
   <div class="chat-img">
    <img alt="Avtar" src="assets/${arrayOfInfo[2]}.jpg">
     </div>
     <div class="chat-body">
       <div class="chat-message">
         <h5>${arrayOfInfo[1]}</h5>
          <p>  ${arrayOfInfo[0]} </p>
         </div></div></li>`);
  });
     
  
  
  
  
  socket.on("disconnect",(username,count)=>{
  //if(arrayOfUserInf[1] > 0){
  //arrayOfUserInf[1]-=1;}
 
  $("#info").text('');    
  $("#info").text(`User ${username} is disconnected (Main Room). There are ${count} user(s) connected.`);
  
  
  
  });
  
  
     $('#chat_page > #chat_list > #form2').submit(function(){
       //e.preventDefault();
       arrayOfInfo= [$('#inputM').val(),username,imageName,position]
       socket.emit('chat message', arrayOfInfo);
       
       $('#inputM').val('');
       return false;
     });
     
        }
    

   
   /*
    let arr = [ "afrowoman", "morpheus", "ninja", "tonystark", "wonderwoman"];
   if(arr.includes(imageName)){}
   else{imageName = "ninja"};
*/

  });