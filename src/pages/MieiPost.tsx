import { Col, Container, Row } from "react-bootstrap";
import SidebarStart from "../components/home-page/sidebarstart";
import SideBarEnd from "../components/home-page/SideBarEnd";
import MyPost from "../components/home-page/MyPost";

const MieiPost = () => {
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
              <MyPost />
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

export default MieiPost;
