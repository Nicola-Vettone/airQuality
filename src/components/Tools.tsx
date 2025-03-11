import { Button, Container } from "react-bootstrap";
import { FunnelFill, Search } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Tools() {
  return (
    <Container className="d-flex gap-3 align-items-center p-3">
      <Button className="buttonFilter rounded-pill px-4 py-2">
        <FunnelFill size={20} />
      </Button>

      <InputGroup className="searchBar">
        <Form.Control className="rounded-pill py-2 bg-transparent" placeholder="Search..." />
        <InputGroup.Text className=" bg-transparent border-0">
          <Search style={{ position: "absolute", top: "10px", left: "94%" }} size={20} />
        </InputGroup.Text>
      </InputGroup>
    </Container>
  );
}

export default Tools;
