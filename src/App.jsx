import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import LoginPage from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import { Footer } from "./components/Footer.jsx";
import { HomePage } from "./components/HomePage.jsx";
import { BrowserRouter } from "react-router-dom";
import { About } from "./components/About.jsx";
import { StudentDashboard } from "./components/StudentDashboard.jsx";

import { NavBar } from "./components/NavBar.jsx";
import { StudentProfile } from "./components/StudentProfile.jsx";
import { CareerRoadmap } from "./components/CareerRoadmap.jsx";
import { AIChatbot } from "./components/AIChatbot.jsx";
import { AICareerPaths } from "./components/AICareerPaths.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sdashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/roadmap" element={<CareerRoadmap />} />
        <Route path="/chatbot" element={<AIChatbot />} />
        <Route path="/ai-career-paths" element={<AICareerPaths />} />
      </Routes>
      <Footer />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
