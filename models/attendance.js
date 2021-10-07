const mongoose = require('mongoose')


const attendance = new mongoose.Schema({
    name:{type: String, required:true},
    Date:{type: String, },
    start_time:{type: String },
    start_break:{type: String },
    end_break:{type: String },
    end_time:{type: String },
    total_break:{type: String },
    worked_Hours:{type: String },
    total_Hours:{type: String },
        
})






const Attendance = mongoose.model('Attendance', attendance)

module.exports = Attendance
