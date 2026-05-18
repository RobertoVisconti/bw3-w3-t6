import { Col, Container, Row } from "react-bootstrap"
import SidebarStart from "../components/sidebarstart"

const Profilo = () => {
  return (
    <Container>
      <Row>
        {/* colonna sinistra */}
        <Col md={9}>
          <SidebarStart />
        </Col>
        {/* colonna centrale */}
        <Col md={3}></Col>
      </Row>
    </Container>
  )
}
export default Profilo
