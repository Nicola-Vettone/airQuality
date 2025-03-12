import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { Download } from "react-bootstrap-icons";

function Tools() {
  return (
    <Container fluid className=" p-0">
      <Container fluid className="module3d-container">
        <NavBar />
        <SearchBar />
      </Container>
      <Container className=" d-flex flex-column align-item-center justify-content-center mt-5 ">
        <p className="border border-2 mt-2 rounded-pill py-2 px-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          <Download className="cursor-pointer-download" style={{ position: "absolute", left: "89%" }} size={22} />
        </p>
        <p className="border border-2 mt-2 rounded-pill py-2 px-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          <Download className="cursor-pointer-download" style={{ position: "absolute", left: "89%" }} size={22} />
        </p>
        <p className="border border-2 mt-2 rounded-pill py-2 px-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          <Download className="cursor-pointer-download" style={{ position: "absolute", left: "89%" }} size={22} />
        </p>
        <p className="border border-2 mt-2 rounded-pill py-2 px-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          <Download className="cursor-pointer-download" style={{ position: "absolute", left: "89%" }} size={22} />
        </p>
        <p className="border border-2 mt-2 rounded-pill py-2 px-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          <Download className="cursor-pointer-download" style={{ position: "absolute", left: "89%" }} size={22} />
        </p>
        <p className="border border-2 mt-2 rounded-pill py-2 px-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          <Download className="cursor-pointer-download" style={{ position: "absolute", left: "89%" }} size={22} />
        </p>
        <div className="d-flex justify-content-end">
          <button type="submit" className="text-white mt-3 buttonSalta rounded-pill px-5 py-1">
            Upload
          </button>
        </div>
      </Container>
    </Container>
  );
}
export default Tools;
