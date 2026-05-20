import { Col, Container, Row } from "react-bootstrap";
import { ReteSidebar } from "../components/ReteSidebar";
import Messaggistica from "../components/Messaggistica";

const ChatExpand = () => {
  return (
    <Container>
      <Row>
        {/* Colonna Chat */}
        <Col md={9}>
          <Messaggistica />
        </Col>
        {/* Colonna Footer */}
        <Col md={3}>
          <ReteSidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatExpand;
