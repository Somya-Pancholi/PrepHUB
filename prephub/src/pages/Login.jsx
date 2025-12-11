import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      // Save JWT token & user info to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <motion.form
        className="auth-card"
        onSubmit={handleLogin}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to continue your PrepHub journey.</p>

        {error && <p className="error">{error}</p>}

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
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn-primary full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="switch-text">
          New here? <Link to="/signup">Create account</Link>
        </p>
      </motion.form>
    </div>
  );
}


/*import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <motion.form 
        className="auth-card"
        onSubmit={handleLogin}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to continue your PrepHub journey.</p>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter email" required />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter password" required />
        </div>

        <button className="btn-primary full">Login</button>

        <p className="switch-text">
          New here? <Link to="/signup">Create account</Link>
        </p>
      </motion.form>
    </div>
  );
}*/