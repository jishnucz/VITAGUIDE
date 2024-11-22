import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import SymptomsForm from "./SymptomsForm"; // Import SymptomsForm component
import VitaminPredictionForm from "./VitaminPredictionForm"; // Import SymptomsForm component
import DemoHomepage from "./GuestHomepage";
import PersonalDetails from "./PersonalDetails";
import KnowledgeQuizPage from "./KnowledgeQuizPage";
import QuizResultsPage from "./QuizResult";
import Profile from "./Profile";
import FoodSources from "./FoodSources";
import EmailSender from "./EmailSender";
import FeedbackForm from "./FeedbackForm";
import FeedbackDisplay from "./FeedbackDisplay";
import SymptomsList from "./SymptomsList";
import DietPlan from "./DietPlan";
import AboutSection from "./About";
import SideEffects from "./SideEffects";
import VitaminInformation from "./VitaminInformation";
import GuestHomepage from "./Guest";
import AdminDashboard from "./AdminDashboard";
import AdminPage from "./AdminPage";
import AdminLogin from "./AdminLogin";
import AdminProfile from "./AdminProfile";
import ServicePage from "./Service";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<DemoHomepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/symptoms-form" element={<SymptomsForm />} />
        <Route path="/vitamin-prediction" element={<VitaminPredictionForm />} />
        <Route path="/quiz" element={<KnowledgeQuizPage />} />
        <Route path="/quiz-results" element={<QuizResultsPage />} />
        <Route path="/foodsources" element={<FoodSources />} />
        <Route path="/mail" element={<EmailSender />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/feedbackdisplay" element={<FeedbackDisplay />} />
        <Route path="/symptomslist" element={<SymptomsList />} />
        <Route path="/dietplan" element={<DietPlan />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/sideffects" element={<SideEffects />} />
        <Route path="/vitamin-information" element={<VitaminInformation />} />
        <Route path="/guest" element={<GuestHomepage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
        <Route path="/home/userprofile" element={<Profile />} />
        <Route path="/services" element={<ServicePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
