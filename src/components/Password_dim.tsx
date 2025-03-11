import { useState } from "react";
import { Container, Col, Form, Button } from "react-bootstrap";
import { Unlock } from "react-bootstrap-icons";

const PassDim: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("email:", email);
  };

  return (
    <Container fluid className=" vh-100 d-flex align-items-center justify-content-end pe-5 backImg ">
      {/* Sezione Immagine */}
      <Col md={6} className="login-image">
        {/*  <div className="w-75">
          <img src={imgLogin} alt="Login" className="imgBack" />
        </div> */}
      </Col>

      {/* Sezione Form */}
      <Col md={6} className="w-25 ">
        <h2>
          Password dimenticata? <Unlock className="iconColor " />
        </h2>
        <p className="text-secondary fontSize">Inserisci l’email e riceverai istruzioni per recuperare la password</p>

        <Form onSubmit={handleSubmit} className="mt-4 ">
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="rounded-pill"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100 mt-3 colorButton  rounded-pill">
            Invia email
          </Button>
        </Form>

        <p className="text-center mt-3 text-secondary">
          Non hai ricevuto l'email?
          <a href="#" className="text-color">
            Invia una nuova email
          </a>
        </p>
      </Col>
    </Container>
  );
};

export default PassDim;
