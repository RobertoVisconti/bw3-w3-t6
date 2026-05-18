import { Col, Container, Row } from "react-bootstrap"
import SidebarStart from "../component_caf/SidebarStart/sidebarstart"

const Lavoro = () => {
  return (
    <Container>
      <Row>
        {/* colonna sinistra */}
        <Col md={4}>
          <SidebarStart />
        </Col>
        {/* colonna centrale */}
        <Col md={8}></Col>
      </Row>
    </Container>
  )
}
export default Lavoro
