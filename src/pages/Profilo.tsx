import { Col, Container, Row } from "react-bootstrap"
import ProfileRightSidebar from "../components/ProfileRightSidebar"
import MainProfile from "../components/MainProfile"

const Profilo = () => {
  return (
    <Container className="mt-4">
      <Row>
        {/* colonna principale */}
        <Col md={9}>
          <MainProfile />
        </Col>

        {/* sidebar destra */}
        <Col md={3} className="mt-2">
          <ProfileRightSidebar />
        </Col>
      </Row>
    </Container>
  )
}

export default Profilo
