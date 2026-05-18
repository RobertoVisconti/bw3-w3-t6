import { Col, Container, Row } from "react-bootstrap";
import SidebarStart from "../components/sidebarstart";
import LavoroMain from "../components-biagio-lavoro/LavoroMain";

const Lavoro = () => {
  return (
    <Container>
      <Row>
        {/* colonna sinistra */}
        <Col md={3}>
          <SidebarStart />
        </Col>
        {/* colonna centrale */}
        <Col md={9}></Col>
      </Row>
    </Container>
  )
}
export default Lavoro
