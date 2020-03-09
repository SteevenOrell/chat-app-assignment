const mongoose = require("../db");
const Schema = mongoose.Schema;

let EventsLogsSchema = new Schema({

"EventType" : String,
"Date" : String,
"Time" : String,
"User": String

},{collection : "EventLogs"});

let EventsLogsModule = mongoose.model("EventsLogsSchema",EventsLogsSchema);

module.exports = EventsLogsModule

//Creating schema and importing models