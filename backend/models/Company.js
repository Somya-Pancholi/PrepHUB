import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Company", CompanySchema);