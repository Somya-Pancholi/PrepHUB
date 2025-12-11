import express from "express";
import Company from "../models/Company.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Add new company
router.post("/", auth, async (req, res) => {
  try {
    const { name, domain } = req.body;
    const company = new Company({ name, domain });
    await company.save();
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;