import { Button } from "react-bootstrap";
import { CardsCollegati } from "./CardsCollegati";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export const MainRete = () => {
  const [cardsVisibleCount, setCardsVisibleCount] = useState(20);
  const [isCardsLoading, setIsCardsLoading] = useState(false);

  const cardsObserverRef = useRef<HTMLDivElement | null>(null);

  const { allProfiles = [] } = useSelector(
    (state: RootState) => state.profile || {},
  );
  const totalProfilesAvailable = allProfiles.length;

  useEffect(() => {
    if (isCardsLoading || totalProfilesAvailable === 0) return;

    const currentRef = cardsObserverRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (cardsVisibleCount < totalProfilesAvailable) {
            setIsCardsLoading(true);

            setTimeout(() => {
              setCardsVisibleCount((prev) => prev + 20);
              setIsCardsLoading(false);
            }, 1000);
          }
        }
      },
      { threshold: 0.1 },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isCardsLoading, cardsVisibleCount, totalProfilesAvailable]);

  return (
    <section className="d-flex flex-column gap-3 mt-2">
      <article className="border rounded-2 border-secondary p-2">
        <div className="d-flex justify-content-between">
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
          <div>
            <img src="https://placecats.com/100/100" alt="" />
          </div>
        </div>
      </article>
      <article className=" d-flex justify-content-between border rounded-2 border-secondary p-2">
        <h6>Nessun invito in sospeso</h6>
        <span>Gestisci</span>
      </article>
      <article className="border rounded-2 border-secondary p-3 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6>
            Persone che potresti conoscere in base alla tua attività recente
          </h6>
          <a
            href="#"
            className="text-decoration-none text-secondary text-nowrap"
          >
            Mostra tutto
          </a>
        </div>
        <CardsCollegati />
      </article>
      <article className="border rounded-2 border-secondary p-2">
        <div className="d-flex justify-content-between">
          <h6>Popolare su Linkedin</h6>
          <a
            href="#"
            className="text-decoration-none text-secondary text-nowrap"
          >
            Mostra tutto
          </a>
        </div>
        <CardsCollegati collegati={false} />
      </article>
      <article className="border rounded-2 border-secondary p-2">
        <h6>Suggeriti per te</h6>
        <CardsCollegati limit={cardsVisibleCount} />
        {isCardsLoading && (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </div>
          </div>
        )}

        {!isCardsLoading && cardsVisibleCount < totalProfilesAvailable && (
          <div
            ref={cardsObserverRef}
            style={{ height: "20px", background: "transparent" }}
          />
        )}
      </article>
    </section>
  );
};
