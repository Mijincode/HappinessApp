import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import TextField from "./TextField";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style.css";

export default function Login({ isLoggedIn, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const API_URL = `https://d2h6rsg43otiqk.cloudfront.net/prod`;
    const url = `${API_URL}/user/login`;
    const token = localStorage.getItem("token");

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "X-API-KEY": "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.message);
        } else {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          navigate({ pathname: "/" });
        }
      });
  };

  return (
    <Container fluid="lg" className="pt-2">
      <main className="flex-grow-1">
        <Row className="viewport-height-75 align-items-center">
          <Col md={6} lg={5} className="text-center">
            <FontAwesomeIcon
              icon={faDoorOpen}
              className="page-icon text-secondary"
            />
          </Col>
          <Col md={6} lg={7}>
            <h1 className="mb-5">Login</h1>
            <Form onSubmit={handleLogin}>
              <TextField
                text="Email"
                type="email"
                size={12}
                value={email}
                onChange={setEmail}
              />
              <TextField
                text="Password"
                type="password"
                size={12}
                value={password}
                onChange={setPassword}
              />
              <Button type="submit" variant="primary" className="mt-3">
                Login
              </Button>
            </Form>
            {message ? <Alert variant="danger">{message}</Alert> : null}
            <Link to="/reset-password">Forgot Password?</Link>{" "}
            {/* Add this line */}
          </Col>
        </Row>
      </main>
    </Container>
  );
}
