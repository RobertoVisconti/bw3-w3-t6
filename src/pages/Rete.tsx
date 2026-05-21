import { Container, Row, Col } from "react-bootstrap";
import { ReteSidebar } from "../components/ReteSidebar";
import { MainRete } from "../components/MainRete";
import { FooterMiniGenerale } from "../components/footer/FooterMiniGenerale";

export const Rete = () => {
  return (
    <Container fluid="lg" className="mt-3">
      <Row className="g-0 g-sm-3">
        {/* sidebar sx */}
        <Col xs={12} md={4} lg={3}>
          {" "}
          <ReteSidebar></ReteSidebar>
        </Col>

        {/* main rete */}
        <Col xs={12} md={8} lg={9}>
          <MainRete></MainRete>
        </Col>
      </Row>
      <div className="d-md-none">
        <FooterMiniGenerale />
      </div>
    </Container>
  );
};
