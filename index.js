const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Attendance = require('./models/attendance')
const cors = require('cors')
const bodyParser = require("body-parser");
app.use(express.json())
app.use(cors());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

mongoose
  .connect(
    "mongodb+srv://zaidbaba:zaidbaba@cluster0.knqp5.mongodb.net/mern_profile?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
      bufferCommands: true
    }
  )
  .then(() => {
    console.log("MongoDB connected .....");
  })
  .catch(err => {
    console.log(err);
  });


app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});

app.post('/addData' ,async function(req, res){
    console.log(req.body)
    const { name,Date,start_time,start_break,end_break,end_time,total_break,worked_Hours, total_Hours} = req.body;
    try{
            const emp = new Attendance({name,Date,start_time,start_break,end_break,end_time,total_break,worked_Hours, total_Hours});
            await emp.save();
            console.log("Employee Data Recorded")
            return res.status(200).json({Message : "Employee Data Recorded Successfully"})
        }
    catch(err)
    {
        console.log(err);
    }
    

    })

app.get('/showData' ,async  function(req, res) {    
     await Attendance.find({}, function (err, emp) {
          res.send(emp);
      });
  });


 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});