import { Modal, Button, Form, FormCheck, Image } from "react-bootstrap";
import { FaTrashAlt, FaCamera } from "react-icons/fa";
import ButtonLinkedin from "./generali/ButtonLinkedin";
import type { Profile } from "../interfaces/interfaces";

interface ProfileModalsProps {
  isOwnProfile: boolean;
  displayedProfile: Profile | null;
  // Modal Foto Profilo
  showImg: boolean;
  handleCloseImg: () => void;
  handleShowUpPic: () => void;
  // Modal Copertina
  showCover: boolean;
  handleCloseCover: () => void;
  // Modal Preferenze Lavoro
  showPref: boolean;
  handleClosePref: () => void;
  // Modal Caricamento Foto
  showUpPic: boolean;
  handleCloseUpPic: () => void;
  preview: string | null;
  handleUpload: () => void;
  handleDeleteImage: () => void;
  setSelectedFile: (file: File | null) => void;
  setPreview: (preview: string | null) => void;
}

const ProfileModals = ({
  isOwnProfile,
  displayedProfile,
  showImg,
  handleCloseImg,
  handleShowUpPic,
  showCover,
  handleCloseCover,
  showPref,
  handleClosePref,
  showUpPic,
  handleCloseUpPic,
  preview,
  handleUpload,
  handleDeleteImage,
  setSelectedFile,
  setPreview,
}: ProfileModalsProps) => {
  if (!isOwnProfile) return null;

  return (
    <>
      {/* 1. Modale Foto Profilo */}
      <Modal show={showImg} onHide={handleCloseImg}>
        <Modal.Header closeButton className="bg-dark border-0">
          <Modal.Title className="text-light">Foto del profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <div className="w-100 justify-content-center d-flex">
            <Image
              src={displayedProfile?.image || "https://placecats.com/300/300"} // Fallback se è vuota
              alt="foto profilo"
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "15px",
                objectFit: "cover",
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-0 d-flex justify-content-between">
          <Button
            className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
            style={{ fontSize: "13px" }}
            onClick={() => {
              handleDeleteImage();
              handleCloseImg();
            }}
          >
            <FaTrashAlt />
            Elimina
          </Button>
          <Button
            className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
            style={{ fontSize: "13px" }}
            onClick={handleShowUpPic}
          >
            <FaCamera />
            Modifica
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 2. Modale Cover */}
      <Modal show={showCover} onHide={handleCloseCover}>
        <Modal.Header closeButton className="bg-dark border-0">
          <Modal.Title className="text-light">
            Modifica immagine di copertina
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <div className="w-100 justify-content-center d-flex">
            <div
              style={{
                width: "300px",
                height: "150px",
                backgroundImage: 'url("https://placebear.com/1000/1000")',
                backgroundSize: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-0 d-flex justify-content-between">
          <Button
            className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
            onClick={handleCloseCover}
          >
            <FaTrashAlt />
            Elimina
          </Button>
          <Button
            className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
            onClick={handleCloseCover}
          >
            <FaCamera />
            Modifica
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 3. Modal Preferenze Offerte Lavoro */}
      <Modal show={showPref} onHide={handleClosePref} size="lg">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Preferenze offerte di lavoro</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white p-4">
          <p className="p-0 m-0">
            <b>A cosa sei interessato?</b>
          </p>
          <p style={{ fontSize: "13px" }} className="text-secondary">
            I recruiter vedono queste informazioni, quindi possono offrirti
            ruoli pertinenti
          </p>
          <div>
            <p className="p-0 m-0">Qualifiche*</p>
            <div className="d-flex mb-3">
              <div className="me-2">
                <ButtonLinkedin
                  to="#"
                  text="Dipendente"
                  className="bg-success border-0"
                />
              </div>
              <div className="me-2">
                <ButtonLinkedin
                  to="#"
                  text="Studente"
                  className="bg-success border-0"
                />
              </div>
            </div>
            <div className="w-50 mb-4">
              <ButtonLinkedin
                to="#"
                className="text-primary bg-transparent"
                text="+ Aggiungi qualifica"
              />
            </div>

            <p className="m-0">Tipi di località*</p>
            <div className="d-flex mb-4">
              <div className="me-2">
                <ButtonLinkedin
                  to="#"
                  text="In sede"
                  className="bg-success border-0"
                />
              </div>
              <div className="me-2">
                <ButtonLinkedin
                  to="#"
                  text="ibrido"
                  className="bg-success border-0"
                />
              </div>
              <ButtonLinkedin
                to="#"
                className="text-secondary bg-transparent border-secondary"
                text="Da remoto +"
              />
            </div>

            <p className="m-0">Località (in sede)*</p>
            <div className="d-flex mb-2">
              <div className="me-2">
                <ButtonLinkedin
                  to="#"
                  text={displayedProfile?.area}
                  className="bg-success border-0"
                />
              </div>
            </div>
            <div className="w-50 mb-4">
              <ButtonLinkedin
                to="#"
                className="text-primary bg-transparent"
                text="+ Aggiungi località"
              />
            </div>

            <p className="m-0 p-0">Data di inizio</p>
            <Form className="mt-2 mb-4">
              <FormCheck
                type="radio"
                name="dataDiInizio"
                label="Immediatamente, sto attivamente cercando lavoro"
                id="available"
              />
              <FormCheck
                type="radio"
                name="dataDiInizio"
                label="Flessibile, do occasionalmente un'occhiata"
                id="flexible"
              />
            </Form>

            <p className="m-0">Tipi di impiego*</p>
            <div className="d-flex flex-wrap gap-2 mb-4">
              <ButtonLinkedin
                to="#"
                text="A tempo pieno"
                className="bg-success border-0"
              />
              <ButtonLinkedin
                to="#"
                className="text-secondary bg-transparent border-secondary"
                text="Part-time +"
              />
              <ButtonLinkedin
                to="#"
                className="text-secondary bg-transparent border-secondary"
                text="Contratto +"
              />
              <ButtonLinkedin
                to="#"
                className="text-secondary bg-transparent border-secondary"
                text="Stage +"
              />
              <ButtonLinkedin
                to="#"
                className="text-secondary bg-transparent border-secondary"
                text="Temporaneo +"
              />
            </div>

            <p className="m-0 p-0">
              Visibilità (chi può vedere che sei disponibile a lavorare)
            </p>
            <Form className="mt-2">
              <FormCheck
                type="radio"
                name="visibilità"
                label="Solo recruiter"
                id="recruiter-only"
              />
              <FormCheck
                type="radio"
                name="visibilità"
                label="Tutti gli utenti LinkedIn"
                id="all-users"
              />
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="light"
            onClick={handleClosePref}
            className="rounded-pill m-0 py-0"
          >
            Elimina
          </Button>
          <Button
            variant="primary"
            onClick={handleClosePref}
            className="rounded-pill m-0 py-0"
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 4. Modal Caricamento Foto */}
      <Modal show={showUpPic} onHide={handleCloseUpPic}>
        <Modal.Header closeButton className="bg-dark border-0">
          <Modal.Title className="text-light">Carica foto profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form.Group>
            <Form.Label className="w-100 d-flex justify-content-center">
              {preview && (
                <Image
                  src={preview}
                  roundedCircle
                  alt="preview"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Form.Label>
            <Form.Control
              className="bg-transparent text-light border-0 border-bottom"
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-0 d-flex justify-content-between">
          <Button
            className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
            style={{ fontSize: "13px" }}
            onClick={() => {
              handleDeleteImage();
              handleCloseUpPic();
            }}
          >
            <FaTrashAlt />
            Elimina
          </Button>
          <Button
            className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
            style={{ fontSize: "13px" }}
            onClick={() => {
              handleUpload();
              handleCloseUpPic();
            }}
          >
            <FaCamera />
            Aggiorna
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModals;
