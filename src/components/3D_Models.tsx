import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import ModelCards from "./Card3D";
import SearchBar from "./SearchBar";

function Module3D() {
  return (
    <Container fluid className=" p-0 ">
      <Container fluid className="module3d-container">
        <NavBar />
        <SearchBar />
      </Container>
      <ModelCards />
    </Container>
  );
}

export default Module3D;
