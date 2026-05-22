import { Col, Container, Row } from "react-bootstrap";
import ProfileRightSidebar from "../components/ProfileRightSidebar";
import MainProfile from "../components/MainProfile";
import FooterLinkedin from "../components/footer/FooterLinkedin";

const Profilo = () => {
  return (
    <Container fluid="xl" className="mt-2">
      <Row>
        {/* colonna principale */}
        <Col md={8} lg={9}>
          <MainProfile />

          <div className="d-none d-md-block">
            <FooterLinkedin />
          </div>
        </Col>

        {/* sidebar destra */}
        <Col md={4} lg={3} className="mt-2">
          <ProfileRightSidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default Profilo;
