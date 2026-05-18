import { Col, Container, Row } from "react-bootstrap";
import SidebarStart from "../component_caf/sidebarstart";

const Home = () => {
  return (
    <Container>
      <Row>
        {/* colonna sinistra */}
        <Col md={3}>
        <SidebarStart/>
        </Col>
        {/* colonna centrale */}
        <Col md={6}>
        </Col>
        {/* colonna destra */}
        <Col md={3}></Col>
      </Row>
    </Container>
  );
};

export default Home;
