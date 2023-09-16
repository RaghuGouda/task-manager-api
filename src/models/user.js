const mongoose = require('mongoose')
const {makeNewConnection} = require('../db/mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const speakeasy = require('speakeasy');

const Task = require('./task')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('age must be positive number')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:7,
        validate(value){
           if(value.toLowerCase().includes('password')){
                throw new Error('password should not contain password word in it')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    secret:{
        type:String,
    },
    avatar:{
        type:Buffer
    }  
},
{ timestamps: true }
)

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.statics.findByCredential = async (email,password)=>{
    console.log('inside findByCredential ')
    const user = await User.findOne({email})
    if(!user){
        throw new Error('unable to login');
    }
    const isMatch =await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('unable to login');
    }
    return user
}

userSchema.statics.findByEmail = async (email,_id)=>{
    console.log('inside findByCredential ')
    const user = await User.findOne({email,_id})
    if(!user){
        throw new Error('unable to login');
    }
    return user
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
} 

//genarate otp
userSchema.methods.generateOtp = async function(){
    const user = this
    const secret = speakeasy.generateSecret({length: 20});
    const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    }); 
    if(!otp){
        throw new Error('otp failed');
    }
    user.secret = secret.base32  
    await user.save()
    return {otp} 
}

//method to hide private data / send only public data to api response
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    console.log("userObject",userObject)
    return userObject
}
//hash the plain text password before saveing
userSchema.pre('save',async function(next){
        console.log('inside pre middleware')
        const user = this
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password,10)
        }

    next()
})
//delete user task when user in removed
userSchema.pre('remove',async function(next){
    const user = this
    await Task.deleteMany({owner:user._id})
    next()
})

const user_db =  makeNewConnection(process.env.USER_MONGODB_URL)
const User = user_db.model('User',userSchema)

module.exports = User