import { useState, useEffect, type SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { SlOptions } from "react-icons/sl";
import { IoMdAdd } from "react-icons/io";
import { PiPlanetBold } from "react-icons/pi";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import type { Post, Comment } from "../interfaces/interfaces";
import { FaRegThumbsUp, FaTrashAlt } from "react-icons/fa";
import {
  IoCloseSharp,
  IoPaperPlaneOutline,
  IoRepeatSharp,
} from "react-icons/io5";
import { BiMessageSquareDetail } from "react-icons/bi";
import {
  getComments,
  addComment,
  COMMENTS_LOADING,
  COMMENTS_ERROR,
} from "../redux/actions/commentsActions";

interface SingleArticleProps {
  post: Post;
}

// email per il delete
const loggedEmail = localStorage.getItem("userEmail");

// impedisco a react di creare un nuovo array
const EMPTY_ARRAY: Comment[] = [];

const SingleArticle = ({ post }: SingleArticleProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  // Usiamo la costante esterna come fallback sicuro
  const commentsForPost = useSelector(
    (state: RootState) =>
      state.comments.commentsByPost[post._id] || EMPTY_ARRAY,
  );
  const { myProfile } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (showComments) {
      dispatch(getComments(post._id));
    }
  }, [dispatch, showComments, post._id]);

  const postDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "Qualche giorno fa";

  const handleCommentSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const commentPayload = {
      comment: newCommentText,
      rate: 3,
      elementId: post._id,
    };

    await dispatch(addComment(commentPayload));

    setNewCommentText("");
  };

  const handleDeleteComment = async (commentId: string) => {
    const BASE_URL = "https://striveschool-api.herokuapp.com/api/comments/";
    const TOKEN =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTBjMjkyYTc0MDQxZjAwMTUwYmZiMTgiLCJpYXQiOjE3NzkxODE4NjYsImV4cCI6MTc4MDM5MTQ2Nn0.0qFdvZ-BbLzKqRDhCriQJlGYCaWI79v44-waIIguaBk";

    dispatch({ type: COMMENTS_LOADING });
    try {
      const response = await fetch(`${BASE_URL}${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: TOKEN,
        },
      });

      if (response.ok) {
        // INVECE di getComments, rimuoviamo il commento dallo stato locale di Redux all'istante!
        dispatch({
          type: "DELETE_COMMENT_SUCCESS",
          payload: { postId: post._id, commentId: commentId },
        });
      } else {
        throw new Error("Impossibile eliminare il commento");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Errore nel delete";
      dispatch({ type: COMMENTS_ERROR, payload: msg });
    }
  };

  return (
    <div className="bg-white rounded-3 p-3 my-3 border border-light shadow-sm">
      {/* Intestazione del post */}
      <div className="d-flex justify-content-between align-items-center py-2 border-bottom mb-3">
        <div className="d-flex align-items-center">
          <img
            src={post.user?.image || "https://placecats.com/35/35"}
            alt="img-profile-friend"
            className="rounded-circle"
            style={{ width: "35px", height: "35px", objectFit: "cover" }}
          />
          <p className="m-0 ms-2 small">
            <span className="fw-bold">
              {post.user?.name} {post.user?.surname}
            </span>{" "}
            ha diffuso questo post
          </p>
        </div>
        <div className="text-black d-flex gap-2 fs-5">
          <a href="#options" className="text-black">
            <SlOptions />
          </a>
          <a href="#close" className="text-black">
            <IoCloseSharp />
          </a>
        </div>
      </div>

      {/* Info Autore dell'articolo */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2 border-0">
          <img
            src={post.user?.image || "https://placecats.com/60/60"}
            alt="avatar autore"
            className="rounded-circle"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <div className="d-flex flex-column">
            <span className="fw-bold">
              {post.user?.name} {post.user?.surname}
            </span>
            <span className="text-secondary small">
              {post.user?.title || "Professionista su LinkedIn"}
            </span>
            <span className="text-secondary small d-flex align-items-center gap-1">
              <span>{postDate}</span>
              <span className="text-black d-flex align-items-center">
                · <PiPlanetBold className="ms-1" />
              </span>
            </span>
          </div>
        </div>
        <div>
          <Button
            variant="outline-primary"
            className="rounded-5 btn-sm fw-bold"
          >
            <IoMdAdd className="me-1" /> Segui
          </Button>
        </div>
      </div>

      {/* Contenuto del Post */}
      <div className="post-content mb-3">
        <p
          className="text-dark"
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {post.text}
        </p>

        {post.image && (
          <img
            src={post.image}
            alt="Post media attachment"
            className="w-100 rounded-3 mt-2"
          />
        )}
      </div>

      {/* Barra dei Contatori */}
      <div className="d-flex justify-content-between text-muted small px-1 pb-2 border-bottom">
        <div className="d-flex align-items-center gap-1">
          <span
            className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "16px", height: "16px" }}
          >
            <FaRegThumbsUp size={10} className="text-white" />
          </span>
          <span>14 Consiglia</span>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setShowComments(!showComments)}
        >
          <span>
            {commentsForPost.length}{" "}
            {commentsForPost.length === 1 ? "commento" : "commenti"}
          </span>
        </div>
      </div>

      {/* Pulsanti di Interazione */}
      <div className="d-flex justify-content-between py-1 border-bottom">
        <button className="btn btn-light btn-sm flex-fill text-secondary d-flex align-items-center justify-content-center gap-2 border-0 bg-transparent py-2 custom-action-btn">
          <FaRegThumbsUp size={18} />{" "}
          <span className="fw-semibold">Consiglia</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className={`btn btn-light btn-sm flex-fill d-flex align-items-center justify-content-center gap-2 border-0 bg-transparent py-2 custom-action-btn ${showComments ? "text-primary" : "text-secondary"}`}
        >
          <BiMessageSquareDetail size={18} />{" "}
          <span className="fw-semibold">Commenta</span>
        </button>
        <button className="btn btn-light btn-sm flex-fill text-secondary d-flex align-items-center justify-content-center gap-2 border-0 bg-transparent py-2 custom-action-btn">
          <IoRepeatSharp size={18} />{" "}
          <span className="fw-semibold">Diffondi</span>
        </button>
        <button className="btn btn-light btn-sm flex-fill text-secondary d-flex align-items-center justify-content-center gap-2 border-0 bg-transparent py-2 custom-action-btn">
          <IoPaperPlaneOutline size={18} />{" "}
          <span className="fw-semibold">Invia</span>
        </button>
      </div>

      {/* Sezione Commenti */}
      {showComments && (
        <div className="comments-section mt-3 pt-2">
          {/* Input Nuovo Commento */}
          <div className="d-flex gap-2 mb-3 align-items-start">
            <img
              src={myProfile?.image || "https://placecats.com/35/35"}
              alt="Mio avatar"
              className="rounded-circle"
              style={{ width: "35px", height: "35px", objectFit: "cover" }}
            />
            <Form
              onSubmit={handleCommentSubmit}
              className="flex-grow-1 position-relative"
            >
              <Form.Control
                type="text"
                placeholder="Aggiungi un commento..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="rounded-4 bg-light border-secondary-subtle pe-5 py-2 text-dark"
                style={{ fontSize: "0.9rem" }}
              />
              <Button
                type="submit"
                variant="transparent"
                disabled={!newCommentText.trim()}
                className="position-absolute end-0 top-50 translate-middle-y border-0 text-primary p-2 d-flex align-items-center"
              >
                <IoPaperPlaneOutline size={16} />
              </Button>
            </Form>
          </div>

          {/* Rendering della lista dei commenti */}
          <div className="comments-list d-flex flex-column gap-2">
            {commentsForPost.map((commento: Comment) => (
              <div
                key={commento._id}
                className="d-flex gap-2 align-items-start p-2 rounded-3 bg-light"
              >
                <img
                  src={myProfile?.image || "https://placecats.com/60/60"}
                  alt="Avatar commentatore"
                  className="rounded-circle"
                  style={{ width: "32px", height: "32px", objectFit: "cover" }}
                />
                <div className="flex-grow-1 position-relative">
                  <div className="d-flex flex-column bg-white p-2 rounded-3 border border-light shadow-xs">
                    <span className="fw-bold small text-dark">
                      {commento.author.replace(
                        "robertovisconti93+epicode@gmail.com",
                        "Roberto Visconti",
                      )}
                    </span>
                    <span
                      className="text-secondary"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {new Date(commento.createdAt).toLocaleDateString()}
                    </span>
                    <p
                      className="m-0 mt-1 text-dark small"
                      style={{ wordBreak: "break-word" }}
                    >
                      {commento.comment}
                    </p>
                  </div>
                  {((myProfile && commento.author === myProfile.email) ||
                    commento.author === loggedEmail ||
                    commento.author ===
                      "robertovisconti93+epicode@gmail.com") && (
                    <OverlayTrigger
                      trigger="click"
                      rootClose
                      placement="left"
                      overlay={
                        <Popover
                          id={`popover-delete-${commento._id}`}
                          className="shadow-sm border-secondary-subtle"
                        >
                          <Popover.Body
                            className="p-2 text-center"
                            style={{ minWidth: "140px" }}
                          >
                            <p className="m-0 mb-2 small fw-semibold text-dark">
                              Eliminare?
                            </p>
                            <div className="d-flex gap-2 justify-content-center">
                              <Button
                                size="sm"
                                variant="danger"
                                className="py-0 px-2 small backend-del-btn"
                                onClick={() => {
                                  handleDeleteComment(commento._id);
                                  document.body.click();
                                }}
                              >
                                Sì
                              </Button>
                              <Button
                                size="sm"
                                variant="light"
                                className="py-0 px-2 small border"
                                onClick={() => document.body.click()}
                              >
                                No
                              </Button>
                            </div>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <button
                        className="btn btn-link text-danger position-absolute end-0 top-0 m-1 p-1 border-0 custom-trash-btn"
                        style={{ cursor: "pointer" }}
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </OverlayTrigger>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleArticle;
