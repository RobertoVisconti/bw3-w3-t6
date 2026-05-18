import { Col, Container, Row } from "react-bootstrap"

import MainProfile from "../components/MainProfile"

const Profilo = () => {
  return (
    <Container>
      <Row>
        {/* colonna sinistra */}
        <Col md={9}>
          <MainProfile />
        </Col>
        {/* colonna centrale */}
        <Col md={3}></Col>
      </Row>
    </Container>
  )
}
export default Profilo
