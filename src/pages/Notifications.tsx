import { Col, Container, Row } from "react-bootstrap";
import SidebarStart from "../components/sidebarstart";
import { ReteSidebar } from "../components/ReteSidebar";
import NotificationList from "../components/NotificationList";

const Notifications = () => {
  return (
    <Container>
      <Row>
        {/* colonna sinistra */}
        <Col md={3}>
          <SidebarStart />
        </Col>
        {/* colonna centrale */}
        <Col md={6} style={{ minHeight: "100vh" }}>
          <NotificationList />
        </Col>
        {/* colonna destra */}
        <Col md={3}>
          <ReteSidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default Notifications;
