let express = require("express");
let userChatRouter = express.Router();
let event = require("events");
let eventEmitter = new event.EventEmitter();

var io = require("../server");

const UserHistmodel = require('../Model/User');
const EventsLogs = require("../Model/EventLogs")


userChatRouter.route("").get((req,res)=>{

 res.sendFile(`${process.cwd()}/Webcontents/MainChat.html`);
 
})

var count=0;
var countRoom=0;

var userRoom="No user";
var imageRoom="No picture";
let callSocket = ()=>{




io.on("connection",(socket)=>{

    
    var username ="";
   
    var image ="";


//use to change image default image is ninja.jpg

socket.on("changePicture",(ima)=>{

    image = ima;
    //imageRoom = ima;
    if(imageRoom== ""){imageRoom = "ninja"}
    io.emit("changePicture",ima);
    console.log("Image changed  "+ ima);
})


//Take username UserInfo[0], add counter to signal new user 

    socket.on("getUsername",(UserInfo)=>{
        count+=1;
     username = UserInfo[0].toString();
     //userRoom = UserInfo[0].toString();
     UserInfo[1] = count;
     if(username == ""){username = "User without name"}

     console.log(`${username} connected There are ${count} connected`);
     
     EventsLogs.create({ EventType: "Connection", Date: getCurrentDateTime()[0], Time:getCurrentDateTime()[1],User : username },(err)=>{if(err)console.log(err)});
    //store event in event log
     io.emit("getUsername",UserInfo);
 

    })
  

    

    socket.on("disconnect",()=>{
       
        EventsLogs.create({ EventType: "Disconnect", Date: getCurrentDateTime()[0], Time:getCurrentDateTime()[1],User : username },(err)=>{if(err)console.log(err)})
       if(count >0){
        count-=1;}
       console.log(`User ${username} disconnected. There are ${count}`)
       
        io.emit("disconnect",username,count)
    
    });
    
    socket.on("chat message",(arrayOfInfo)=>{ console.log(`message from ${username} : ${arrayOfInfo[0]}`);

//parameters contains message arrayOfInfo[0]
    
UserHistmodel.create({Sender: username, Receiver: "All",Message : arrayOfInfo[0], Date:getCurrentDateTime()[0],Time:getCurrentDateTime()[1],roomname:"Main"},(err)=>{if(err){console.log(err)}})
io.emit('chat message', arrayOfInfo); // store event in eventlog
});
    
//if needed create other event to take private chat or different room
    socket.on("error",(msg)=>{console.log(msg);
        EventsLogs.create({ EventType: "Error", Date: getCurrentDateTime()[0], Time:getCurrentDateTime()[1],User : username },(err)=>{if(err)console.log(err)})

    })




 
    socket.on("join_room",(room)=>{
       

        socket.join(room[0]);
        console.log(`${userRoom} joined ${room[0]}`);
       
        console.log(room);
        //room[0] is the room name, room[2] user name
        io.sockets.in(room[0]).emit("join_room",room)
    EventsLogs.create({ EventType: "Joined", Date: getCurrentDateTime()[0], Time:getCurrentDateTime()[1],User : room[2] },(err)=>{if(err)console.log(err)})
    

    })
   
    socket.on("room_message",(room,arrayOfInfo)=>{
          
       //arrayOfInfo[2] = user, arrayOfInfo[0]= message
     io.sockets.in(room).emit("room_message",room,arrayOfInfo);
     console.log(`${arrayOfInfo[2]} : ${arrayOfInfo[0]}`);
     UserHistmodel.create({Sender: arrayOfInfo[2], Receiver: "All",Message : arrayOfInfo[0], Date:getCurrentDateTime()[0],Time:getCurrentDateTime()[1],roomname:room},(err)=>{if(err){console.log(err)}})

    })
  
socket.on("leave_room",(roomInfo)=>{
    
   io.sockets.in(roomInfo[0]).emit("leave_room",roomInfo);
  
socket.leave(roomInfo[0]);
    
console.log(`${roomInfo[1]} left ${roomInfo[0]}`);

})


})

 }



 callSocket();

//call function



userChatRouter.route('/history').get((req,res)=>{

//return chat list json chathistory
UserHistmodel.find((err,data)=>{


    if(err){console.log(err)}
    else{

        res.json(data)
       // res.end(JSON.stringify(data));
    }
})


})
userChatRouter.route("/roomhistory/:roomname").get((req,res)=>{
UserHistmodel.where("roomname", req.params.roomname).sort({Time: -1}).exec((err,data)=>{
// there are 2 room Ninja and Golden in other to see actual list.
if(err){console.log(err)}
else{res.json(data)}


})
//res.send another page 
});

function getCurrentDateTime(){

    var d = Date(Date.now());
    var date = d.toString().slice(0,15);
    var time = d.toString().slice(15,);
    var dateAndTime = d.toString();
    arr = [date,time,dateAndTime];

return arr;
}

module.exports = {router : userChatRouter, io : io};