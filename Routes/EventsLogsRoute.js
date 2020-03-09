const express = require("express");
const EventsLogsRouter = express.Router();
const EventLogsModel = require("../Model/EventLogs");
//seperate route displaying eventlog json list 

EventsLogsRouter.route("/eventlog").get((req,res)=>{

    EventLogsModel.find((err,data)=>{

  if(err){console.log(err)}
 else{res.json(data); 
     }

    })
})

module.exports = EventsLogsRouter;