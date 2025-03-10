import { useState } from "react";
import { Container, Col, Form, Button, InputGroup } from "react-bootstrap";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  /*   const [confermaPass, setConfermaPass] = useState<string>(""); */
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <Container fluid className=" vh-100 d-flex align-items-center justify-content-center p-0">
      {/* Sezione Immagine */}
      <Col md={6} className="login-image">
        {/*  <div className="w-75">
          <img src={imgLogin} alt="Login" className="imgBack" />
        </div> */}
      </Col>

      {/* Sezione Form */}
      <Col md={6} className="w-25 ">
        <h2>
          Ciao! <br /> Bentornato!
        </h2>

        <Form onSubmit={handleSubmit} className="mt-4 ">
          <Form.Group controlId="username">
            <Form.Label>Nome Utente</Form.Label>
            <Form.Control
              className="rounded-pill"
              type="text"
              placeholder="Inserisci il nome utente"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-3 ">
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <Form.Control
                className="rounded-pill"
                type="email"
                placeholder="Inserisci la tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="password" className="mt-3 ">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                className="rounded-pill"
                type="password"
                placeholder="Inserisci la password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="password" className="mt-3 ">
            <Form.Label>Conferma password</Form.Label>
            <InputGroup>
              <Form.Control className="rounded-pill" type="password" placeholder="Conferma password" />
            </InputGroup>
          </Form.Group>

          <Button variant="success" type="submit" className="w-100 mt-3  rounded-pill">
            Conferma
          </Button>
        </Form>
        <div className="d-flex justify-content-end">
          <Button variant="success" type="submit" className=" mt-3 buttonSalta rounded-pill px-5">
            Salta
          </Button>
        </div>
      </Col>
    </Container>
  );
};

export default Login;
