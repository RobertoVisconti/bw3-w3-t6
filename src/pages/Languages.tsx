import { Card, Col, Container, Row } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";
import SideBarSettings from "../components/SideBarSettings";

const Languages = () => {
  // Nota: Abbiamo rimosso gli stati "isOpen", "selectedLanguage" e l'array "languages"
  // perché ora ci pensa Google a gestire tutto in autonomia.

  return (
    <Container fluid className="bg-light min-vh-100 px-0">
      <Row className="g-0 min-vh-100">
        <Col md={4} lg={3} xl={2} className="d-none d-md-block">
          <SideBarSettings />
        </Col>

        <Col xs={12} md={8} lg={9} xl={10}>
          <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1 py-4 px-3 px-md-4 px-lg-5">
              <Row className="justify-content-center">
                <Col xs={12} sm={11} md={10} lg={8} xl={6}>
                  <Card className="border-0 shadow-sm rounded-3">
                    <Card.Body className="p-3 p-md-4">
                      <div className="d-flex align-items-center gap-2 mb-4 text-secondary small">
                        <IoArrowBack />
                        <span>Indietro</span>
                      </div>

                      <h6 className="fw-bold mb-1">Lingua</h6>

                      <p className="small mb-4">
                        Seleziona la lingua che utilizzi su LinkedIn per
                        tradurre la pagina
                      </p>

                      <div
                        className="p-2 border rounded bg-white"
                        style={{ maxWidth: "390px" }}
                      >
                        <div id="google_translate_element"></div>
                      </div>

                      <p className="small text-muted mt-4 mb-0">
                        Facci sapere quale lingua preferisci usare per LinkedIn.
                        Potrai modificarla in qualsiasi momento.{" "}
                        <span className="text-primary fw-semibold">
                          Per saperne di più
                        </span>
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </main>

            <footer className="text-center px-3 pb-4 small text-muted">
              <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3 mb-2">
                <span>Centro assistenza</span>
                <span>Informativa sulla community professionale</span>
                <span>Informativa sulla privacy</span>
                <span>Accessibilità</span>
              </div>

              <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3 mb-2">
                <span>Trasparenza sui contenuti consigliati</span>
                <span>Contratto di licenza</span>
                <span>Contratto di licenza dell’utente finale</span>
              </div>

              <div className="fw-bold text-primary">
                Linked
                <span className="bg-primary text-white px-1 rounded-1">in</span>
              </div>
            </footer>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Languages;
