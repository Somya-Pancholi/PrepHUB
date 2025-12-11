import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteExperience } from "../api/experienceApi";
import "./ExperienceDetails.css";

export default function ExperienceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [user, setUser] = useState({ id: "", isAdmin: false });

  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch experience
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get(
          `https://prephub-9sgk.onrender.com/api/experiences/${id}`
        );
        console.log("fetched :",res.data);
        setExperience(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    // load user from token
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("full token:",payload);
      setUser({ id: payload.user.id, isAdmin: payload.user.role === "admin" });
    }

    fetchExperience();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      
      await deleteExperience(id, token);

      setSuccessMessage("Experience deleted successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error(err);
      setSuccessMessage("Failed to delete experience.");
    }
  };

  if (!experience) return <p>Loading...</p>;
  console.log("user:",user.id);
  console.log("isAdmin:",user.isAdmin);
  console.log("created by:",experience.user);
  
  const canDelete = user.isAdmin || user.id === experience.user;

  return (
    <div className="container">
    <div className="experience-details-container">
      <button
        className="back-button"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>

      <div className="experience-card">
        <h2>
          {experience.companyName}

          {canDelete && (
            <button
              className="delete-button"
              onClick={() => setShowConfirmBox(true)}
            >
              Delete
            </button>
          )}
        </h2>

        <p><strong>Role:</strong> {experience.role}</p>
        <p><strong>Round:</strong> {experience.roundType || "N/A"}</p>
        <p><strong>Difficulty:</strong> {experience.difficulty || "N/A"}</p>
        <p><strong>Date:</strong> {experience.date ? new Date(experience.date).toLocaleDateString() : "N/A"}</p>
        <p><strong>Details:</strong></p>
        <p>{experience.details}</p>
      </div>
      </div>

      {/* CONFIRM POPUP */}
      {showConfirmBox && (
        <div className="confirm-popup">
          <div className="confirm-box">
            <p>Are you sure you want to delete this experience?</p>
            <button className="yes-btn" onClick={handleDelete}>Yes, Delete</button>
            <button className="no-btn" onClick={() => setShowConfirmBox(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
    </div>
  );
}
