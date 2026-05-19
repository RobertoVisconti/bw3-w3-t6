import { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const { myProfile } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    const userHasLogged = localStorage.getItem("isLoggedIn");

    if (userHasLogged === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (myProfile && email.toLowerCase() === myProfile.email.toLowerCase()) {
      console.log("Primo Login effettuato con successo!");

      localStorage.setItem("isLoggedIn", "true");

      navigate("/");
    } else {
      setErrorMsg(
        "Email non valida. Usa l'indirizzo associato al tuo profilo Epicode.",
      );
    }
  };

  return (
    <Container
      fluid
      className="vh-100 bg-white bg-sm-light d-flex flex-column p-0"
    >
      {/* Header*/}
      <header className="p-3 p-sm-5 ms-0 ms-sm-5 text-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#0066dc"
          width="34"
          height="34"
        >
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.75a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.5c1.55 0 3.4 1.08 3.4 4z"></path>
        </svg>
      </header>

      {/* Zona Centrale di Login */}
      <main className="d-flex flex-grow-1 align-items-start align-items-sm-center justify-content-center pb-5">
        <div className="w-100 px-3 px-sm-0" style={{ maxWidth: "400px" }}>
          <Card className="border-0 border-sm bg-transparent bg-sm-white rounded-0 rounded-sm-4 shadow-none shadow-sm-sm p-2 p-sm-4">
            <Card.Body className="p-1 p-sm-2">
              <h1 className="h3 fw-semibold mb-1 text-dark text-center">
                Accedi al tuo account
              </h1>
              <p className="text-muted small mb-4 text-center">
                Resta aggiornato sul tuo mondo professionale
              </p>
              {errorMsg && (
                <div
                  className="alert alert-danger py-2 small text-start border-0 rounded-3 mb-3"
                  role="alert"
                >
                  {errorMsg}
                </div>
              )}

              {/* Form Principale */}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Control
                    type="email"
                    placeholder="Inserisci email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2.5 border-secondary-subtle text-dark focus-ring focus-ring-primary"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-2.5 border-secondary-subtle text-dark focus-ring focus-ring-primary"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 rounded-5 py-2.5 fw-semibold mb-3 border-0 btn-primary"
                  style={{ backgroundColor: "#0066dc" }}
                >
                  Accedi
                </Button>

                <Form.Group
                  className="mb-4 text-start"
                  controlId="loginRemember"
                >
                  <Form.Check
                    type="checkbox"
                    label="Mantieni attiva la sessione"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="text-secondary small"
                  />
                </Form.Group>
              </Form>

              <div className="d-flex align-items-center my-3 text-muted">
                <hr className="flex-grow-1 border-secondary-subtle my-0" />
                <span className="px-3 small text-secondary">oppure</span>
                <hr className="flex-grow-1 border-secondary-subtle my-0" />
              </div>

              {/* Pulsanti Social */}
              <div className="d-flex flex-column gap-2 mb-4">
                <Button
                  variant="outline-secondary"
                  className="w-100 rounded-5 py-2 d-flex align-items-center justify-content-center gap-2 border-secondary-subtle text-dark bg-white hover-bg-light fw-medium"
                >
                  <FcGoogle size={20} /> Accedi con Google
                </Button>

                <Button
                  variant="outline-secondary"
                  className="w-100 rounded-5 py-2 d-flex align-items-center justify-content-center gap-2 border-secondary-subtle text-dark bg-white hover-bg-light fw-medium"
                >
                  <FaApple size={20} className="text-dark" /> Accedi con Apple
                </Button>
              </div>

              <div className="text-center small">
                <p className="mb-2">
                  <a
                    href="#forgot"
                    className="text-primary text-decoration-none fw-semibold"
                  >
                    Hai dimenticato la password?
                  </a>
                </p>
                <p className="text-secondary m-0">
                  Non hai un account?{" "}
                  <a
                    href="#register"
                    className="text-primary text-decoration-none fw-semibold"
                  >
                    Iscriviti ora
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </main>
    </Container>
  );
};

export default Login;
