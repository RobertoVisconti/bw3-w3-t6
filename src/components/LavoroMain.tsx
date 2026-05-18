import { Col, Container, Row } from "react-bootstrap";
import SingleLavoro from "./SingleLavoro";

const esempio = ["uno ", "due", "tre"];

const LavoroMain = function () {
  return (
    <Container className="mt-2 d-flex flex-column gap-3">
        {/* LAVORI PENSATI PER TE */}
      <Row className="bg-white rounded-3 border">
        <Col xs={12} className="pt-3">
          <h3>Le principali offerte di lavoro</h3>
          <p className=" text-secondary" style={{ lineHeight: "1" }}>
            In base al tuo profilo , alle tue preferenze e ad attivitá come
            candidature , ricerche e salvataggi
          </p>
        </Col>
        <Col>
          <Container className="d-flex justify-content-between">
            <Row className="d-flex">
              <Col>
                {esempio.map((lavoro) => {
                  return <SingleLavoro />;
                })}
              </Col>
            </Row>
          </Container>
        </Col>
        
        {/* ALTRI LAVORI RANDOM */}
      </Row>
      <Row className="bg-white rounded-3 border">
        <Col xs={12} className="pt-3">
          <h3>Altre offerte di lavoro</h3>
          <p className=" text-secondary" style={{ lineHeight: "1" }}>
            In base al tuo profilo , alle tue preferenze e ad attivitá come
            candidature , ricerche e salvataggi
          </p>
        </Col>
        <Col>
          <Container className="d-flex justify-content-between">
            <Row className="d-flex">
              <Col>
                {esempio.map((lavoro) => {
                  return <SingleLavoro />;
                })}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default LavoroMain;
