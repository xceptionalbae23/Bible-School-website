import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ProgramsPage from "./components/ProgramsPage";
import AdmissionsPage from "./components/AdmissionsPage";
import PartnershipPage from "./components/PartnershipPage";
import ContactPage from "./components/ContactPage";
import GalleryPage from "./components/GalleryPage";
import AdminPage from "./components/AdminPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/partnership" element={<PartnershipPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;