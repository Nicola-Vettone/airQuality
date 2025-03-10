import { useState } from "react";
import { Container, Col, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <Container fluid className=" vh-100 d-flex align-items-center justify-content-end pe-5 backImg  ">
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
              required
              type="text"
              placeholder="Inserisci il nome utente"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-3 ">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                className="rounded-pill"
                required
                placeholder="Inserisci la password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <div className="d-flex justify-content-end mt-2">
            <Link to="/Password_dimenticata" className="text-color ">
              Hai dimenticato la password?
            </Link>
          </div>

          <Link to={"/mqtt"} type="submit" className="w-100 mt-3 colorButton text-white rounded-pill">
            Login
          </Link>
        </Form>

        <p className="text-center mt-3">
          Non hai l’account?
          <Link to="/register" className="text-color">
            Iscriviti ora
          </Link>
        </p>
      </Col>
    </Container>
  );
};

export default Login;
