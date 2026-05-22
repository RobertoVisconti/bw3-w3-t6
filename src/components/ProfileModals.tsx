import { Modal, Button, Form, FormCheck, Image } from "react-bootstrap"
import { FaTrashAlt, FaCamera } from "react-icons/fa"
import ButtonLinkedin from "./generali/ButtonLinkedin"
import type { Profile } from "../interfaces/interfaces"
import { useState } from "react"

interface ProfileModalsProps {
  isOwnProfile: boolean
  displayedProfile: Profile | null
  // Modal Foto Profilo
  showImg: boolean
  handleCloseImg: () => void
  handleShowUpPic: () => void
  // Modal Copertina
  showCover: boolean
  handleCloseCover: () => void
  // Modal Preferenze Lavoro
  showPref: boolean
  handleClosePref: () => void
  // Modal Caricamento Foto
  showUpPic: boolean
  handleCloseUpPic: () => void
  preview: string | null
  handleUpload: () => void
  handleDeleteImage: () => void
  setSelectedFile: (file: File | null) => void
  setPreview: (preview: string | null) => void
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
  const sections = [
    {
      type: "qualifications",
      title: "Qualifiche*",
      buttons: [
        { id: "employee", label: "Dipendente", variant: "pref" },
        { id: "student", label: "Studente", variant: "pref" },
      ],
      extraButton: {
        label: "+ Aggiungi qualifica",
        variant: "follow",
      },
    },

    {
      type: "locationType",
      title: "Tipi di località*",
      buttons: [
        { id: "office", label: "In sede", variant: "pref" },
        { id: "hybrid", label: "Ibrido", variant: "pref" },
        { id: "remote", label: "Da remoto +", variant: "pref" },
      ],
    },

    {
      type: "employmentType",
      title: "Tipi di impiego*",
      buttons: [
        { id: "fulltime", label: "A tempo pieno", variant: "active" },
        { id: "parttime", label: "Part-time +", variant: "pref" },
        { id: "contract", label: "Contratto +", variant: "pref" },
        { id: "internship", label: "Stage +", variant: "pref" },
        { id: "temporary", label: "Temporaneo +", variant: "pref" },
      ],
    },
  ]
  const [state, setState] = useState({})
  const toggle = (section, id) => {
    setState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [id]: !prev[section]?.[id],
      },
    }))
  }

  if (!isOwnProfile) return null

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
              src={displayedProfile?.image || "https://placecats.com/300/300"}
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
            className="bg-transparent border-0 d-flex flex-column align-items-center text-light "
            style={{ fontSize: "13px" }}
            onClick={() => {
              handleDeleteImage()
              handleCloseImg()
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
                backgroundImage:
                  'url("https://png.pngtree.com/background/20250104/original/pngtree-free-vector-linkedin-banner-with-linked-technology-and-gradient-texture-picture-image_15305713.jpg")',
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
          {/* HEADER */}
          <p className="p-0 m-0">
            <b>A cosa sei interessato?</b>
          </p>

          <p style={{ fontSize: "13px" }} className="text-secondary">
            I recruiter vedono queste informazioni, quindi possono offrirti
            ruoli pertinenti
          </p>

          {/* SEZIONI DINAMICHE */}
          {sections.map((section) => (
            <div key={section.type}>
              {/* TITOLO */}
              <p className="m-0">{section.title}</p>

              {/* BOTTONI */}
              <div className="d-flex flex-wrap gap-2 mb-3 mt-2">
                {section.buttons.map((btn) => (
                  <ButtonLinkedin
                    key={btn.id}
                    to="#"
                    text={btn.label}
                    className={`
              border-0
              ${
                btn.variant === "follow"
                  ? "custom-btn-follow"
                  : "custom-btn-preferenze"
              }
              ${state?.[section.type]?.[btn.id] ? "disable" : ""}
            `}
                    onClick={(e) => {
                      e.preventDefault()
                      toggle(section.type, btn.id)
                    }}
                  />
                ))}
              </div>

              {/* BOTTONE EXTRA (solo qualifica) */}
              {section.extraButton && (
                <div className="w-50 mb-4">
                  <ButtonLinkedin
                    to="#"
                    className="text-primary bg-transparent custom-btn-follow"
                    text={section.extraButton.label}
                  />
                </div>
              )}
            </div>
          ))}

          {/* LOCALITÀ (STATICO COME PRIMA) */}
          <p className="m-0">Località (in sede)*</p>

          <div className="d-flex mb-2 mt-2">
            <ButtonLinkedin
              to="#"
              text={displayedProfile?.area}
              className="bg-success border-0"
            />
          </div>

          <div className="w-50 mb-4">
            <ButtonLinkedin
              to="#"
              className="text-primary bg-transparent custom-btn-follow"
              text="+ Aggiungi località"
            />
          </div>

          {/* DATA DI INIZIO */}
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

          {/* TIPI DI IMPIEGO (RESTA STATICO O GIÀ GESTITO IN SECTIONS) */}

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
                const file = e.target.files?.[0]
                if (!file) return
                setSelectedFile(file)
                setPreview(URL.createObjectURL(file))
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-0 d-flex justify-content-between">
          <Button
            className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
            style={{ fontSize: "13px" }}
            onClick={() => {
              handleDeleteImage()
              handleCloseUpPic()
            }}
          >
            <FaTrashAlt />
            Elimina
          </Button>
          <Button
            className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
            style={{ fontSize: "13px" }}
            onClick={() => {
              handleUpload()
              handleCloseUpPic()
            }}
          >
            <FaCamera />
            Aggiorna
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProfileModals
