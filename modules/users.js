const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        
    },
    password:{
        type: String,
        required:true,
        
    }
},{timestamps:true}) 

//staticsignup
userSchema.statics.signup = async function (userName,password)
    {
        const exist = await this.findOne({userName})

        if(exist)
            {throw Error('exists')}

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        const user = await this.create({userName,password:hash})

        return user
    }

    //static login method
    userSchema.statics.login = async function(userName,password)
    {
        if(!userName|| !password)
            {
                throw Error('please fill all fields')
            }

            const user = await this.findOne({userName})

            if(!user)
                {
                    throw Error('Incorrect username')
                }

                const match = await bcrypt.compare(password,user.password)

                if (!match)
                    {
                        throw Error('Incorrect Password! try again')
                    }

                    return user
    }

module.exports =mongoose.model('User',userSchema)
