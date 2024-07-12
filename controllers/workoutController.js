const Workout = require('../modules/workoutModels');

// Get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
};

// Get single workout
 const getWorkout = async (req, res) => {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({ error: 'No such record' });
    }
    res.status(200).json(workout);
};

//-----------------------------------------------------------------------------------------

// Assuming you have a Workout model
const getPaginatedWorkouts = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    const startIndex = (page - 1) * limit;
    const total = await Workout.countDocuments();
    
    const workouts = await Workout.find().sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit);
    
    res.json({
        page,
        totalPages: Math.ceil(total / limit),
        workouts
    });
};

// Define the route



//**************************************************************************************************** 



// Create workout
const createWorkout = async (req, res) => {
    const { title, category, description, quantity, imageUrl } = req.body;

    try {
        const workout = await Workout.create({ title, category, description, quantity, imageUrl });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete workout
const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find and delete the workout by id
        const workout = await Workout.findOneAndDelete({ _id: id });
        
        if (!workout) {
            return res.status(404).json({ error: 'No such record' }); // Use 404 for not found
        }
        
        res.status(200).json({ message: 'Workout deleted successfully', workout });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the workout' }); // Catch unexpected errors
    }
};


// Update workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!workout) {
        return res.status(400).json({ error: 'No such record' });
    }
    res.status(200).json(workout);
};

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout,
    getPaginatedWorkouts
};
