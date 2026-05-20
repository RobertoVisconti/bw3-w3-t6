import { useState, useRef } from "react";
import { Col, FormControl, Modal, Button } from "react-bootstrap";
import { PiVideoFill, PiArticleBold, PiXBold } from "react-icons/pi";
import { AiFillPicture } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { createPost, uploadPostImage } from "../redux/actions/postActions";
import type { Post } from "../interfaces/interfaces";
import { BsCalendarEvent, BsChevronDown, BsClockHistory } from "react-icons/bs";
import { FaAward } from "react-icons/fa";
import EmojiPickerButton from "./emojiButton";

const FormPost = function () {
  const emojiPostRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { myProfile } = useSelector((state: RootState) => state.profile);

  const [showModal, setShowModal] = useState(false);
  const [postText, setPostText] = useState("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setShowModal(false);
    setPostText("");
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleShow = () => setShowModal(true);

  // Gestore della selezione del file dal computer
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handlePublish = async () => {
    if (postText.trim() === "") return;

    if (!myProfile) {
      console.error("Profilo non caricato. Impossibile pubblicare.");
      return;
    }

    try {
      const newPost = await (dispatch(
        createPost({ text: postText }, myProfile),
      ) as unknown as Promise<Post | null>);

      if (newPost && newPost._id && selectedImage) {
        await dispatch(uploadPostImage(newPost._id, selectedImage, myProfile));
      }

      handleClose();
    } catch (error) {
      console.error("Errore durante la pubblicazione:", error);
    }
  };

  return (
    <>
      <div
        className="justify-content-center mt-3 rounded-2 bg-white"
        style={{ border: "1px solid black", overflow: "hidden" }}
      >
        <Col className="d-flex flex-column pt-2 px-3" xs={12}>
          <div className="d-flex justify-content-center align-items-center gap-2 w-100">
            <img
              src={myProfile?.image || "https://placecats.com/60/60"}
              alt="img-profile"
              className="rounded-circle"
              style={{ width: "48px", height: "48px", objectFit: "cover" }}
            />
            <FormControl
              type="text"
              id="input-post"
              placeholder="Crea un post"
              className="rounded-5 w-100 px-3 border"
              style={{
                height: "48px",
                backgroundColor: "#f4f4f4",
                cursor: "pointer",
              }}
              onClick={handleShow}
              readOnly
            />
          </div>
          <div className="d-flex justify-content-around py-2 mt-2 border-top">
            <button
              onClick={handleShow}
              className="btn btn-link text-secondary text-decoration-none d-flex align-items-center gap-2 fw-semibold border-0 p-2"
            >
              <AiFillPicture className="fs-4 text-primary" />
              <span className="small text-dark">Contenuti multimediali</span>
            </button>
            <button
              onClick={handleShow}
              className="btn btn-link text-secondary text-decoration-none d-flex align-items-center gap-2 fw-semibold border-0 p-2"
            >
              <PiVideoFill className="fs-4 text-success" />
              <span className="small text-dark">Video</span>
            </button>
            <button
              onClick={handleShow}
              className="btn btn-link text-secondary text-decoration-none d-flex align-items-center gap-2 fw-semibold border-0 p-2"
            >
              <PiArticleBold className="fs-4 text-danger" />
              <span className="small text-dark">Scrivi un articolo</span>
            </button>
          </div>
        </Col>
      </div>

      {/* MODALE PER IL POST */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        {/* Header pulito solo con la X di chiusura */}
        <Modal.Header closeButton className="border-0 pb-0"></Modal.Header>

        <Modal.Body
          className="pt-0 d-flex flex-column"
          style={{ minHeight: "300px" }}
        >
          {/* Info Profilo */}
          <div className="d-flex align-items-center gap-2 mb-3 px-3">
            <img
              src={myProfile?.image || "https://placecats.com/60/60"}
              alt="Avatar profilo"
              className="rounded-circle"
              style={{ width: "55px", height: "55px", objectFit: "cover" }}
            />
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center gap-1">
                <span className="fw-bold fs-5 text-dark">
                  {myProfile?.name} {myProfile?.surname}
                </span>
                <BsChevronDown
                  className="text-secondary small"
                  style={{ fontSize: "0.8rem" }}
                />
              </div>
              <span
                className="text-muted small fw-semibold"
                style={{ fontSize: "0.85rem" }}
              >
                Pubblica: Chiunque
              </span>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            ref={emojiPostRef}
            className="w-100 border-0 fs-5 text-dark custom-textarea flex-grow-1 px-3"
            rows={4}
            placeholder="Di cosa vorresti parlare?"
            style={{ resize: "none", outline: "none", minHeight: "120px" }}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />

          {/* Pulsante Emoji (Faccina) sotto il testo */}
          <div className="px-1 mb-3">
            <button
              type="button"
              className="btn p-0 border-0 text-secondary fs-4 d-flex align-items-center"
              style={{ background: "transparent" }}
              onClick={() => {}}
            >
              <div className="mb-3">
                <EmojiPickerButton
                  text={postText}
                  setText={setPostText}
                  inputRef={emojiPostRef}
                  align="left"
                  size={24}
                />
              </div>
            </button>
          </div>

          {/* ANTEPRIMA DELL'IMMAGINE SELEZIONATA */}
          {imagePreview && (
            <div
              className="position-relative rounded-3 overflow-hidden border border-light shadow-sm mb-3 mx-3"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            >
              <img
                src={imagePreview}
                alt="Anteprima allegato"
                className="w-100 h-100"
                style={{
                  objectFit: "contain",
                  maxHeight: "300px",
                  backgroundColor: "#f8f9fa",
                }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="position-absolute top-0 end-0 m-2 btn btn-dark rounded-circle d-flex justify-content-center align-items-center p-0"
                style={{ width: "32px", height: "32px", opacity: 0.85 }}
              >
                <PiXBold className="text-white fs-5" />
              </button>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="d-none"
          />

          {/* Barra degli strumenti inferiore con icone React */}
          <div className="d-flex align-items-center gap-4 text-secondary fs-4 ps-3 pt-2">
            <AiFillPicture
              style={{ cursor: "pointer" }}
              className="text-secondary hover-icon"
              onClick={() => fileInputRef.current?.click()}
            />
            <BsCalendarEvent
              style={{ cursor: "pointer" }}
              className="text-secondary"
            />
            <FaAward style={{ cursor: "pointer" }} className="text-secondary" />
            <span
              style={{ cursor: "pointer", fontWeight: "bold", lineHeight: 1 }}
              className="text-secondary fs-3"
            >
              +
            </span>
          </div>
        </Modal.Body>

        {/* Footer con Orologio e Tasto Pubblica */}
        <Modal.Footer className="d-flex justify-content-end align-items-center border-top bg-white py-2 px-4">
          <div className="d-flex align-items-center gap-3">
            {/* Icona orologio per programmare il post */}
            <BsClockHistory
              style={{ cursor: "pointer" }}
              className="fs-4 text-secondary"
            />

            <Button
              variant={postText.trim() === "" ? "light" : "primary"}
              className="rounded-5 px-4 fw-bold"
              disabled={postText.trim() === ""}
              onClick={handlePublish}
              style={{
                backgroundColor: postText.trim() === "" ? "#e8e8e8" : "#0a66c2",
                borderColor: "transparent",
                color: postText.trim() === "" ? "rgba(0,0,0,0.35)" : "#ffffff",
                cursor: postText.trim() === "" ? "not-allowed" : "pointer",
              }}
            >
              Pubblica
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormPost;
