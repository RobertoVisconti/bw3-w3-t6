import { Col, Container, Row } from "react-bootstrap";
import SidebarStart from "../components/home-page/sidebarstart";
import { ReteSidebar } from "../components/ReteSidebar";
import NotificationList from "../components/NotificationList";
import { FooterMiniGenerale } from "../components/footer/FooterMiniGenerale";

const Notifications = () => {
  return (
    <Container fluid="xl">
      <Row>
        {/* colonna sinistra */}
        <Col xs={12} md={4} lg={3}>
          <SidebarStart />
        </Col>

        {/* colonna centrale + destra wrappate */}
        <Col xs={12} md={8} lg={9} className="mt-3">
          <Row>
            {/* centrale */}
            <Col xs={12} lg={8}>
              <NotificationList />
            </Col>
            {/* destra */}
            <Col xs={12} lg={4}>
              <ReteSidebar />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="d-md-none">
        <FooterMiniGenerale />
      </div>
    </Container>
  );
};

export default Notifications;
