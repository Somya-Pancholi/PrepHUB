import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchExperiences, fetchExperiencesByCompany } from "../api/experienceApi";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);

  const rotatingLines = ["Real Stories", "Real Prep", "Real Results"];
  const [dynamicText, setDynamicText] = useState(rotatingLines[0]);

  // Rotating text effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % rotatingLines.length;
      setDynamicText(rotatingLines[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Load latest 6 experiences
  const loadRecentlyAdded = async () => {
    try {
      const data = await fetchExperiences();
      setRecentlyAdded(data.slice(0, 6));
    } catch (err) {
      console.error("Failed to fetch experiences:", err);
      setRecentlyAdded([]);
    }
  };

  useEffect(() => {
    loadRecentlyAdded();
  }, []);

  // Refresh recently added after adding new experience
  useEffect(() => {
    if (location.state?.refresh) {
      loadRecentlyAdded();
    }
  }, [location.state]);

  // Function to fetch search results
  const fetchSearchResults = async (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setSearchResults([]);
      return;
    }
    try {
      const results = await fetchExperiencesByCompany(trimmedQuery);
      setSearchResults(results);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    }
  };

  // Live search on typing
  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  // Search button click
  const handleSearchClick = () => {
    fetchSearchResults(searchQuery);
  };

  return (
    <div className="dashboard-container">
      <div className="main-section">
        {/* Topbar */}
        <div className="topbar">
          <h2 className="prephub-heading">Prep<span>HUB</span></h2>
          <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            &#9776;
          </div>
        </div>

        {/* Sidebar */}
        <motion.div
          className="sidebar"
          initial={{ x: "0%" }}
          animate={{ x: sidebarOpen ? "-300px" : "0%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h4 className="logo">PrepHUB</h4>
          <ul className="menu">
            <li onClick={() => navigate("/dashboard")}>Dashboard</li>
            <li onClick={() => navigate("/add-experience")}>Add Experience</li>
            <li onClick={() => navigate("/login")}>Logout</li>
            <br></br>
            <br></br>
            <li>BY:</li>
            <li>Somya Pancholi</li>
          </ul>
        </motion.div>

        {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}

        {/* Hero Text */}
        <div className="hero-text-section">
          <h1 className="static-line">Learn from Experiences..</h1>
          <h2 className="dynamic-line">{dynamicText}</h2>
        </div>

        {/* Browse Companies */}
        <motion.div className="browse-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3>Browse Companies</h3>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearchClick}>Search</button>
          </div>
        </motion.div>

        {/* Add Experience Button */}
        <motion.div className="add-experience" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1 }}>
          <button className="btn-large" onClick={() => navigate("/add-experience")}>
            + Add Experience
          </button>
        </motion.div>

        {/* Cards Section */}
        <motion.div className="recently-added" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          <h3>
            {searchQuery
              ? searchResults.length > 0
                ? `Search Results for "${searchQuery}"`
                : `No results found for "${searchQuery}"`
              : "Recently Added"}
          </h3>

          <div className="cards-area">
  {searchQuery.trim() !== "" ? (
    searchResults.length > 0 ? (
      searchResults.map((item) => (
        <motion.div
          key={item._id}
          className="card"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
          onClick={()=>navigate(`/experience/${item._id}`)} style={{cursor:"pointer"}}
        >
          <h4>{item.companyName}</h4>
          <p><strong>Round:</strong> {item.roundType || "N/A"}</p>
          <p><strong>Difficulty:</strong> {item.difficulty || "N/A"}</p>
          <p><strong>Date:</strong> {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</p>
        </motion.div>
      ))
    ) : (
      null
    )
  ) : (
    recentlyAdded.map((item) => (
      <motion.div
        key={item._id}
        className="card"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        onClick={() => navigate(`/experience/${item._id}`)} // ✅ item is defined here
        style={{ cursor: "pointer" }}
      >
        <h4>{item.companyName}</h4>
        <p><strong>Round:</strong> {item.roundType || "N/A"}</p>
        <p><strong>Difficulty:</strong> {item.difficulty || "N/A"}</p>
        <p><strong>Date:</strong> {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</p>
      </motion.div>
    ))
  )}
</div>
        </motion.div>
      </div>
    </div>
  );
}
/*import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchExperiences, fetchExperiencesByCompany } from "../api/experienceApi";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);

  const rotatingLines = ["Real Stories", "Real Prep", "Real Results"];
  const [dynamicText, setDynamicText] = useState(rotatingLines[0]);

  // Rotating text effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % rotatingLines.length;
      setDynamicText(rotatingLines[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Load latest 5 experiences
  const loadRecentlyAdded = async () => {
    try {
      const data = await fetchExperiences();
      setRecentlyAdded(data.slice(0,6));
    } catch (err) {
      console.error("Failed to fetch experiences:", err);
      setRecentlyAdded([]);
    }
  };

  useEffect(() => {
    loadRecentlyAdded();
  }, []);

  // Refresh recently added when redirected from AddExperience
  useEffect(() => {
    if (location.state?.refresh) {
      loadRecentlyAdded();
    }
  }, [location.state]);

  // Search experiences by company
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setSearchQuery("");
    
      return;
    }

    try {
      const results = await fetchExperiencesByCompany(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-section">
        {/* Topbar *}
        <div className="topbar">
          <h2 className="prephub-heading">Prep<span>HUB</span></h2>
          <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            &#9776;
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Sidebar *}
        <motion.div
          className="sidebar"
          initial={{ x: "0%" }}
          animate={{ x: sidebarOpen ? "-300px" : "0%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h2 className="logo">PrepHUB</h2>
          <ul className="menu">
            <li className="active">Dashboard</li>
            <li>Companies</li>
            <li>Interview Questions</li>
            <li onClick={() => navigate("/add-experience")}>Add Experience</li>
            <li onClick={() => navigate("/login")}>Logout</li>
          </ul>
        </motion.div>

        {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}

        {/* Hero Text *}
        <div className="hero-text-section">
          <h1 className="static-line">Learn from Experiences..</h1>
          <h2 className="dynamic-line">{dynamicText}</h2>
        </div>

        {/* Browse Companies Section *}
        <motion.div
          className="browse-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Browse Companies</h3>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          {/* Autocomplete Suggestions *}
          {searchQuery && (
            <motion.div
              className="suggestions"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {recentlyAdded
                .filter(item => item.companyName && item.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(item => (
                  <div
                    key={item._id}
                    className="suggestion-item"
                    onClick={() => setSearchQuery(item.companyName)}
                  >
                    {item.companyName}
                  </div>
                ))}
            </motion.div>
          )}
        </motion.div>

        {/* Add Experience Button *}
        <motion.div
          className="add-experience"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button className="btn-large" onClick={() => navigate("/add-experience")}>
            + Add Experience
          </button>
        </motion.div>

        <motion.div
  className="recently-added"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4, duration: 0.5 }}
>
  <h3>
    {searchResults.length > 0
      ? `Search Results for "${searchQuery}"`
      : searchQuery
      ? `No results found for "${searchQuery}"`
      : "Recently Added"}
  </h3>

  <div className="cards-area">
    {/* If actual search results exist → SHOW ONLY SEARCH *}
    {searchQuery && searchResults.length > 0 ? (
      searchResults.map((item) => (
        <motion.div
          key={item._id}
          className="card"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <h4>{item.companyName}</h4>
          <p><strong>Round:</strong> {item.roundType}</p>
          <p><strong>Difficulty:</strong> {item.difficulty}</p>
          <p><strong>Date:</strong> {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</p>
        </motion.div>
      ))
    ) : searchQuery ? (
      // Search was done, but no results
      <p className="no-results">No results found</p>
    ) : (
      // Search bar empty → Show Recently Added
      recentlyAdded.map((item) => (
        <motion.div
          key={item._id}
          className="card"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <h4>{item.companyName}</h4>
          <p><strong>Round:</strong> {item.roundType}</p>
          <p><strong>Difficulty:</strong> {item.difficulty}</p>
          <p><strong>Date:</strong> {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</p>
        </motion.div>
      ))
    )}
  </div>
</motion.div>
</div>
</div>
);
}*/