import mongoose, {Document,Schema} from 'mongoose'

export interface Message extends Document {
    content:string,
    createdAt:Date
}
const MessageSchema:Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})
export interface User extends Document {
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    isAcceptingMessage:boolean,
    message:Message[]
}
const UserSchema: Schema<User> = new Schema({
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    password:{
        type:String,
        required:true,
    },
    verifyCode:{
        type:String,
        required:true,
    },
    verifyCodeExpiry:{
        type:Date,
        required:true,
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    message:{
        type:[MessageSchema]
    },
    isVerified:{
       type:Boolean,
       default:false,
    }
  });
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UserModel;