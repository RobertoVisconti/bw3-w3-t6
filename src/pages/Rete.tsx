import { Container, Row, Col } from "react-bootstrap";
import { ReteSidebar } from "../components/ReteSidebar";

export const Rete = () => {
  return (
    <Container>
      <Row>
        {/* sidebar sx */}
        <Col xs={12} md={3}></Col>
        <ReteSidebar></ReteSidebar>
        {/* main rete */}
        <Col xs={12} md={9}></Col>
      </Row>
    </Container>
  );
};
