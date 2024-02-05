import React from "react";
import "../App.css";
import { Container, Row, Col } from "react-bootstrap";

const LandingPage = () => {
  return (
    <Container>
      <Row>
        <Col className="text-center mt-5">
          <div className="right-section">
            <h1>Welcome to the Happiness Rankings App</h1>
            <p>
              “Happiness is a choice, not a result. Nothing will make you happy
              until you choose to be happy.”
            </p>
            <p>– Ralph Marston</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <div className="image-section">
            <img
              src="https://picsum.photos/600/500"
              alt="Random Placeholder Image"
              className="responsive-image"
              loading="lazy"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
