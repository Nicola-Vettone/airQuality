import { useState } from "react";
import { Container, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>();
  const [confermaPass, setConfermaPass] = useState<string>();
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
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
          Ciao! <br /> Bentornato,registrati!
        </h2>

        <Form onSubmit={handleSubmit} className="mt-4 ">
          <Form.Group controlId="username">
            <Form.Label>Nome Utente</Form.Label>
            <Form.Control
              className="rounded-pill"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-3 ">
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <Form.Control className="rounded-pill" value={email} onChange={(e) => setEmail(e.target.value)} />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="password" className="mt-3 ">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                className="rounded-pill"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="password" className="mt-3 ">
            <Form.Label>Conferma password</Form.Label>
            <InputGroup>
              <Form.Control
                className="rounded-pill"
                type="password"
                value={confermaPass}
                required
                onChange={(e) => setConfermaPass(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          {password === confermaPass ? (
            <Button variant="success" type="submit" className="w-100 mt-3 colorButton  rounded-pill">
              Conferma
            </Button>
          ) : (
            <Button
              onClick={() => alert("Le password non coincidono")}
              variant="success"
              className="w-100 mt-3  rounded-pill differentPasswords"
            >
              Conferma
            </Button>
          )}
        </Form>
        <div className="d-flex justify-content-end">
          <button type="submit" className="text-white mt-3 buttonSalta rounded-pill px-5 py-1">
          <Link to="/tools" className="text-color">
            Salta
          </Link>
          </button>
        </div>
      </Col>
    </Container>
  );
};

export default Register;
