import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true, 
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:16
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    follower:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

 export const User = mongoose.model("User", UserSchema)