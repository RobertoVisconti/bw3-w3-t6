import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../redux/store";
import type { News } from "../interfaces/interfaces";
import { Container } from "react-bootstrap";
import formatDate from "./formatDate";
import BigCardPlaceholder from "./BigCardPlaceholder";

const DettaglioNotizia = function () {
  const params = useParams();
  const news = useSelector((state: RootState) => state.news.news);
  const notizia = news.find((notizia: News) => notizia.id === params.id);
  const navigate = useNavigate();

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  if (!notizia) return <BigCardPlaceholder/>
  return (
    <Container className="py-4">
      <div className="news-card">
        {notizia.image && (
          <img
            src={notizia.image}
            alt={notizia.title}
            className="news-card-img"
          />
        )}

        <div className="news-card-body">
          <div className="news-card-badges">
            {notizia.category.map((cat) => (
              <span key={cat} className="news-badge">
                {cat}
              </span>
            ))}
          </div>

          <h1 className="news-card-title">{notizia.title}</h1>
          <p className="news-card-desc">{notizia.description}</p>

          <hr className="news-divider" />

          <div className="news-card-footer">
            <div className="news-author">
              <div className="news-avatar">
                {getInitials(notizia.author || "?")}
              </div>
              <div>
                <p className="news-author-name">
                  {notizia.author || "Autore sconosciuto"}
                </p>
                <p className="news-author-date">
                  📅 {formatDate(notizia.published)}
                </p>
              </div>
            </div>
            <div>
              <button className="news-btn mx-2" onClick={() => navigate("/")}>
                ← Torna indietro
              </button>

              <button
                className="news-btn news-btn-primary"
                onClick={() => window.open(notizia.url, "_blank")}
              >
                Leggi articolo completo ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DettaglioNotizia;
