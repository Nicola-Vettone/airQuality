import { List } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <Navbar expand="lg" className="navbar-links">
      <Container className="d-flex  align-items-center">
        <Navbar.Brand href="#icon">
          <List size={30} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="d-flex flex-grow-1 justify-content-center">
          <Nav className="d-flex gap-3 ">
            <Nav.Link className="fontNavbar" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="fontNavbar" href="#link">
              Tools
            </Nav.Link>
            <Nav.Link className="fontNavbar" href="/3Dmodels">
              3D models
            </Nav.Link>
            <Nav.Link className="fontNavbar" href="#link">
              Air Quality
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="d-flex align-items-center gap-3">
          <Nav.Link className="LoginNavBar" href="/">
            Login
          </Nav.Link>
          <Nav.Link className="border border-black rounded-pill px-4 LoginNavBar" href="/register">
            Sign In
          </Nav.Link>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
