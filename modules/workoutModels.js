const mongoose = require('mongoose')
const Schema = mongoose.Schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true,
        
    },
    category:{
        type: String,
        
    },
    description:{
        type:String
    },
    quantity:{
        type: Number
    },
    imageUrl: {
        type: String
        
    }
},{timestamps:true}) 

module.exports =mongoose.model('Workout',workoutSchema)
