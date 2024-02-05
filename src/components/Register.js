import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";

import TextField from "./TextField";
import "./style.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const register = (event) => {
    event.preventDefault();

    const API_URL = `https://d2h6rsg43otiqk.cloudfront.net/prod`;
    const url = `${API_URL}/user/register`;
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
          setError(true);
        }
        setMessage(data.message);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <Container fluid="lg" className="pt-2">
      <main className="flex-grow-1">
        <Row className="viewport-height-75 align-items-center">
          <Col md={6} lg={5} className="text-center">
            <FontAwesomeIcon
              icon={faIdCard}
              className="page-icon text-secondary"
            />
          </Col>
          <Col md={6} lg={7}>
            <div style={{ width: "100%" }}>
              <h1 className="mb-5">Register</h1>
              <Form className=" mb-3">
                <Row className="g-3">
                  <TextField
                    text="Email"
                    type="email"
                    onChange={setEmail}
                    value={email}
                  />
                  <TextField
                    value={password}
                    text="Password"
                    type="password"
                    onChange={setPassword}
                  />
                  <div className="col-12">
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={(event) => register(event)}
                    >
                      Register
                    </Button>
                  </div>
                </Row>
              </Form>
              {message ? (
                <Alert variant={!error ? "success" : "danger"}>{message}</Alert>
              ) : null}
            </div>
          </Col>
        </Row>
      </main>
    </Container>
  );
}
