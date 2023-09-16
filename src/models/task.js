const mongoose = require('mongoose')
const {makeNewConnection} = require('../db/mongoose')
const taskSchema = new mongoose.Schema({
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

// const task_db = makeNewConnection(process.env.TASK_MONGODB_URL)
const Task = mongoose.model('Task',taskSchema)


module.exports = Task