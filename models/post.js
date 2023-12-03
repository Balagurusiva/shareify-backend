import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
     userId: { 
        type:String,
        required:true,
     },
     desc:{
        type:String,
        required:true
     },
     img:{
        type:String
     },
     likes:{
        type:Array,
        default:[]
     },
}, { timestamps: true })

export const Post = mongoose.model("Post", PostSchema)