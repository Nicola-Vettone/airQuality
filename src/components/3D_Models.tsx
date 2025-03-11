import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import Tools from "./Tools";
import ModelCards from "./Card3D";

function Module3D() {
  return (
    <Container fluid className="backGroundColor p-0 ">
      <Container fluid className="module3d-container">
        <NavBar />
        <Tools />
      </Container>
      <ModelCards />
    </Container>
  );
}

export default Module3D;
