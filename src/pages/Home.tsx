import { Col, Container, Row } from "react-bootstrap";
import MainCenter from "../components-B/MainCenter";

const Home = () => {
  return (
    <Container fluid>
      <Row>
        {/* colonna sinistra */}
        <Col md={3}></Col>
        {/* colonna centrale */}
        <Col md={6} className="border border-1" style={{height:"100vh"}}>
          <MainCenter />
        </Col>
        {/* colonna destra */}
        <Col md={3}></Col>
      </Row>
    </Container>
  );
};

export default Home;
