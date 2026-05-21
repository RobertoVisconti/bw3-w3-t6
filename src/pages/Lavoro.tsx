import { Col, Container, Row } from "react-bootstrap";
import SidebarStart from "../components/home-page/sidebarstart";
import LavoroMain from "../components/lavoro/LavoroMain";

const Lavoro = () => {
  return (
    <Container fluid="xl">
      <Row>
        {/* colonna sinistra */}
        <Col md={5} lg={4}>
          <SidebarStart />
        </Col>
        {/* colonna centrale */}
        <Col md={7} lg={8}>
          <LavoroMain />
        </Col>
      </Row>
    </Container>
  );
};
export default Lavoro;
