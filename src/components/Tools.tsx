import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

function Tools() {
  return (
    <Container fluid className=" p-0">
      <Container fluid className="module3d-container">
        <NavBar />
        <SearchBar />
      </Container>
    </Container>
  );
}
export default Tools;
