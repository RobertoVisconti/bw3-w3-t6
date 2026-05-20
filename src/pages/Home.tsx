import SidebarStart from "../components/sidebarstart";
import { Col, Container, Row } from "react-bootstrap";

import SideBarEnd from "../components/SideBarEnd";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Row>
        {/* colonna sinistra */}
        <Col md={3}>
          <SidebarStart />
        </Col>
        {/* colonna centrale */}
        <Col md={6} style={{ minHeight: "100vh" }}>
          <Outlet />
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
