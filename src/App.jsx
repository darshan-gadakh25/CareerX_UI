import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import { About } from "./components/About.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import LoginPage from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import ContactPage from "./components/ContactUs.jsx";
import { Footer } from "./components/Footer.jsx";
import { HomePage } from "./components/HomePage.jsx";
import { StudentDashboard } from "./components/StudentDashboard.jsx";

import { AICareerPaths } from "./components/AICareerPaths.jsx";
import { AIChatbot } from "./components/AIChatbot.jsx";
import { CareerRoadmap } from "./components/CareerRoadmap.jsx";
import { NavBar } from "./components/NavBar.jsx";
import { StudentProfile } from "./components/StudentProfile.jsx";

import { AdminDashboard } from "./components/Admin/AdminDashboard.jsx";
import { StudentAssessments } from "./components/Admin/Assesments.jsx";
import { Blogs } from "./components/Admin/Blog.jsx";
import { ExploreCareers } from "./components/Admin/ExploreCareer.jsx";

import { StudentAssessmentss } from "./components/CareerAssessment.jsx";



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

        <Route path="/assessments" element={<StudentAssessmentss />} />


        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/assessments" element={<StudentAssessments />} />
        <Route path="/admin/ExploreCareer" element={<ExploreCareers />} />
        <Route path="/admin/blogs" element={<Blogs />} />



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
