import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddExperience from "./pages/AddExperience";
import ProtectedRoute from "./components/ProtectedRoute";
import ExperienceDetails from "./pages/ExperienceDetails.jsx";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/add-experience" element={<ProtectedRoute><AddExperience /></ProtectedRoute>} />
         <Route path="/experience/:id" element={<ExperienceDetails/>}/>
        
      </Routes>
    </BrowserRouter>
    
  );
}