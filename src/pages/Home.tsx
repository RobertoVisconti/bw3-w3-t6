import SidebarStart from "../components/home-page/sidebarstart";
import { Col, Container, Row } from "react-bootstrap";

import SideBarEnd from "../components/home-page/SideBarEnd";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <Container fluid="xl">
      <Row>
        {/* colonna sinistra */}
        <Col xs={12} md={3} lg={3}>
          <SidebarStart />
        </Col>

        {/* colonna centrale + destra insieme */}
        <Col xs={12} md={9} lg={9}>
          <Row>
            {/* centrale */}
            <Col xs={12} lg={8} style={{ minHeight: "100vh" }}>
              <Outlet />
            </Col>
            {/* destra */}
            <Col xs={12} lg={4}>
              <SideBarEnd />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
