import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // using context
import "./AddExperience.css";

export default function AddExperience() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); // get token from context

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    difficulty: "",
    roundType: "",
    details: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!token) {
      setError("❌ You must login first.");
      return;
    }

    setLoading(true);
    console.log("token used:",token);

    try {
      const res = await axios.post(
        "https://prephub-9sgk.onrender.com/api/experiences",
        {
          companyName: formData.companyName,
          role: formData.role,
          difficulty: formData.difficulty,
          roundType: formData.roundType,
          details: formData.details,
          date: formData.date,
        },
        {
          headers: {
            //"x-auth-token":token,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response from backend:",res.data);
      setSubmitted(true);
      setLoading(false);

      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      console.error(err);
      if (err.response) console.error("Backend error:", err.response.data);
      setError(err.response?.data?.message || "Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="add-container">
      {submitted && (
        <motion.div
          className="success-popup"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="tick">✔</div>
          <p>Experience Added Successfully!</p>
        </motion.div>
      )}

      <motion.div className="add-card" initial={{ y: 50 }} animate={{ y: 0 }}>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
        Back to dashboard
        </button>

        <h2 className="title">Add Interview Experience</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            <label>Company Name</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
            <label>Role</label>
          </div>

          <div className="row">
            <div className="input-group">
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
              >
                <option value=""></option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <label>Difficulty</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="roundType"
                value={formData.roundType}
                onChange={handleChange}
                required
              />
              <label>Round Type</label>
            </div>
          </div>

          <div className="input-group">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <label>Date</label>
          </div>

          <div className="input-group textarea-group">
            <textarea
              name="details"
              rows="7"
              value={formData.details}
              onChange={handleChange}
              required
            ></textarea>
            <label>Experience Details</label>
          </div>

          <motion.button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Experience"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}


