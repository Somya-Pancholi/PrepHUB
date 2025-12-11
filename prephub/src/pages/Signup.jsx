import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./Auth.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post("https://prephub-9sgk.onrender.com/api/auth/signup", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setLoading(false);
      setSuccess("Signup successful!")
      setTimeout(() =>{
        navigate("/dashboard");
      },1000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <motion.form 
        className="auth-card"
        onSubmit={handleSignup}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="auth-title">Create Your Account</h2>

        {error && <p className="error">{error}</p>}

        <div className="input-group">
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Enter email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Create password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button className="btn-primary full" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="switch-text">
          Already registered? <Link to="/login">Login</Link>
        </p>

        {success && (
        <p className="success-message">{success}</p>
      )}
      </motion.form>

      
    </div>
  );
}


/*import { Link, useNavigate } from "react-router-dom";
import{useState} from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./Auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <motion.form 
        className="auth-card"
        onSubmit={handleSignup}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="auth-title">Create Your Account</h2>

        <div className="input-group">
          <label>Name</label>
          <input type="text" placeholder="Full Name" required />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter email" required />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Create password" required />
        </div>

        <button className="btn-primary full">Sign Up</button>

        <p className="switch-text">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </motion.form>
    </div>
  );
}*/
