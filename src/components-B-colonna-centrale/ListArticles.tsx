import { useEffect, useMemo } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { getPost } from "../redux/actions/postActions";
import SingleArticle from "./SingleArticle";
import type { Post } from "../interfaces/interfaces";

const ListArticle = function () {
  const dispatch = useDispatch<AppDispatch>();

  const {
    posts = [],
    isLoading = false,
    error = null,
  } = useSelector((state: RootState) => state.post || {});

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  const randomPosts = useMemo(() => {
    if (!posts || posts.length === 0) return [];
    // eslint-disable-next-line react-hooks/purity
    return posts.toSorted(() => Math.random() - 0.5);
  }, [posts]);

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

        {!isLoading &&
          randomPosts.map((articolo: Post) => {
            return <SingleArticle key={articolo._id} post={articolo} />;
          })}

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
