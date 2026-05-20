import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { useEffect, useState } from "react"
import { getMyProfileAsync } from "../redux/actions/profileActions"
import { GoShieldCheck } from "react-icons/go"
import ButtonLinkedin from "./ButtonLinkedin"
import { IoEyeSharp } from "react-icons/io5"
import ModalePresentazione from "./ModalePresentazione"

import { Button, Dropdown, Form, FormCheck, Modal } from "react-bootstrap"
import { HiOutlinePencil } from "react-icons/hi"
import { FaCamera, FaPen, FaTrashAlt } from "react-icons/fa"
import { SlPicture } from "react-icons/sl"
import { AiOutlinePicture } from "react-icons/ai"
import { IoMdPhotos } from "react-icons/io"

const MainProfile = () => {
  // funzioni modal e presentazioni
  const [showMod, setShowMod] = useState(false)

  const handleCloseMod = () => setShowMod(false)
  const handleShowMod = () => setShowMod(true)

  // funzioni modeale pic

  const [showImg, setShowImg] = useState(false)

  const handleCloseImg = () => setShowImg(false)
  const handleShowImg = () => setShowImg(true)

  // funzione modale cover

  const [showCover, setShowCover] = useState(false)

  const handleCloseCover = () => setShowCover(false)
  const handleShowCover = () => setShowCover(true)

  // funzione modale preferenze offerte di lavoro

  const [showPref, setShowPref] = useState(false)

  const handleClosePref = () => setShowPref(false)
  const handleShowPref = () => setShowPref(true)

  const dispatch = useDispatch<AppDispatch>()
  const { myProfile, isLoading, error } = useSelector(
    (state: RootState) => state.profile,
  )

  useEffect(() => {
    dispatch(getMyProfileAsync())
  }, [dispatch])

  return (
    <>
      {/* section profilo */}
      {/* ! PAGE LAVORO --> la section profilo rimane invariata al cambio tra Home e Lavoro */}
      {isLoading && (
        <div className="text-center my-3">Caricamento profilo...</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {myProfile && (
        <section className="bg-light border border-secondary rounded-3 my-2">
          {/* banner */}
          <div
            className="w-100 custom-profile-card rounded-top-2 position-relative"
            style={{
              backgroundImage: 'url("https://placebear.com/1000/1000")',
            }}
          >
            {/* dropdown modifica copertina */}
            <div className="text-end">
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="rounded-circle dropdown-toggle-no-arrow mt-3 me-3 bg-light text-black border-0 "
                >
                  <FaPen size={17} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleShowCover}>
                    <p className="fw-bold">
                      {" "}
                      <AiOutlinePicture size={25} className="me-2" />
                      Modifica immagine di copertina
                    </p>
                  </Dropdown.Item>
                  <Dropdown.Item className="d-flex align-items-center ">
                    <IoMdPhotos size={17} className="me-2" />
                    <div className="d-flex flex-column">
                      <p className="m-0">
                        <b>Crea una presentazione</b>
                      </p>
                      <p
                        className="fw-light m-0"
                        style={{
                          fontSize: "13px",
                        }}
                      >
                        Fai un'ottima prima impressione usando fiono a 5
                        immagini
                      </p>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <img
              src={myProfile.image || "https://placehold.co/30x30"}
              alt="foto profilo"
              className="rounded-circle profile-image  "
              onClick={handleShowImg}
            />
          </div>

          <div className="p-3 pt-5">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <h1 className="fs-3 m-0 me-2">
                  {myProfile.surname} {myProfile.name}
                </h1>
                <GoShieldCheck />
              </div>
              <FaPen size={17} onClick={handleShowMod} />
              <ModalePresentazione
                showMod={showMod}
                handleCloseMod={handleCloseMod}
              />
            </div>
            <div style={{ fontSize: "15px" }}>
              <p className="m-0 text-muted">{myProfile.title}</p>
              <p className="m-0 text-secondary">
                {myProfile.area} .{" "}
                <a href="#" className="fw-bold text-decoration-none">
                  informazioni di contatto
                </a>
              </p>
              <a className="fw-bold text-decoration-none">381 collegamenti</a>
            </div>
            <div className="d-flex gap-1">
              <ButtonLinkedin
                text="Disponibile per"
                className="text-primary bg-transparent rounded-pill w-100 mt-2 mb-4 fw-bold border-2"
                style={{ fontSize: "10px" }}
                to="#"
              />
              <ButtonLinkedin
                text="Aggiungi sezione"
                className="text-primary bg-transparent rounded-pill w-100 mt-2 mb-4 fw-bold border-2"
                style={{ fontSize: "10px" }}
                to="#"
              />
              <ButtonLinkedin
                text="Migliore profilo"
                className="text-primary bg-transparent rounded-pill w-100 mt-2 mb-4 fw-bold border-2"
                style={{ fontSize: "10px" }}
                to="#"
              />

              <ButtonLinkedin
                text="..."
                className="text-primary bg-transparent rounded-pill w-100 mt-2 mb-4 fw-bold border-2 "
                style={{ fontSize: "10px" }}
                to="#"
              />
            </div>

            <div
              className="d-flex align-items-start rounded-2 flex-column  mt-3 p-3 w-50"
              style={{
                backgroundColor: "#DDE7F1",
              }}
            >
              <div className="d-flex align-items-center w-100 justify-content-between">
                <p className="p-0 m-0 ">
                  <b>Disponibile a lavorare</b>
                </p>
                <FaPen size={17} onClick={handleShowPref} />
              </div>
              <p style={{ fontSize: "13px" }}>
                {myProfile.area} | in sede . Ibrido
              </p>
              <a href="#" className="text-decoration-none fw-bold">
                Mostra dettagli
              </a>
            </div>
          </div>
        </section>
      )}

      {/* modale pic */}
      {/* modale pic */}
      {/* modale pic */}
      {/* modale pic */}
      {/* modale pic */}
      <Modal show={showImg} onHide={handleCloseImg}>
        <Modal.Header closeButton className="bg-dark border-0">
          <Modal.Title className="text-light">Foto del profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <div className="w-100 justify-content-center d-flex">
            <img
              src={myProfile?.image}
              alt="foto-profilo"
              className="w-50 rounded-circle "
            />
          </div>
          {/* tasto visibilità */}
          <div className="w-25 border rounded-pill border-light mt-3 d-flex align-items-center">
            <IoEyeSharp className="text-light me-2 ms-2" />
            <ButtonLinkedin
              to="#"
              text="Chiunque"
              className="border-0 text-light m-0 p-0"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between bg-dark border-0">
          <div className="d-flex">
            <Button
              className="bg-transparent border-0 d-flex flex-column align-items-center"
              style={{ fontSize: "13px" }}
            >
              {" "}
              <HiOutlinePencil />
              Modifica
            </Button>
            <Button
              className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
              style={{ fontSize: "13px" }}
            >
              <FaCamera />
              Aggiorna
            </Button>
            <Button
              className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
              style={{ fontSize: "13px" }}
            >
              <SlPicture />
              Cornici
            </Button>
          </div>
          <Button
            className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
            style={{ fontSize: "13px" }}
          >
            <FaTrashAlt />
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modale Cover */}
      {/* modale Cover */}
      {/* modale Cover */}
      {/* modale Cover */}
      <Modal show={showCover} onHide={handleCloseCover}>
        <Modal.Header closeButton>
          <Modal.Title>Foto di copertina</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-0 p-0">
          <img
            src={myProfile?.image}
            alt="foto-copertina"
            style={{ width: "100%", height: "100px", objectFit: "cover" }}
          />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-around">
          <Button className="bg-transparent border-0 d-flex flex-column align-items-center text-black">
            {" "}
            <HiOutlinePencil className="text-primary" size={20} />
            Modifica
          </Button>
          <Button className="bg-transparent border-0 d-flex flex-column align-items-center text-black">
            <FaCamera className="text-primary" size={20} />
            Cambia foto
          </Button>
          <Button className="bg-transparent border-0 d-flex flex-column align-items-center text-black">
            <FaTrashAlt className="text-primary" size={20} />
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modale preferenze offerte di lavoro */}
      {/* modale preferenze offerte di lavoro */}
      {/* modale preferenze offerte di lavoro */}
      {/* modale preferenze offerte di lavoro */}
      <Modal show={showPref} onHide={handleClosePref} scrollable>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">
            Modifica preferenze per le offerte di lavoro
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-light" style={{ fontSize: "10px" }}>
            * indica che è obbligatorio
          </p>
          <div>
            {/* form qualifiche */}
            <p className="p-0 m-0">Qualifiche*</p>
            <div className="d-flex">
              <div className="me-2">
                <ButtonLinkedin
                  to="#"
                  text="Dipendente "
                  className="bg-success border-0"
                />
              </div>
              <div className="me-2">
                <ButtonLinkedin
                  to="#"
                  text="Studente"
                  className="bg-success border-0 "
                />
              </div>
            </div>
            <div className="w-50">
              <ButtonLinkedin
                to="#"
                className="text-primary bg-transparent"
                text="+ Aggiungi qualifica"
              />
            </div>
            {/* form tipi di località */}
            <p className="m-0 mt-5">Tipi di località*</p>
            <div className="d-flex">
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
                  className="bg-success border-0 "
                />
              </div>
              <ButtonLinkedin
                to="#"
                className="text-secondary bg-transparent border-secondary"
                text="Da remoto +"
              />
            </div>

            {/* form località in sede*/}
            <p className="m-0 mt-5">Località (in sede)*</p>
            <div className="d-flex">
              <div className="me-2">
                <ButtonLinkedin
                  to="#"
                  text={myProfile?.area}
                  className="bg-success border-0"
                />
              </div>
            </div>
            <div className="w-50">
              <ButtonLinkedin
                to="#"
                className="text-primary bg-transparent"
                text="+ Aggiungi località"
              />
            </div>

            {/* form Data di inizio */}
            <p className="m-0 p-0 mt-5">Data di inizio</p>
            <Form className="mt-3">
              <FormCheck
                type="radio"
                name="group1"
                label="Immediatamente, sto attivamente cercando lavoro"
                id="available"
              />

              <FormCheck
                type="radio"
                name="group1"
                label="Flessibile, do occasionalmente un'occhiata"
                id="flexible"
              />
            </Form>

            {/* form tipi di impiego */}
            <p className="m-0 mt-5">Tipi di impiego*</p>
            <div className="d-flex flex-wrap">
              <div className="me-2">
                <ButtonLinkedin
                  to="#"
                  text="A tempo pieno"
                  className="bg-success border-0"
                />
              </div>
              <div className="me-2">
                <ButtonLinkedin
                  to="#"
                  className="text-secondary bg-transparent border-secondary"
                  text="Part-time +"
                />
              </div>
              <div className="me-2">
                <ButtonLinkedin
                  to="#"
                  className="text-secondary bg-transparent border-secondary"
                  text="Contratto +"
                />
              </div>
              <div className="me-2">
                <ButtonLinkedin
                  to="#"
                  className="text-secondary bg-transparent border-secondary"
                  text="Stage +"
                />
              </div>
              <div className="me-2">
                <ButtonLinkedin
                  to="#"
                  className="text-secondary bg-transparent border-secondary"
                  text="Temporaneo +"
                />
              </div>
            </div>
            {/* form Visibilità */}
            <p className="m-0 p-0 mt-5">
              Visibilità (chi può vedere che sei disponibile a lavorare){" "}
            </p>
            <Form className="mt-3">
              <FormCheck
                type="radio"
                name="group1"
                label="Solo recruiter"
                id="available"
              />

              <FormCheck
                type="radio"
                name="group1"
                label="Tutti gli utenti LinkedIn"
                id="flexible"
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
            onClick={handleCloseMod}
            className="rounded-pill m-0 py-0 "
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default MainProfile
