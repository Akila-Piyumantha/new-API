const express = require('express')
const Workout = require('../modules/workoutModels')
const {createWorkout,
    getWorkouts,
    getWorkout,updateWorkout,deleteWorkout,getPaginatedWorkouts} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')

const router =express.Router()



//router.get('/', getWorkouts);

router.get('/',getPaginatedWorkouts)

router.get('/:id',getWorkout)

router.post('/',requireAuth,createWorkout)

router.patch('/:id',requireAuth,updateWorkout)

router.delete('/:id',requireAuth,deleteWorkout)

module.exports = router