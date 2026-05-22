import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { FaRegNewspaper, FaUserFriends } from "react-icons/fa";
import { MdOndemandVideo, MdWork } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="bg-white min-vh-100 px-0 overflow-hidden">
      <Container style={{ maxWidth: "1220px" }}>
        <nav
          className="d-flex align-items-center justify-content-between"
          style={{ height: "82px" }}
        >
          <div
            className="d-flex align-items-center text-primary fw-bold"
            style={{
                fontSize: "34px",
                letterSpacing: "-1px",
            }}
            >
            Linked
            <FaLinkedin className="ms-1" />
            </div>

          <div className="d-none d-lg-flex align-items-center">
            <div className="d-flex align-items-center gap-4 me-4">
              <div className="text-center text-secondary">
                <FaRegNewspaper className="fs-4 d-block mx-auto" />
                <span style={{ fontSize: "13px" }}>Articoli</span>
              </div>

              <div className="text-center text-secondary">
                <FaUserFriends className="fs-4 d-block mx-auto" />
                <span style={{ fontSize: "13px" }}>Persone</span>
              </div>

              <div className="text-center text-secondary">
                <MdOndemandVideo className="fs-4 d-block mx-auto" />
                <span style={{ fontSize: "13px" }}>Learning</span>
              </div>

              <div className="text-center text-secondary">
                <MdWork className="fs-4 d-block mx-auto" />
                <span style={{ fontSize: "13px" }}>Lavoro</span>
              </div>
            </div>

            <div className="border-start d-flex align-items-center gap-3 ps-4">
              <Button
                variant="link"
                className="text-dark text-decoration-none fw-semibold px-3"
              >
                Iscriviti ora
              </Button>

              <Button
                variant="outline-primary"
                className="rounded-pill fw-semibold px-4 py-2"
                onClick={() => navigate("/login")}
              >
                Accedi
              </Button>
            </div>
          </div>

          <div className="d-flex d-lg-none gap-2">
            <Button
              variant="link"
              className="text-dark text-decoration-none fw-semibold"
            >
              Iscriviti
            </Button>

            <Button
              variant="outline-primary"
              className="rounded-pill fw-semibold px-3"
              onClick={() => navigate("/Login")}
            >
              Accedi
            </Button>
          </div>
        </nav>
      </Container>

      <Container style={{ maxWidth: "1220px" }}>
        <Row className="align-items-center">
          <Col xs={12} lg={5}>
            <div style={{ maxWidth: "430px", paddingTop: "48px" }}>
              <h1
                className="fw-light mb-5"
                style={{
                    color: "#d85905",
                    fontSize: "56px",
                    lineHeight: "1.1",
                    letterSpacing: "-1.4px",
                    width: "560px",
                }}
                >
                Ti diamo il benvenuto nella tua community
                <br />
                    professionale
                </h1>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold text-secondary small">
                    Email o telefono
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="rounded-1 border-secondary"
                    style={{ height: "45px" }}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label className="fw-semibold text-secondary small">
                    Password
                  </Form.Label>

                  <div className="position-relative">
                    <Form.Control
                      type="password"
                      className="rounded-1 border-secondary pe-5"
                      style={{ height: "45px" }}
                    />

                    <button
                      type="button"
                      className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent text-primary fw-semibold me-3"
                    >
                      Mostra
                    </button>
                  </div>
                </Form.Group>

                <button
                  type="button"
                  className="border-0 bg-transparent text-primary fw-semibold p-0 mb-4"
                >
                  Hai dimenticato la password?
                </button>

                <Button
                  type="button"
                  className="rounded-pill w-100 fw-semibold mb-4"
                  style={{ height: "50px" }}
                >
                  Accedi
                </Button>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <hr className="flex-grow-1" />
                  <span className="text-secondary small">oppure</span>
                  <hr className="flex-grow-1" />
                </div>

                <p className="small text-secondary">
                  Cliccando su “Continua”, accetti il{" "}
                  <span className="text-primary fw-semibold">
                    Contratto di licenza
                  </span>
                  , l'
                  <span className="text-primary fw-semibold">
                    Informativa sulla privacy
                  </span>{" "}
                  e l'
                  <span className="text-primary fw-semibold">
                    Informativa sui cookie
                  </span>{" "}
                  di LinkedIn.
                </p>
              </Form>
            </div>
          </Col>

          <Col xs={12} lg={7} className="text-end">
            <Image
              src="/landing.png"
              alt="Landing LinkedIn"
              fluid
              className="d-none d-lg-inline-block"
              style={{
                maxWidth: "720px",
                marginRight: "-350px",
              }}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Landing;

