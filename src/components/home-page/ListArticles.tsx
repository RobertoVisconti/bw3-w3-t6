import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { getPost } from "../../redux/actions/postActions";
import { Col } from "react-bootstrap";
import SingleArticle from "./SingleArticle";
import type { Post } from "../../interfaces/interfaces";

const ListArticle = function () {
  const dispatch = useDispatch<AppDispatch>();

  const {
    posts = [],
    isLoading = false,
    error = null,
  } = useSelector((state: RootState) => state.post || {});

  const [visibleCount, setVisibleCount] = useState(5);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(5);
  }, [posts]);

  const chronologicalPosts = useMemo(() => {
    if (!posts || posts.length === 0) return [];

    return [...posts].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA; // così renderizzo l ultimo post creato in cima alla pagina
    });
  }, [posts]);

  const displayedPosts = useMemo(() => {
    return chronologicalPosts.slice(0, visibleCount);
  }, [chronologicalPosts, visibleCount]);

  useEffect(() => {
    if (isLoading || isLocalLoading || chronologicalPosts.length === 0) return;

    const currentRef = observerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (visibleCount < chronologicalPosts.length) {
            setIsLocalLoading(true);

            // Ritardo di 1 secondo prima di mostrare i nuovi post
            setTimeout(() => {
              setVisibleCount((prev) => prev + 5);
              setIsLocalLoading(false);
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
  }, [isLoading, isLocalLoading, chronologicalPosts.length, visibleCount]);

  return (
    <Col className="my-3 rounded-2 p-0">
      <div>
        {isLoading && (
          <div className="text-center my-4 text-secondary">
            Caricamento del feed in corso...
          </div>
        )}

        {error && (
          <div className="alert alert-danger my-3" role="alert">
            {error}
          </div>
        )}

        {/* Renderizzazione dei post attuali */}
        {displayedPosts.map((articolo: Post) => {
          return <SingleArticle key={articolo._id} post={articolo} />;
        })}

        {/* Spinner ogni 5 post */}
        {isLocalLoading && (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </div>
          </div>
        )}

        {!isLoading &&
          !isLocalLoading &&
          visibleCount < chronologicalPosts.length && (
            <div
              ref={observerRef}
              style={{ height: "30px", background: "transparent" }}
            />
          )}

        {/* Messaggio se l'array è vuoto */}
        {!isLoading && posts.length === 0 && !error && (
          <div className="text-center my-4 text-muted">
            Nessun post da mostrare nella timeline.
          </div>
        )}
      </div>
    </Col>
  );
};

export default ListArticle;
