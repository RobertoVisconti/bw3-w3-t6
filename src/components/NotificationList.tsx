import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import type { Profile, Comment } from "../interfaces/interfaces";
import { removeProfile } from "../redux/actions/reteActions";

interface RootState {
  rete: {
    listaRete: Profile[];
  };
  comments: {
    commentsByPost: Record<string, Comment[]>;
  };
}

type NotificaItem =
  | { tipo: "connessione"; data: Profile; dataOrdinamento: Date }
  | {
      tipo: "commento";
      data: Comment & { postId: string };
      dataOrdinamento: Date;
    };

const NotificationList = () => {
  const dispatch = useDispatch();

  const [hiddenCommentIds, setHiddenCommentIds] = useState<string[]>([]);
  const [visibiliCount, setVisibiliCount] = useState<number>(7);

  const listaNotifiche = useSelector((state: RootState) => {
    const contatti: NotificaItem[] = (state.rete.listaRete || []).map(
      (utente) => ({
        tipo: "connessione",
        data: utente,
        dataOrdinamento: utente.createdAt
          ? new Date(utente.createdAt)
          : new Date(),
      }),
    );

    const tuttiICommenti: NotificaItem[] = Object.entries(
      state.comments.commentsByPost || {},
    ).flatMap(([postId, commentsList]) =>
      commentsList
        .filter((commento) => !hiddenCommentIds.includes(commento._id))
        .map((commento) => ({
          tipo: "commento",
          data: { ...commento, postId },
          dataOrdinamento: commento.createdAt
            ? new Date(commento.createdAt)
            : new Date(),
        })),
    );

    return [...contatti, ...tuttiICommenti].sort(
      (a, b) => b.dataOrdinamento.getTime() - a.dataOrdinamento.getTime(),
    );
  });

  const notificheVisualizzate = listaNotifiche.slice(0, visibiliCount);

  // cambio visualizzazzione autore commento
  const formattaNomeAutore = (authorString: string) => {
    if (!authorString) return "Utente LinkedIn";

    const mioUsernameEpicode = "roberto.visconti+epicode@gmail.com";
    if (authorString.toLowerCase() === mioUsernameEpicode.toLowerCase()) {
      return "Roberto Visconti";
    }

    if (authorString.includes("@")) {
      const partePrincipale = authorString.split(/[+@]/)[0];
      const pezzi = partePrincipale.split(".");
      return pezzi
        .map((pezzo) => pezzo.charAt(0).toUpperCase() + pezzo.slice(1))
        .join(" ");
    }

    const pulito = authorString.replace("+epicode", "");
    return pulito.charAt(0).toUpperCase() + pulito.slice(1);
  };

  const formattaData = (dateString?: string) => {
    if (!dateString) return "Ora";
    const data = new Date(dateString);

    return data.toLocaleString("it-IT", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white border-card-linkedin rounded-3 mb-2">
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

      {/* Lista Dinamica Commenti + Collegati*/}
      <div className="d-flex flex-column">
        {notificheVisualizzate.length === 0 ? (
          <div className="p-5 text-center text-muted">
            <i className="fas fa-bell fs-1 mb-3 text-opacity-50 text-secondary"></i>
            <p className="mb-0 fw-medium">Non hai ancora nessuna notifica.</p>
            <small>
              I nuovi collegamenti e i commenti ai post appariranno qui.
            </small>
          </div>
        ) : (
          notificheVisualizzate.map((item, index) => {
            if (item.tipo === "connessione") {
              const utente = item.data;
              return (
                <div
                  key={`connessione-${utente._id}-${index}`}
                  className="p-3 border-bottom d-flex align-items-start gap-3 position-relative hover-bg-light"
                  style={{ transition: "background-color 0.2s" }}
                >
                  <Image
                    src={utente.image || "https://placecats.com/100/100"}
                    roundedCircle
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                    }}
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
                    <span
                      className="text-muted small"
                      style={{ fontSize: "11px" }}
                    >
                      {utente.createdAt
                        ? formattaData(utente.createdAt)
                        : "Ora"}
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
              );
            } else {
              const commento = item.data;
              return (
                <div
                  key={`commento-${commento._id}-${index}`}
                  className="p-3 border-bottom d-flex align-items-start gap-3 position-relative hover-bg-light"
                  style={{ transition: "background-color 0.2s" }}
                >
                  <div
                    className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center text-primary"
                    style={{ width: "48px", height: "48px", minWidth: "48px" }}
                  >
                    <i className="fas fa-comment-alt fs-5"></i>
                  </div>

                  <div className="flex-grow-1 pe-4">
                    <div className="d-flex align-items-baseline gap-1 flex-wrap">
                      <h6 className="mb-0 fw-bold text-dark">
                        {formattaNomeAutore(commento.author)}
                      </h6>
                      <span
                        className="small text-muted text-opacity-75"
                        style={{ fontSize: "11px" }}
                      >
                        • ha commentato un post
                      </span>
                    </div>

                    <p
                      className="small text-dark mb-1 mt-1 p-2 rounded-2 bg-light"
                      style={{
                        fontSize: "13px",
                        lineHeight: "1.4",
                        borderLeft: "3px solid #0a66c2",
                      }}
                    >
                      "{commento.comment}"
                    </p>

                    <span
                      className="text-muted d-block"
                      style={{ fontSize: "11px" }}
                    >
                      <i className="far fa-clock me-1"></i>
                      {formattaData(commento.createdAt)}
                    </span>
                  </div>

                  <div className="d-flex flex-column align-items-end justify-content-between h-100">
                    <span
                      className="text-muted small"
                      style={{ fontSize: "11px", whiteSpace: "nowrap" }}
                    >
                      {formattaData(commento.createdAt)}
                    </span>

                    <Button
                      className="bg-transparent border-0 p-1 text-secondary text-opacity-75"
                      onClick={() =>
                        setHiddenCommentIds((prev) => [...prev, commento._id])
                      }
                      title="Nascondi notifica"
                    >
                      <i className="fas fa-times fs-5 hover-text-danger"></i>
                    </Button>
                  </div>
                </div>
              );
            }
          })
        )}

        {listaNotifiche.length > visibiliCount && (
          <div className="p-2 d-flex justify-content-center bg-light border-top rounded-bottom-3">
            <Button
              variant="link"
              className="text-decoration-none fw-bold text-secondary text-opacity-75 w-100 py-1 hover-text-dark"
              onClick={() => setVisibiliCount((prev) => prev + 7)}
            >
              Mostra altro <i className="fas fa-chevron-down ms-1 fs-6"></i>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
