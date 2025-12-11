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
        "http://localhost:5000/api/experiences",
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


/*// src/pages/AddExperience.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "./AddExperience.css";

export default function AddExperience() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    difficulty: "",
    roundType: "",
    experienceDetails: "",
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
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("❌ You must login first.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/experiences",
        {
          companyName: formData.companyName,
          role: formData.role,
          difficulty: formData.difficulty,
          round: formData.roundType,
          description: formData.experienceDetails,
          date: formData.date,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      console.log("response:",Response.data);
      setSubmitted(true);
      setLoading(false);

      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      console.error("err:",err);
      if(err.response){
        console.error("backend response:",err.response.data);
      }
      setError("Something went wrong. Try again.");
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
          ⟵ Back
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
              name="experienceDetails"
              rows="7"
              value={formData.experienceDetails}
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


/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "./AddExperience.css";

export default function AddExperience() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    difficulty: "",
    roundType: "",
    experienceDetails: "",
    date: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("❌ You must login first.");
        setLoading(false);
        return;
      }

      // FINAL CLEAN BODY FOR BACKEND
      const payload = {
        companyName: formData.companyName,
        role: formData.role,
        difficulty: formData.difficulty,
        round: formData.roundType,
        description: formData.experienceDetails,
        date: formData.date,
      };

      const res = await axios.post(
        "http://localhost:5000/api/experiences",
        payload,
        {
          headers: {
            "Content-Type":"application/json",
            "x-auth-token":token,
            //Authorization: `Bearer ${token}`, // ✔ FIXED missing space
          },
        }
      );

      setMessage("Experience added successfully!");
      setSubmitted(true);
      setLoading(false);

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard", { state: { refresh: true } });
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to submit experience. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="add-container">
      {submitted && (
        <motion.div
          className="success-popup"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="tick">✔</div>
          <p>Experience Added Successfully!</p>
        </motion.div>
      )}

      {error && <p className="error-message">{error}</p>}

      <motion.div
        className="add-card"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ⟵ Back
        </button>

        <h2 className="title">Add Interview Experience</h2>

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
              name="experienceDetails"
              rows="7"
              value={formData.experienceDetails}
              onChange={handleChange}
              required
            ></textarea>
            <label>Experience Details</label>
          </div>

          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Experience"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./AddExperience.css";

export default function AddExperience() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    difficulty: "",
    roundType: "",
    experienceDetails: "",
    date: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setSubmitted(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="add-container">

      {/* Animated Success Screen *}
      {submitted && (
        <motion.div
          className="success-popup"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="tick">✔</div>
          <p>Experience Added Successfully!</p>
        </motion.div>
      )}

      {/* Main Card *}
      <motion.div
        className="add-card"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ⟵ Back
        </button>

        <h2 className="title">Add Interview Experience</h2>

        <form onSubmit={handleSubmit} className="form">

          {/* Floating Inputs *}
          <div className="input-group">
            <input
              type="text"
              name="companyName"
              onChange={handleChange}
              required
            />
            <label>Company Name</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="role"
              onChange={handleChange}
              required
            />
            <label>Role</label>
          </div>

          <div className="row">
            <div className="input-group">
              <select name="difficulty" onChange={handleChange} required>
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
                onChange={handleChange}
                required
              />
              <label>Round Type</label>
            </div>
          </div>

          <div className="input-group">
            <input type="date" name="date" onChange={handleChange} required />
            <label>Date</label>
          </div>

          <div className="input-group textarea-group">
            <textarea
              name="experienceDetails"
              rows="7"
              onChange={handleChange}
              required
            ></textarea>
            <label>Experience Details</label>
          </div>

          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Experience
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}



/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddExperience.css"; // <-- Import CSS

export default function AddExperience() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    difficulty: "",
    roundType: "",
    experienceDetails: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Experience Added Successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="add-container">
      <div className="add-card">

        {/* Back button *}
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>

        <h2 className="title">Add Interview Experience</h2>

        <form onSubmit={handleSubmit} className="form">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            onChange={handleChange}
            required
            placeholder="Google, Amazon, Microsoft..."
          />

          <label>Role</label>
          <input
            type="text"
            name="role"
            onChange={handleChange}
            required
            placeholder="SDE-1, Analyst, HR Intern..."
          />

          <div className="row">
            <div>
              <label>Difficulty</label>
              <select name="difficulty" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label>Round Type</label>
              <input
                type="text"
                name="roundType"
                onChange={handleChange}
                required
                placeholder="Technical, HR, Managerial..."
              />
            </div>
          </div>

          <label>Date</label>
          <input type="date" name="date" onChange={handleChange} required />

          <label>Experience Details</label>
          <textarea
            name="experienceDetails"
            rows="5"
            onChange={handleChange}
            placeholder="Write the full interview experience..."
            required
          ></textarea>

          <button type="submit" className="submit-btn">
            Submit Experience
          </button>
        </form>
      </div>
    </div>
  );
}*/