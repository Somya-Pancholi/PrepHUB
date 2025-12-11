import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="welcome-page">
      <motion.div
        className="welcome-card"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="welcome-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Welcome to <span>PrepHub</span>
        </motion.h1>

        <p className="welcome-text">
          Explore real interview questions, experiences, 
          and company-wise interview rounds shared by students.
        </p>

        <motion.div 
          className="welcome-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/signup" className="btn-outline">Create Account</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}