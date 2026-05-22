import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";
import { BsPhoneFill, BsPatchCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container fluid className="bg-light min-vh-100 py-4 py-md-5 px-3">
        <Row className="justify-content-center">
          <Col xs={12} md={11} lg={9} xl={7}>
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-4 p-md-5">
                <button
                  type="button"
                  className="border-0 bg-transparent d-flex align-items-center gap-2 text-secondary mb-4 p-0"
                  onClick={() => navigate("/")}
                >
                  <IoArrowBack size={20} />
                  <span className="fw-medium">Indietro</span>
                </button>

                <div
                  className="position-relative d-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: "90px",
                    height: "90px",
                    backgroundColor: "#eef3f8",
                    borderRadius: "50%",
                  }}
                >
                  <BsPhoneFill
                    style={{
                      fontSize: "2.8rem",
                      color: "#0a66c2",
                    }}
                  />

                  <BsPatchCheckFill
                    style={{
                      position: "absolute",
                      bottom: "14px",
                      right: "14px",
                      fontSize: "1.5rem",
                      color: "#057642",
                      backgroundColor: "white",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                <h2 className="fw-bold mb-3">
                  Usa il tuo dispositivo mobile per la verifica
                </h2>

                <p
                  className="text-secondary mb-3"
                  style={{
                    maxWidth: "650px",
                    lineHeight: "1.5",
                  }}
                >
                  Segui le indicazioni per verificare la tua identità usando
                  Persona sul tuo dispositivo mobile.
                </p>

                <p className="fw-semibold mb-4">
                  Devi avere l'app LinkedIn.{" "}
                  <span className="text-primary" style={{ cursor: "pointer" }}>
                    Scarica l'app LinkedIn
                  </span>
                </p>

                <Row className="g-4 align-items-stretch mb-4">
                  <Col xs={12} md={4}>
                    <div className="border rounded-4 p-4 h-100 d-flex align-items-center justify-content-center bg-white">
                      <Image
                        src="/qrCode.png"
                        alt="QR code verifica"
                        fluid
                        style={{ maxWidth: "200px" }}
                      />
                    </div>
                  </Col>

                  <Col xs={12} md={8}>
                    <div className="bg-light rounded-4 p-4 h-100">
                      <h6 className="fw-bold mb-4">Indicazioni:</h6>

                      <p className="mb-3">
                        1. Apri l'app della fotocamera sul telefono
                      </p>

                      <p className="mb-3">
                        2. Inquadra il codice QR a sinistra
                      </p>

                      <p className="mb-0">3. Segui i passaggi sul telefono</p>
                    </div>
                  </Col>
                </Row>

                <p className="small mb-4">
                  Scopri{" "}
                  <span
                    className="text-primary fw-semibold"
                    style={{ cursor: "pointer" }}
                  >
                    come gli utenti possono confermare le loro informazioni.
                  </span>
                </p>

                <p className="fw-semibold mb-0">
                  Questa pagina si aggiornerà una volta completata la verifica.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Authentication;
