import { Eye, Download } from "react-bootstrap-icons";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router";

const models = [
  {
    id: 1,
    img: "https://plus.unsplash.com/premium_photo-1671233269780-89a290d75b2a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cube 3D",
  },
  {
    id: 2,
    img: "https://plus.unsplash.com/premium_photo-1671233269780-89a290d75b2a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Lorem ipsum dolor sit amet",
  },
  {
    id: 3,
    img: "https://plus.unsplash.com/premium_photo-1671233269780-89a290d75b2a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Lorem ipsum dolor sit amet",
  },
  {
    id: 4,
    img: "https://plus.unsplash.com/premium_photo-1671233269780-89a290d75b2a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Lorem ipsum dolor sit amet",
  },
  {
    id: 5,
    img: "https://plus.unsplash.com/premium_photo-1671233269780-89a290d75b2a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Lorem ipsum dolor sit amet",
  },
  {
    id: 6,
    img: "https://plus.unsplash.com/premium_photo-1671233269780-89a290d75b2a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Lorem ipsum dolor sit amet",
  },
];

function ModelCards() {
  return (
    <Container className="py-4">
      <Container>
        <Row className="g-4">
          {models.map((model) => (
            <Col key={model.id} xs={12} sm={6} md={4}>
              <Link className="text-decoration-none" to={"/cube3D"}>
                <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                  <Card.Img variant="top" src={model.img} className="card-img " />

                  <Card.Body className="bg-light-green p-3">
                    <Card.Title className="fw-bold text-dark">{model.title}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button variant="link" className="p-0 text-dark text-decoration-none d-flex align-items-center">
                        <Eye className="me-1" /> Preview
                      </Button>
                      <Button variant="link" className="text-dark">
                        <Download />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default ModelCards;
