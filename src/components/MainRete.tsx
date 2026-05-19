import { Button } from "react-bootstrap";
import { CardsRete } from "./CardsRete";

export const MainRete = () => {
  return (
    <section className="d-flex flex-column gap-3 mt-2">
      <article className="border rounded-2 border-secondary p-2">
        <div className="d-flex ">
          <div className="d-flex flex-column">
            <h5>Fai decollare la tua rete con le persone che conosci</h5>
            <p className="small text-muted">
              Hai 10 volte più probabilità di ottenere visualizzazioni dai
              recruiter se hai almeno 10 collegamenti
            </p>
            <a className="text-decoration-none fw-medium" href="#">
              Per saperne di più
            </a>
            <Button
              className="fw-medium rounded-5 small mt-4"
              style={{ maxWidth: "200px" }}
            >
              Importa contatti Gmail
            </Button>
          </div>
          <img src="https://placecats.com/100/50" alt="" />
        </div>
      </article>
      <article className=" d-flex justify-content-between border rounded-2 border-secondary p-2">
        <h6>Nessun invito in sospeso</h6>
        <span>Gestisci</span>
      </article>
      <article className="border rounded-2 border-secondary p-2">
        <div className="d-flex justify-content-between">
          <h6>
            Persone che potresti conoscere in base alla tua attività recente
          </h6>
          <span>Mostra tutto</span>
        </div>
        <CardsRete></CardsRete>
      </article>
    </section>
  );
};
