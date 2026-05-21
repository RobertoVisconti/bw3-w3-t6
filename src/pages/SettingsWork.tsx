import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { FaBookmark, FaExternalLinkAlt, FaComments } from "react-icons/fa";

const SettingsWork = () => {
  return (
    <div
      className="py-4"
      style={{ backgroundColor: "#f3f2ef", minHeight: "100vh" }}
    >
      <Container fluid="lg">
        <Row className="g-3">
          {/* ---------------- SEZIONE SINISTRA ---------------- */}
          <Col xs={12} md={3}>
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="p-2">
                <Button
                  variant="light"
                  className="w-100 text-start bg-white border-0 d-flex align-items-center gap-2 fw-semibold text-secondary py-2 px-3 shadow-none btn-hover-effect"
                >
                  <FaBookmark className="text-secondary" />
                  <span style={{ fontSize: "0.9rem" }}>I miei elementi</span>
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* ---------------- SEZIONE CENTRALE ---------------- */}
          <Col xs={12} md={6} className="d-flex flex-column gap-3">
            <Card
              className="border-0 shadow-sm rounded-3"
              style={{ borderLeft: "4px solid #d97706 !important" }}
            >
              <Card.Body className="p-4 position-relative">
                <button
                  type="button"
                  className="btn-close position-absolute top-0 end-0 m-3 p-1"
                  style={{ fontSize: "0.8rem" }}
                ></button>

                <Row className="align-items-start">
                  <Col xs="auto" className="pe-0">
                    <div
                      className="d-flex align-items-center justify-content-center bg-warning bg-opacity-25 text-warning rounded-circle"
                      style={{
                        width: "48px",
                        height: "48px",
                        fontSize: "1.5rem",
                      }}
                    >
                      🛡️
                    </div>
                  </Col>
                  <Col>
                    <h6
                      className="fw-bold mb-1 text-dark"
                      style={{ fontSize: "0.95rem" }}
                    >
                      Proteggi il tuo account con l'autenticazione a due fattori
                    </h6>
                    <p
                      className="text-muted mb-3"
                      style={{ fontSize: "0.85rem", lineHeight: "1.4" }}
                    >
                      Ti aiuterà ad assicurarti che solo tu possa accedere al
                      tuo account e gestire le tue offerte di lavoro.
                    </p>
                    <Button
                      variant="outline-primary"
                      className="rounded-pill fw-semibold px-3 py-1 btn-sm"
                    >
                      Proteggi l'account
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm rounded-3 flex-grow-1 bg-white">
              <Card.Body className="p-4 d-flex flex-column">
                <h5
                  className="fw-bold text-dark mb-4"
                  style={{ fontSize: "1.3rem" }}
                >
                  Offerte di lavoro pubblicate
                </h5>

                <div className="text-center my-auto py-5">
                  <div className="mb-4">
                    <Image
                      src="/workpage.svg"
                      alt="Nessuna offerta"
                      fluid
                      style={{ maxHeight: "160px" }}
                    />
                  </div>
                  <h6
                    className="fw-bold text-dark mb-2"
                    style={{ fontSize: "1rem" }}
                  >
                    Ancora nessuna offerta di lavoro pubblicata in questa
                    categoria
                  </h6>
                  <p
                    className="text-muted small mx-auto"
                    style={{ maxWidth: "380px" }}
                  >
                    Le offerte di lavoro che pubblichi appariranno qui.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* ---------------- SEZIONE DESTRA ---------------- */}
          <Col xs={12} md={3} className="d-flex flex-column gap-3">
            {/* Pulsante Pubblica Offerta */}
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="p-3">
                <Button
                  variant="outline-primary"
                  className="w-100 rounded-pill fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
                  style={{ fontSize: "0.9rem" }}
                >
                  <FaExternalLinkAlt size={12} />
                  <span>Pubblica offerta di lavoro gratuita</span>
                </Button>
              </Card.Body>
            </Card>

            {/* Box Assistenza */}
            <Card className="border-0 shadow-sm rounded-3 bg-white">
              <Card.Body className="p-4">
                <Row className="align-items-start mb-3">
                  <Col xs="auto" className="pe-0">
                    <FaComments className="text-secondary fs-3 mt-1" />
                  </Col>
                  <Col>
                    <h6
                      className="fw-bold mb-0 text-dark"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Chatta con l'assistenza
                    </h6>
                    <span
                      className="text-muted d-block mb-3"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Online
                    </span>
                    <Button
                      variant="outline-primary"
                      className="rounded-pill fw-semibold px-3 py-1 btn-sm"
                    >
                      Avvia chat
                    </Button>
                  </Col>
                </Row>

                <hr className="my-3 text-muted opacity-25" />

                <a
                  href="#centro-assistenza"
                  className="text-primary fw-semibold text-decoration-none small d-inline-block"
                >
                  Centro assistenza
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SettingsWork;
