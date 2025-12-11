import express from "express";
import auth from "../middleware/auth.js";
import Experience from "../models/Experience.js";
import Company from "../models/Company.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  console.log("Route HIT: POST /api/experiences");  

  try {
    
    const { companyName, role, difficulty, details, roundType, date} = req.body;

    if (!companyName || !role || !details) {
      console.log(" Missing required fields");
      return res.status(400).json({ message: "Missing required fields" });
    }

    let company = await Company.findOne({ name: companyName });
    if (!company) {
      company = new Company({ name: companyName });
      await company.save();
    }

    const experience = new Experience({
      user: req.user.id,
      companyName,
      role,
      difficulty,
      details,
      roundType,
      date,
      createdBy: req.user.id,
    });

    await experience.save();
    console.log("Experience Saved:", experience);

    return res.status(201).json({ message: "Experience added successfully" });
  } catch (err) {
    console.log("SERVER CRASHED:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { companyName } = req.query;

    if (companyName) {
      const results = await Experience.find({
        companyName: { $regex: companyName, $options: "i" },
      }).sort({ date: -1 });
      return res.json(results);
    }

    const recent = await Experience.find().sort({ date: -1 }).limit(6);
    res.json(recent);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// Fetch experience by ID
router.get("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE experience by ID
router.delete("/:id", auth, async (req, res) => {
console.log("delete route hit");
console.log("id to delete:",req.params.id);

  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Check if user is creator or admin
    if (experience.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "You do not have permission to delete this experience" });
    }

    await experience.deleteOne();
    res.json({ message: "Experience deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;