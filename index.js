
// init project
var express = require('express');
var app = express();
var isStringInUTCDateFormat=require('./util/util').isStringInUTCDateFormat;
var stringHasInvalidDateFormat=require('./util/util').stringHasInvalidDateFormat;
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp",(req,res,next)=>{
  res.json({unix:new Date().getTime(),utc: new Date().toUTCString()});
});

app.get("/api/timestamp/:date_string", (req, res,next) =>{
  let inputDate=req.params.date_string;

  if(stringHasInvalidDateFormat(inputDate)){
    res.json({"error":"Invalid Date"});
  }
  
  if(!isStringInUTCDateFormat(inputDate)){
    res.json({unix:new Date(inputDate*1).getTime(),utc: new Date(inputDate*1).toUTCString()});
  }
  else{
    res.json({unix:new Date(inputDate).getTime(),utc: new Date(inputDate).toUTCString()});
  }
  
});

app.use((req,res,next)=>{
  res.status(404);
  res.send("Page Not Found");
});

app.use((err,req,res,next)=>{
  console.log(err);
  res.status(500);
  res.send("Internal Server Error");
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
})