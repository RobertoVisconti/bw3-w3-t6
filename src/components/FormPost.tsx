import { useState, useRef } from "react";
import { Col, FormControl, Modal, Button } from "react-bootstrap";
import { PiVideoFill, PiArticleBold, PiXBold } from "react-icons/pi";
import { AiFillPicture } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { createPost, uploadPostImage } from "../redux/actions/postActions";
import type { Post } from "../interfaces/interfaces";

const FormPost = function () {
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
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fs-5 text-secondary fw-normal">
            Crea un post
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-2">
          <div className="d-flex align-items-center gap-2 mb-3">
            <img
              src={myProfile?.image || "https://placecats.com/60/60"}
              alt="Avatar profilo"
              className="rounded-circle"
              style={{ width: "55px", height: "55px", objectFit: "cover" }}
            />
            <div className="d-flex flex-column">
              <span className="fw-bold fs-5">
                {myProfile?.name} {myProfile?.surname}
              </span>
              <span
                className="text-muted small"
                style={{ fontSize: "0.85rem" }}
              >
                Pubblica: Chiunque
              </span>
            </div>
          </div>

          <textarea
            className="w-100 border-0 fs-5 text-dark custom-textarea mb-3"
            rows={4}
            placeholder="Di cosa vorresti parlare?"
            style={{ resize: "none", outline: "none" }}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />

          {/* ANTEPRIMA DELL'IMMAGINE SELEZIONATA */}
          {imagePreview && (
            <div
              className="position-relative rounded-3 overflow-hidden border border-light shadow-sm mb-3"
              style={{ maxWidth: "100%", maxHeight: "350px" }}
            >
              <img
                src={imagePreview}
                alt="Anteprima allegato"
                className="w-100 h-100"
                style={{
                  objectFit: "contain",
                  maxHeight: "350px",
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
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between align-items-center border-top-0 pt-0">
          <div className="d-flex gap-3 text-secondary fs-4 ps-2">
            <AiFillPicture
              style={{ cursor: "pointer" }}
              className="text-primary"
              onClick={() => fileInputRef.current?.click()}
            />
            <PiVideoFill style={{ cursor: "pointer" }} />
            <span style={{ cursor: "pointer", fontWeight: "bold" }}>+</span>
          </div>
          <Button
            variant="primary"
            className="rounded-5 px-4 fw-bold"
            disabled={postText.trim() === ""}
            onClick={handlePublish}
          >
            Pubblica
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormPost;
