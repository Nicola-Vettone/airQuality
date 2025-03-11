import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import Tools from "./Tools";
import ModelCards from "./Card3D";

function Module3D() {
  return (
    <Container fluid className="backGroundColor ">
      <NavBar />
      <Tools />
      <ModelCards />
    </Container>
  );
}

export default Module3D;
