import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const PaginaErrore = () => {
  return (
    <div className="text-center mt-3">
      <img src="/Error_404.png" alt="Pagina non trovata" />
      <h5>Questa pagina non esiste</h5>
      <p className="text-muted small mb-1">
        Controlla l'URL o torna alla home page di LinkedIn.
      </p>
      <Link to="/Feed">
        <Button className=" text-primary bg-transparent rounded-pill mt-2 mb-4 fw-bold border-1">
          Vai al tuo feed
        </Button>
      </Link>
    </div>
  );
};
