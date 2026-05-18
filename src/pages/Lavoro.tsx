import { Col, Container, Row } from "react-bootstrap";
import SidebarStart from "../components/sidebarstart";
import LavoroMain from "../components-biagio-lavoro/LavoroMain";

const Lavoro = () => {
  return (
    <Container>
      <Row>
        {/* colonna sinistra */}
        <Col md={4}>
          <SidebarStart />
        </Col>
        {/* colonna centrale */}
        <Col md={8}>
          <LavoroMain />
        </Col>
      </Row>
    </Container>
  );
};
export default Lavoro;
