import { Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import type { Profile } from "../interfaces/interfaces";
import { removeProfile } from "../redux/actions/reteActions";

interface RootState {
  rete: {
    listaRete: Profile[];
  };
}

const NotificationList = () => {
  const dispatch = useDispatch();

  const listaContatti = useSelector((state: RootState) => state.rete.listaRete);

  return (
    <div className="bg-white border-card-linkedin rounded-3 mb-2">
      {/* Filtri Superiori */}
      <div className="p-3 border-bottom d-flex gap-2 align-items-center flex-wrap">
        <Button
          variant="success"
          className="rounded-5 px-3 py-1 bg-opacity-10 fw-medium btn-sm"
        >
          Tutto
        </Button>
        <Button
          variant="outline-secondary"
          className="text-dark border-secondary border-opacity-50 rounded-5 px-3 py-1 btn-sm fw-medium"
        >
          Lavoro
        </Button>
        <Button
          variant="outline-secondary"
          className="text-dark border-secondary border-opacity-50 rounded-5 px-3 py-1 btn-sm fw-medium"
        >
          I miei post
        </Button>
        <Button
          variant="outline-secondary"
          className="text-dark border-secondary border-opacity-50 rounded-5 px-3 py-1 btn-sm fw-medium"
        >
          Menzioni
        </Button>
      </div>

      {/* Lista Dinamica degli Utenti Rete */}
      <div className="d-flex flex-column">
        {listaContatti.length === 0 ? (
          <div className="p-5 text-center text-muted">
            <i className="fas fa-user-friends fs-1 mb-3 text-opacity-50 text-secondary"></i>
            <p className="mb-0 fw-medium">
              Non hai ancora aggiunto nessun utente alla tua rete.
            </p>
            <small>
              Clicca su "Segui" o "Collegati" dalle card per vederli apparire
              qui.
            </small>
          </div>
        ) : (
          listaContatti.map((utente: Profile) => (
            <div
              key={utente._id}
              className="p-3 border-bottom d-flex align-items-start gap-3 position-relative hover-bg-light"
              style={{ transition: "background-color 0.2s" }}
            >
              <Image
                src={utente.image || "https://placecats.com/100/100"}
                roundedCircle
                style={{ width: "48px", height: "48px", objectFit: "cover" }}
                alt={`${utente.name} avatar`}
              />

              <div className="flex-grow-1 pe-4">
                <div className="d-flex align-items-baseline gap-1 flex-wrap">
                  <h6 className="mb-0 fw-bold text-dark hover-underline cursor-pointer">
                    {utente.name} {utente.surname}
                  </h6>
                  <span
                    className="small text-muted text-opacity-75"
                    style={{ fontSize: "11px" }}
                  >
                    • ti sei collegato di recente
                  </span>
                </div>

                <p
                  className="small text-muted mb-1"
                  style={{ fontSize: "13px", lineHeight: "1.4" }}
                >
                  {utente.title}
                </p>

                {utente.area && (
                  <span
                    className="text-muted d-block"
                    style={{ fontSize: "12px" }}
                  >
                    <i className="fas fa-map-marker-alt me-1 text-opacity-50"></i>{" "}
                    {utente.area}
                  </span>
                )}
              </div>

              <div className="d-flex flex-column align-items-end justify-content-between h-100">
                <span className="text-muted small" style={{ fontSize: "11px" }}>
                  Ora
                </span>

                <Button
                  className="bg-transparent border-0 p-1 text-secondary text-opacity-75"
                  onClick={() => dispatch(removeProfile(utente._id))}
                  title="Rimuovi dalla rete"
                >
                  <i className="fas fa-times fs-5 hover-text-danger"></i>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationList;
