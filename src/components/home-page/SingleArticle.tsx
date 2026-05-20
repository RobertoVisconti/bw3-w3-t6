import { useState, useEffect, useRef, type SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { SlOptions } from "react-icons/sl";
import { PiPlanetBold } from "react-icons/pi";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import type { Post, Comment } from "../../interfaces/interfaces";
import { FaRegThumbsUp, FaThumbsUp, FaTrashAlt, FaEdit } from "react-icons/fa";
import {
  IoCloseSharp,
  IoPaperPlaneOutline,
  IoRepeatSharp,
} from "react-icons/io5";
import { BiMessageSquareDetail as BiMessageIcon } from "react-icons/bi";
import {
  getComments,
  addComment,
  COMMENTS_LOADING,
  COMMENTS_ERROR,
} from "../../redux/actions/commentsActions";

// Importiamo l'action creator dal tuo file delle azioni dei post
import { deletePost } from "../../redux/actions/postActions";
import EmojiPickerButton from "../generali/emojiButton";

interface SingleArticleProps {
  post: Post;
}

const loggedEmail = localStorage.getItem("userEmail");
const EMPTY_ARRAY: Comment[] = [];

const SingleArticle = ({ post }: SingleArticleProps) => {
  // per l emoji
  const commentInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  // Stato locale per nascondere il post se appartiene ad un altro utente
  const [isHidden, setIsHidden] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  //Per il btn-segui quando viene cliccato
  const [seguito, setSegui] = useState(false);

  // Stati per il "Consiglia" (Like)
  const [isLiked, setIsLiked] = useState(false);
  const baseLikes = 14;
  const totalLikes = isLiked ? baseLikes + 1 : baseLikes;

  // Stati per la modifica dei commenti
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const commentsForPost = useSelector(
    (state: RootState) =>
      state.comments.commentsByPost[post._id] || EMPTY_ARRAY,
  );
  const { myProfile } = useSelector((state: RootState) => state.profile);

  // Controllo per verificare se il post è stato creato dall'utente loggato
  const isMyPost = post.user?._id === myProfile?._id;

  useEffect(() => {
    dispatch(getComments(post._id));
  }, [dispatch, post._id]);

  const postDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "Qualche giorno fa";

  // Richiama la funzione deletePost corretta del tuo file azioni
  const handleDeletePostClick = () => {
    dispatch(deletePost(post._id));
  };

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

  const handleUpdateComment = async (commentId: string) => {
    if (!editText.trim()) return;

    const BASE_URL = "https://striveschool-api.herokuapp.com/api/comments/";
    const TOKEN =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTBjMjkyYTc0MDQxZjAwMTUwYmZiMTgiLCJpYXQiOjE3NzkxODE4NjYsImV4cCI6MTc4MDM5MTQ2Nn0.0qFdvZ-BbLzKqRDhCriQJlGYCaWI79v44-waIIguaBk";

    dispatch({ type: COMMENTS_LOADING });
    try {
      const response = await fetch(`${BASE_URL}${commentId}`, {
        method: "PUT",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: editText,
          rate: 3,
          elementId: post._id,
        }),
      });

      if (response.ok) {
        const updatedComment = await response.json();
        dispatch({
          type: "UPDATE_COMMENT_SUCCESS",
          payload: { postId: post._id, comment: updatedComment },
        });
        setEditingCommentId(null);
        setEditText("");
      } else {
        throw new Error("Impossibile modificare il commento");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Errore nell'update";
      dispatch({ type: COMMENTS_ERROR, payload: msg });
    }
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

  const handleSharePost = () => alert("Post diffuso con successo!");
  const handleSendPost = () => alert("Post inviato ai tuoi collegamenti!");

  // Se l'utente decide di nascondere il post (non suo), non viene renderizzato nulla
  if (isHidden) return null;

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
        <div className="text-black d-flex gap-2 fs-5 align-items-center">
          <a href="#options" className="text-black d-flex align-items-center">
            <SlOptions size={16} />
          </a>

          {/* Gestione dinamica del tasto X */}
          {isMyPost ? (
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="left"
              overlay={
                <Popover
                  id={`popover-delete-post-${post._id}`}
                  className="shadow-sm border-secondary-subtle"
                >
                  <Popover.Body
                    className="p-2 text-center"
                    style={{ minWidth: "150px" }}
                  >
                    <p className="m-0 mb-2 small fw-semibold text-dark">
                      Eliminare il post?
                    </p>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        size="sm"
                        variant="danger"
                        className="py-0 px-2 small"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleDeletePostClick();
                          document.body.click(); // Chiude il popover di Bootstrap immediatamente
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
                className="btn btn-link text-black p-0 border-0 d-flex align-items-center"
                title="Elimina definitivamente il tuo post"
              >
                <IoCloseSharp />
              </button>
            </OverlayTrigger>
          ) : (
            <button
              className="btn btn-link text-black p-0 border-0 d-flex align-items-center"
              title="Nascondi post"
              onClick={() => setIsHidden(true)}
            >
              <IoCloseSharp />
            </button>
          )}
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
        {/* Il bottone segui è stato rimosso con successo */}
        <button
          className={`btn-segui ${seguito ? "seguito" : ""}`}
          onClick={() => setSegui(!seguito)}
        >
          {seguito ? "✓ Seguito" : "+ Segui"}
        </button>
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
          <span>{totalLikes} Consiglia</span>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setShowComments(!showComments)}
          className="hover-underline"
        >
          <span>
            {commentsForPost.length}{" "}
            {commentsForPost.length === 1 ? "commento" : "commenti"}
          </span>
        </div>
      </div>

      {/* Pulsanti di Interazione */}
      <div className="d-flex justify-content-between py-1 border-bottom">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`btn btn-light btn-sm flex-fill d-flex align-items-center justify-content-center gap-2 border-0 bg-transparent py-2 custom-action-btn ${isLiked ? "text-primary" : "text-secondary"}`}
        >
          {isLiked ? <FaThumbsUp size={18} /> : <FaRegThumbsUp size={18} />}
          <span className="fw-semibold">Consiglia</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className={`btn btn-light btn-sm flex-fill d-flex align-items-center justify-content-center gap-2 border-0 bg-transparent py-2 custom-action-btn ${showComments ? "text-primary" : "text-secondary"}`}
        >
          <BiMessageIcon size={18} />{" "}
          <span className="fw-semibold">Commenta</span>
        </button>

        <button
          onClick={handleSharePost}
          className="btn btn-light btn-sm flex-fill text-secondary d-flex align-items-center justify-content-center gap-2 border-0 bg-transparent py-2 custom-action-btn"
        >
          <IoRepeatSharp size={18} />{" "}
          <span className="fw-semibold">Diffondi</span>
        </button>

        <button
          onClick={handleSendPost}
          className="btn btn-light btn-sm flex-fill text-secondary d-flex align-items-center justify-content-center gap-2 border-0 bg-transparent py-2 custom-action-btn"
        >
          <IoPaperPlaneOutline size={18} />{" "}
          <span className="fw-semibold">Invia</span>
        </button>
      </div>

      {/* Sezione Commenti */}
      {showComments && (
        <div className="comments-section mt-3 pt-2">
          <div className="d-flex gap-2 mb-3 align-items-start">
            <img
              src={myProfile?.image || "https://placecats.com/35/35"}
              alt="Mio avatar"
              className="rounded-circle"
              style={{ width: "35px", height: "35px", objectFit: "cover" }}
            />
            <Form
              onSubmit={handleCommentSubmit}
              className="flex-grow-1 d-flex align-items-center gap-1 bg-light rounded-4 px-3 py-1 border border-secondary-subtle"
            >
              <Form.Control
                ref={commentInputRef}
                type="text"
                placeholder="Aggiungi un commento..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="border-0 bg-transparent p-1 text-dark shadow-none flex-grow-1"
                style={{ fontSize: "0.9rem" }}
              />

              <EmojiPickerButton
                text={newCommentText}
                setText={setNewCommentText}
                inputRef={commentInputRef}
              />

              <Button
                type="submit"
                variant="transparent"
                disabled={!newCommentText.trim()}
                className="border-0 text-primary p-1 d-flex align-items-center"
              >
                <IoPaperPlaneOutline size={16} />
              </Button>
            </Form>
          </div>

          <div className="comments-list d-flex flex-column gap-2">
            {commentsForPost.map((commento: Comment) => {
              const isMyComment =
                commento.author === myProfile?.email ||
                commento.author === loggedEmail ||
                commento.author === "robertovisconti93+epicode@gmail.com";

              const isEditing = editingCommentId === commento._id;

              return (
                <div
                  key={commento._id}
                  className="d-flex gap-2 align-items-start p-2 rounded-3 bg-light"
                >
                  <img
                    src={
                      isMyComment
                        ? myProfile?.image || "https://placecats.com/60/60"
                        : "https://placecats.com/60/60"
                    }
                    alt="Avatar commentatore"
                    className="rounded-circle"
                    style={{
                      width: "32px",
                      height: "32px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="flex-grow-1 position-relative">
                    <div className="d-flex flex-column bg-white p-2 rounded-3 border border-light shadow-xs">
                      <span className="fw-bold small text-dark">
                        {commento.author
                          ? commento.author.replace(
                              "robertovisconti93+epicode@gmail.com",
                              "Roberto Visconti",
                            )
                          : "Utente Anonimo"}
                      </span>
                      <span
                        className="text-secondary"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {new Date(commento.createdAt).toLocaleDateString()}
                      </span>

                      {isEditing ? (
                        <div className="mt-2">
                          <Form.Control
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="rounded-4 bg-light border-secondary-subtle py-2 text-dark mb-2"
                            style={{ fontSize: "0.9rem" }}
                            autoFocus
                          />
                          <div className="d-flex gap-2 justify-content-end align-items-center">
                            <Button
                              size="sm"
                              variant="success"
                              className="rounded-5 px-3 fw-semibold py-1"
                              style={{ fontSize: "0.8rem" }}
                              onClick={() => handleUpdateComment(commento._id)}
                            >
                              Salva
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="rounded-5 px-3 fw-semibold py-1"
                              style={{ fontSize: "0.8rem" }}
                              onClick={() => setEditingCommentId(null)}
                            >
                              Annulla
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p
                          className="m-0 mt-1 text-dark small"
                          style={{ wordBreak: "break-word" }}
                        >
                          {commento.comment}
                        </p>
                      )}
                    </div>

                    {isMyComment && !isEditing && (
                      <div className="position-absolute end-0 top-0 m-1 d-flex gap-1">
                        <button
                          className="btn btn-link text-secondary p-1 border-0"
                          onClick={() => {
                            setEditingCommentId(commento._id);
                            setEditText(commento.comment);
                          }}
                          title="Modifica commento"
                        >
                          <FaEdit size={14} />
                        </button>

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
                                    className="py-0 px-2 small"
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
                          <button className="btn btn-link text-danger p-1 border-0">
                            <FaTrashAlt size={14} />
                          </button>
                        </OverlayTrigger>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleArticle;
