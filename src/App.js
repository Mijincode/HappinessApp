import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Factors from "./components/Factors";
import LandingPage from "./components/LandingPage";
import Rankings from "./components/Rankings";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import ResetPassword from "./components/ResetPassword";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  return (
    <BrowserRouter>
      <div className="d-flex flex-column bg-light" id="wrapper">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Container fluid className="pt-2">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route
              path="/factors"
              element={<Factors isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}
