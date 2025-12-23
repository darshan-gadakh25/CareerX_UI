import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import LoginPage from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import { Footer } from "./components/Footer.jsx";
import { HomePage } from "./components/HomePage.jsx";
import { NavBar } from "./components/NavBar.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
      <Toaster position="top-center" />
    </>
  );
}

export default App;