import { Container, Row, Col } from "react-bootstrap";
import SideBarSettings from "../components/SideBarSettings";
import MainContentSettings from "../components/MainContentSettings";

const SettingsPage = () => {
  return (
    <>
      <Container fluid className="px-0 ">
        <Row className="g-0">
          {/* COLONNA SIDEBAR */}
          <Col
            md={3}
            className="sticky-top d-none d-md-block z-1"
            style={{
              height: "fit-content",
              top: "55px",
            }}
          >
            <SideBarSettings />
          </Col>

          {/* COLONNA MAIN CONTENT */}

          <Col md={9} className="px-4 ps-md-5">
            <MainContentSettings />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SettingsPage;
