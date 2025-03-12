import { useState } from "react";
import { Container, Col, Form, InputGroup, Button } from "react-bootstrap";
import { EmojiSmile, Eye } from "react-bootstrap-icons";
import { Link } from "react-router";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

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
          Ciao! <br /> Bentornato! <EmojiSmile className="iconColor" />
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
                type="password"
                required
                placeholder="Inserisci la password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Eye className="cursor-pointer" style={{ position: "absolute", top: "10px", left: "92%" }} size={20} />
            </InputGroup>
          </Form.Group>

          <div className="d-flex justify-content-end mt-2">
            <Link to="/Password_dimenticata" className="text-color ">
              Hai dimenticato la password?
            </Link>
          </div>

          {username && password ? (
            <Link to={"/mqtt"} type="submit" className="w-100 mt-3 colorButton text-white rounded-pill">
              Login
            </Link>
          ) : (
            <Button
              onClick={() => alert("Effettua il login o iscriviti!")}
              variant="success"
              type="submit"
              className="w-100 mt-3 colorButton  rounded-pill"
            >
              Login
            </Button>
          )}
        </Form>

        <p className="text-center mt-3">
          Non hai l’account?
          <Link to="/register" className="text-color custom-link">
            Iscriviti ora
          </Link>
        </p>
      </Col>
    </Container>
  );
};

export default Login;
