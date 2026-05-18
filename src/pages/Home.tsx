import SidebarStart from "../components/sidebarstart";
import { Col, Container, Row } from "react-bootstrap";
import MainCenter from "../components-B/MainCenter";

import SideBarEnd from "../components/SideBarEnd";

const Home = () => {
  return (
    <Container fluid>
      <Row>
        {/* colonna sinistra */}
        <Col md={3}>
          <SidebarStart />
        </Col>
        {/* colonna centrale */}
        <Col md={6} style={{ height: "100vh" }}>
          <MainCenter />
        </Col>
        {/* colonna destra */}
        <Col md={3}>
          <SideBarEnd />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
