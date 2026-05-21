import { Col, Container, Row } from "react-bootstrap";
import { ReteSidebar } from "../components/ReteSidebar";
import Messaggistica from "../components/generali/Messaggistica";

const ChatExpand = () => {
  return (
    <Container fluid="xl" className="mt-3">
      <Row>
        {/* Colonna Chat */}
        <Col md={8} lg={9}>
          <Messaggistica />
        </Col>
        {/* Colonna Footer */}
        <Col md={4} lg={3}>
          <ReteSidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatExpand;
