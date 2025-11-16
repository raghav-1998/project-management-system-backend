import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import crypto from "crypto";

const userSchema=mongoose.Schema({
    avatar:{
        type:{
            url:String,
            localPath:String
        }
    },

    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        lowecase:true
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    isEmailVerified:{
        type:Boolean,
        default:false,
    },
    emailVerificationToken:{
        type:String,
    },
    emailVerificationExpiry:{
        type:Date
    },
    refreshToken:{
        type:String
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpiry:{
        type:Date
    }
},{timestamps:true});


// Pre hook for hashing password(only when password get modified) before saving 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
});

//Schema Level Methods 

//For comparing Password

// userSchema.methods.generateAccessToken=function(){
//     return jwt.sign({
//         _id:this._id,
//         userName:this.userName,
//         email:this.email
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
// }

// userSchema.methods.generateRefreshToken=function(){
//     return jwt.sign({
//         _id:this._id,
        
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
// }

// userSchema.methods.generateTemporaryToken=function(){
//     const unhashedToken=crypto.randomBytes(20).toString("hex")  //Generates an unhashed Token

//     //As we have to store these in our database, so we use hashed token
//     const hashedToken=crypto.createHash("sha256").update(unhashedToken).digest("hex")

//     const tokenExpiry=Date.now()+(20*60*1000)  //20min

//     return {unhashedToken, hashedToken,tokenExpiry}
// }   

// userSchema.methods.isPasswordCorrect=async function(password) {
//     return await bcrypt.compare(password, this.password)
// };

const user=mongoose.model("User", userSchema)
export default User;
