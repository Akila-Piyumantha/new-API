require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/auth')
//middleware
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//routes
app.use(express.json())
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)
//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log('connected to the db')})
.catch((error)=>{console.log(error)})

app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running on port', process.env.PORT || 4000);
  });