const User = require('../modules/users')
const jwt = require('jsonwebtoken')

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}
//login
const loginUser = async (req,res)=>{
    const {userName,password} = req.body

    try{
        const user = await User.login(userName,password)
       
        //create a token
        const token = createToken(user._id)
        res.status(200).json({userName,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }


   
}
const signupUser = async (req,res)=>{ 
    
    const {userName,password} = req.body
    try{
        const user = await User.signup(userName,password)
       
        //create a token
        const token = createToken(user._id)
        res.status(200).json({userName,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports ={loginUser,signupUser}