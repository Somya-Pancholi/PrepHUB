import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    //companyName: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    companyName: {type:String, required:true},
    role: {type:String, required:true},
    difficulty: {type:String, required:true},
    roundType: {type:String, required:true},
    details: {type:String, required:true},
    date:{type: Date, required: true},
    createdAt:{type:Date, default:Date.now},
  },
  //{ timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);


/*import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  role: { type: String, required: true },
  rounds: [
    {
      type: { type: String },
      questions: [String]
    }
  ],
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Experience", ExperienceSchema);*/