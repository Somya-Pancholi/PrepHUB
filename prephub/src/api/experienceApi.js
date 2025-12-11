import axios from "axios";

const API_URL = "http://localhost:5000/api/experiences";

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// Add a new experience (Protected)
export const addExperience = async (formData) => {
  const token = getToken();

  if (!token) {
    throw new Error("You must login first!");
  }

  const res = await axios.post(API_URL, formData, {
    headers: {
      "x-auth-token": token,
    },
  });

  return res.data;
};

//delete experience
export const deleteExperience = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`http://localhost:5000/api/experiences/${id}`, {
    //headers: { "x-auth-token": token },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
// Fetch latest experiences
export const fetchExperiences = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Fetch experiences by company
export const fetchExperiencesByCompany = async (companyName) => {
  const res = await axios.get(`${API_URL}?companyName=${encodeURIComponent(companyName)}`);
  return res.data;
};

//Add new experience
/*xport const AddExperience = async (experienceData, token) => {
  const res = await axios.post(API_URL, experienceData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


// src/api/experienceApi.js
/*import axios from "axios";

const API_URL = "http://localhost:5000/api/experiences";



// Fetch latest 5 experiences
export const fetchExperiences = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Fetch experiences by company
export const fetchExperiencesByCompany = async (company) => {
  const res = await axios.get(`${API_URL}?company=${company}`);
  return res.data;
};*/