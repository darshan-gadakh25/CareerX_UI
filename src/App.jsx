import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import LoginPage from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import ContactPage from "./components/ContactUs.jsx";
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
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/roadmap" element={<CareerRoadmap />} />
        <Route path="/chatbot" element={<AIChatbot />} />
        <Route path="/ai-career-paths" element={<AICareerPaths />} />
        <Route path="/contact" element={<ContactPage />} />



          {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="payments" element={<Payments />} />
          <Route path="blog"  elements={<Blog/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/" />} /> */}
      

          
        
    
      </Routes>
      <Footer />

      
         
      
      <Toaster position="top-center" />
    </>
  );
}

export default App;
