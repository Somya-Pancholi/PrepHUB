import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{type: String, enum:["user", "admin"], default :"user"},
});

// Hash password before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return ;
  
  this.password = await bcrypt.hash(this.password, 10);
  
});

// Compare password
userSchema.methods.comparePassword =  async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);


/*import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //createdAt: { type: Date, default: Date.now }
},{timestamps: true});

export default mongoose.model("User", UserSchema);*/