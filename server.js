const express = require('express');
const app = express();
const http = require("http").createServer(app);
const body_parser = require("body-parser");
const cors = require("cors");
const io = require("socket.io")(http);
module.exports = io
//const UserModel = require('./Model/User');
//const EventLogsModel = require('./Model/EventLogs');

const userChatRouter = require("./Routes/UserHistoryRoute");
const eventLogsRouter = require("./Routes/EventsLogsRoute");

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));
app.use(cors());

app.use(express.static(`${__dirname}/Webcontents`));
app.use(["/api","/"],userChatRouter.router,eventLogsRouter) ;




    http.listen(3000,()=>{

       
     console.log("Listen to port 3000")

    });