import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { FaCheck, FaYoutube } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";

const Premium = () => {
  const [step, setStep] = useState(1);
  const [answerOne, setAnswerOne] = useState<string[]>([]);
  const [answerTwo, setAnswerTwo] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);

  const firstOptions = ["Per scopi personali", "Per lavoro", "Altro"];

  const secondOptions = [
    "Cercare lavoro in modo efficace e farmi assumere",
    "Sviluppare le mie competenze professionali",
    "Far crescere la mia rete, la mia attività o la mia reputazione",
    "Trovare e contattare nuovi lead",
    "Trovare e assumere talenti più rapidamente",
    "Altro",
  ];

  const progress = step === 1 ? 0 : step === 2 ? 40 : step === 3 ? 65 : 90;

  const toggleOption = (
    option: string,
    selectedOptions: string[],
    setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (selectedOptions.includes(option)) {
      const updatedOptions = selectedOptions.filter((item) => item !== option);
      setSelectedOptions(updatedOptions);

      if (updatedOptions.length === 0) {
        setShowError(true);
      }
    } else {
      setSelectedOptions([...selectedOptions, option]);
      setShowError(false);
    }
  };

  const goNextStepOne = () => {
    if (answerOne.length === 0) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setStep(2);
  };

  const goNextStepTwo = () => {
    if (answerTwo.length === 0) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setStep(3);

    setTimeout(() => {
      setStep(4);
    }, 1300);
  };

  const OptionButton = ({
    label,
    selected,
    onClick,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-100 rounded-3 d-flex align-items-center gap-3 text-start p-3 mb-3 bg-white ${
        selected
          ? "border border-success shadow-sm text-success"
          : "border text-dark"
      }`}
    >
      <span
        className={`d-flex align-items-center justify-content-center rounded-2 border ${
          selected ? "bg-success border-success text-white" : "bg-white"
        }`}
        style={{ width: "28px", height: "28px", minWidth: "28px" }}
      >
        {selected && <FaCheck size={15} />}
      </span>

      <span className="fw-semibold small">{label}</span>
    </button>
  );

  return (
    <Container fluid className="px-0 bg-light min-vh-100">
      <section className="bg-white text-center py-4 px-3 border-bottom">
        <h3 className="fw-bold mb-3">
          Raggiungi i tuoi obiettivi più velocemente con Premium.
        </h3>

        <p className="text-muted small mb-3">
          <FaYoutube className="text-danger me-2 fs-5" />
          Ottieni YouTube Premium e altro ancora per un periodo limitato con
          LinkedIn Premium.
        </p>

        <p className="mb-4">
          Approfitta di <strong>1 mese gratis con assistenza 24/7.</strong>{" "}
          Annulli facilmente. Ti invieremo un promemoria 7 giorni prima della
          fine del periodo di prova.
        </p>

        {step < 4 && (
          <div className="mx-auto" style={{ maxWidth: "580px" }}>
            <ProgressBar
              now={progress}
              variant="warning"
              className="mb-1"
              style={{ height: "8px" }}
            />

            <div className="d-flex justify-content-between small text-muted">
              <span>Stiamo personalizzando il tuo piano</span>
              <span>{progress}%</span>
            </div>
          </div>
        )}
      </section>

      <Container className="py-4">
        {step === 1 && (
          <>
            <Card
              className="mx-auto shadow-sm border-0 rounded-4"
              style={{ maxWidth: "570px" }}
            >
              <Card.Body className="p-4">
            
                <h4 className="fw-bold mb-2">
                  Ciao Roberto, per cosa potrebbe servirti aiuto oggi?
                </h4>

                <p className="text-muted small mb-4">
                  Usiamo l'IA per personalizzare il tuo piano
                </p>

                {firstOptions.map((option) => (
                  <OptionButton
                    key={option}
                    label={option}
                    selected={answerOne.includes(option)}
                    onClick={() =>
                      toggleOption(option, answerOne, setAnswerOne)
                    }
                  />
                ))}

                {showError && (
                  <p className="text-danger small mt-1 mb-0">
                    Seleziona almeno un'opzione.
                  </p>
                )}
              </Card.Body>
            </Card>

            <div
              className="mx-auto d-flex justify-content-end mt-3"
              style={{ maxWidth: "570px" }}
            >
              <Button className="rounded-pill px-4" onClick={goNextStepOne}>
                Avanti
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <Card
              className="mx-auto shadow-sm border-0 rounded-4"
              style={{ maxWidth: "570px" }}
            >
              <Card.Body className="p-4">
                
                <h4 className="fw-bold mb-2">
                  Cosa vorresti ottenere dal tuo abbonamento Premium?
                </h4>

                <p className="text-muted small mb-4">
                  Usiamo l'IA per personalizzare il tuo piano
                </p>

                {secondOptions.map((option) => (
                  <OptionButton
                    key={option}
                    label={option}
                    selected={answerTwo.includes(option)}
                    onClick={() =>
                      toggleOption(option, answerTwo, setAnswerTwo)
                    }
                  />
                ))}

                {showError && (
                  <p className="text-danger small mt-1 mb-0">
                    Seleziona almeno un'opzione.
                  </p>
                )}
              </Card.Body>
            </Card>

            <div
              className="mx-auto d-flex justify-content-between mt-3"
              style={{ maxWidth: "570px" }}
            >
              <Button
                variant="outline-primary"
                className="rounded-pill px-4"
                onClick={() => setStep(1)}
              >
                Indietro
              </Button>

              <Button className="rounded-pill px-4" onClick={goNextStepTwo}>
                Avanti
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <Card
            className="mx-auto shadow-sm border-0 rounded-4 text-center"
            style={{ maxWidth: "570px" }}
          >
            <Card.Body className="p-5">
              <BsStars className="text-warning fs-1 mb-3" />

              <h4 className="fw-bold mb-2">
                Stiamo cercando i piani migliori per te
              </h4>

              <p className="text-muted small mb-0">
                Analizziamo le tue risposte per proporti un piano Premium
                personalizzato.
              </p>
            </Card.Body>
          </Card>
        )}

        {step === 4 && (
          <div className="mx-auto" style={{ maxWidth: "1050px" }}>
            <div className="text-center mb-4">
            
              <h3 className="fw-bold">
                Scegli il piano Premium più adatto ai tuoi obiettivi
              </h3>

              <p className="text-muted">
                Inizia con 1 mese gratis. Puoi annullare quando vuoi.
              </p>

              <div className="mx-auto mt-4" style={{ maxWidth: "580px" }}>
                <ProgressBar
                  now={90}
                  variant="warning"
                  className="mb-1"
                  style={{ height: "8px" }}
                />

                <div className="d-flex justify-content-between small text-muted">
                  <span>Piano quasi pronto</span>
                  <span>90%</span>
                </div>
              </div>
            </div>

            <Row className="g-4 align-items-stretch">
              <Col xs={12} md={6}>
                <Card className="h-100 border-0 shadow-sm rounded-4">
                  <Card.Body className="p-4 d-flex flex-column h-100">
                    <h5 className="fw-bold mb-1">Premium Career</h5>

                    <p className="text-muted small">
                      Per trovare lavoro, migliorare il profilo e farti notare
                      dai recruiter.
                    </p>

                    <h4 className="fw-bold mb-3">
                      0 € <span className="fs-6 text-muted">per 1 mese</span>
                    </h4>

                    <ul className="small ps-3 mb-4">
                      <li>Scopri chi ha visitato il tuo profilo</li>
                      <li>Confrontati con altri candidati</li>
                      <li>Accesso a corsi e strumenti di crescita</li>
                      <li>Messaggi InMail inclusi</li>
                    </ul>

                    <div className="mt-auto">
                      <Button
                        variant="outline-primary"
                        className="rounded-pill w-100"
                      >
                        Scegli Career
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6}>
                <Card className="h-100 border-success shadow rounded-4">
                  <Card.Body className="p-4 d-flex flex-column h-100">
                    <Badge bg="success" className="rounded-pill mb-3 align-self-start">
                      Consigliato per te
                    </Badge>

                    <h5 className="fw-bold mb-1">Premium Business</h5>

                    <p className="text-muted small">
                      Per ampliare la rete, contattare persone fuori dai tuoi
                      collegamenti e creare nuove opportunità.
                    </p>

                    <h4 className="fw-bold mb-3">
                      0 € <span className="fs-6 text-muted">per 1 mese</span>
                    </h4>

                    <ul className="small ps-3 mb-4">
                      <li>Visualizzazioni profilo illimitate</li>
                      <li>Ricerca avanzata nella rete LinkedIn</li>
                      <li>Insight su aziende e profili</li>
                      <li>Più possibilità di contatto con InMail</li>
                    </ul>

                    <div className="mt-auto">
                      <Button className="rounded-pill w-100">
                        Prova 1 mese gratis
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="border-0 shadow-sm rounded-4 mt-4">
              <Card.Body className="p-4 text-center">
                <h5 className="fw-bold">Pronto a iniziare?</h5>

                <p className="text-muted small mb-3">
                  Nessun costo oggi. Ti invieremo un promemoria prima della fine
                  della prova gratuita.
                </p>

                <Button className="rounded-pill px-5">
                  Continua con Premium
                </Button>
              </Card.Body>
            </Card>
          </div>
        )}
      </Container>
    </Container>
  );
};

export default Premium;