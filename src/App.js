import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Intro from './components/Intro';
import PatientHome from "./components/PatientHome";
import DoctorHome from "./components/DoctorHome";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import About from "./components/About";


import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Router>
          <Routes>
            <Route exact path="/Login" element={<Login />}></Route>
            <Route exact path="/" element={<Intro />}></Route>
            <Route exact path="/PatientHome" element={<PatientHome />}></Route>
            <Route exact path="/DoctorHome" element={<DoctorHome />}></Route>
            <Route exact path="/Signup" element={<SignUp />}></Route>
            <Route exact path="/Forgot" element={<ForgotPassword />}></Route>
            <Route exact path="/About" element={<About />}></Route>

          </Routes>
      </Router>
    </div>
  );
}

export default App;
