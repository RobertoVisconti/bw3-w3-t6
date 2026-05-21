import { Col } from "react-bootstrap";

// Parte del footer con opzioni e i loghi del footer profile

export const FooterOpzioniLink = () => {
  return (
    <Col xs={12} lg={6}>
      <div className=" d-flex ">
        <i className="m-1 fs-4 fas fa-question-circle text-secondary"></i>
        <div>
          <div className="fw-medium small">Domande?</div>

          <span className="small">Visita il nostro Centro assistenza</span>
        </div>
      </div>
      <div className=" d-flex">
        <i className="m-1 fs-4 fas fa-cog text-secondary"></i>
        <div>
          <div className="fw-medium small">
            Gestisci il tuo account e la tua privacy
          </div>{" "}
          <span className="small">Vai alle impostazioni</span>
        </div>
      </div>
      <div className=" d-flex">
        <i className="m-1 fs-4 fas fa-shield-alt text-secondary"></i>
        <div>
          {" "}
          <div className="fw-medium small">
            Trasparenza sui contenuti consigliati
          </div>{" "}
          <span className="small">Scopri di più sui contenuti consigliati</span>
        </div>
      </div>
    </Col>
  );
};
