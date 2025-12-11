import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import experienceRoutes from "./routes/experiences.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({
  origin:"https://prep-hub-two.vercel.app/",
});
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/experiences", experienceRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {console.log("MongoDB connected");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
  .catch(err => console.log(err));



