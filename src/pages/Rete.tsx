import { Container, Row, Col } from "react-bootstrap";
import { ReteSidebar } from "../components/ReteSidebar";

export const Rete = () => {
  return (
    <Container fluid="md" className="px-0  mt-sm-4">
      <Row className="g-0 g-sm-3">
        {/* sidebar sx */}
        <Col xs={12} md={4} lg={3}>
          {" "}
          <ReteSidebar></ReteSidebar>
        </Col>

        {/* main rete */}
        <Col xs={12} md={8} lg={9}></Col>
      </Row>
    </Container>
  );
};
