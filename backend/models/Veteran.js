import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Veteran = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required']
  },
  image: {
    public_id: String,
    url: String
  },
  email: {
    type: String,
    trim: true,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veteran"
    }
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veteran"
    }
  ],
  stars: Number,
  type: String,
  category: String,
  hobby: String
});

Veteran.pre("save", async function(next){
  if(this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
  next();
});

Veteran.methods.matchPassword = async function(password){
  return await bcrypt.compare(password, this.password);
}

Veteran.methods.generateToken = function(){
  return jwt.sign({_id: this._id}, process.env.JWT_SECRET);
}

export default mongoose.model("Veteran", Veteran);