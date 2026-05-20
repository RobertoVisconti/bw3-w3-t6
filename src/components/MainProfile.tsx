import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  getMyProfileAsync,
  uploadProfileImage,
} from "../redux/actions/profileActions"
import { GoShieldCheck } from "react-icons/go"
import ButtonLinkedin from "./ButtonLinkedin"
import ModalePresentazione from "../components/ModalePresentazione"
import ProfileModals from "../components/ProfileModals"
import { Button, Dropdown } from "react-bootstrap"
import { FaPen, FaUserPlus, FaEnvelope } from "react-icons/fa"
import { AiOutlinePicture } from "react-icons/ai"
import { IoMdPhotos } from "react-icons/io"

import { FiPlus } from "react-icons/fi"
import MapExp from "./MapExp"
import { getExperience } from "../redux/actions/experienceActions"

const MainProfile = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  // Stato per il profilo visualizzato
  const [displayedProfile, setDisplayedProfile] = useState<any>(null)
  const [isOwnProfile, setIsOwnProfile] = useState(true)

  // Variabili di stato per i modali
  const [showUpPic, setShowUpPic] = useState(false)
  const [showMod, setShowMod] = useState(false)
  const [showImg, setShowImg] = useState(false)
  const [showCover, setShowCover] = useState(false)
  const [showPref, setShowPref] = useState(false)

  // Variabili per l'upload dell'immagine
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  // Funzioni di chiusura/apertura modali
  const handleCloseUpPic = () => setShowUpPic(false)
  const handleShowUpPic = () => setShowUpPic(true)
  const handleCloseMod = () => setShowMod(false)
  const handleShowMod = () => setShowMod(true)
  const handleCloseImg = () => setShowImg(false)
  const handleShowImg = () => setShowImg(true)
  const handleCloseCover = () => setShowCover(false)
  const handleShowCover = () => setShowCover(true)
  const handleClosePref = () => setShowPref(false)
  const handleShowPref = () => setShowPref(true)

  // Selettori Redux
  const { myProfile, allProfiles, isLoading, error } = useSelector(
    (state: RootState) => state.profile,
  )

  const experiences = useSelector(
    (state: RootState) => state.experience.experiences,
  )

  // Funzione per l'upload dell'immagine del profilo
  const handleUpload = async () => {
    if (!selectedFile || !displayedProfile?._id) return

    await dispatch(uploadProfileImage(displayedProfile._id, selectedFile))

    setSelectedFile(null)
    setPreview(null)
    handleCloseImg()
  }

  // Carico il mio profilo al mount
  useEffect(() => {
    dispatch(getMyProfileAsync())
  }, [dispatch])

  // Logica per determinare quale profilo mostrare
  useEffect(() => {
    if (userId) {
      const foundProfile = allProfiles?.find((p) => p._id === userId)
      if (foundProfile) {
        setDisplayedProfile(foundProfile)
        setIsOwnProfile(foundProfile._id === myProfile?._id)
      }
    } else {
      if (myProfile) {
        setDisplayedProfile(myProfile)
        setIsOwnProfile(true)
      }
    }
  }, [userId, myProfile, allProfiles])

  // Funzione per tornare al proprio profilo
  const goToMyProfile = () => {
    navigate("/profilo")
    setDisplayedProfile(myProfile)
    setIsOwnProfile(true)
  }

  // fetch get exp
  useEffect(() => {
    if (displayedProfile?._id) {
      dispatch(getExperience(displayedProfile._id))
    }
  }, [dispatch, displayedProfile?._id])

  return (
    <>
      {isLoading && (
        <div className="text-center my-3">Caricamento profilo...</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      {displayedProfile && (
        <div className="d-flex flex-column gap-3">
          <section className="bg-light border border-secondary rounded-3 my-2">
            {/* banner */}
            <div
              className="w-100 custom-profile-card rounded-top-2 position-relative"
              style={{
                backgroundImage: 'url("https://placebear.com/1000/1000")',
              }}
            >
              {/* dropdown modifica copertina - visibile solo per il proprio profilo */}
              {isOwnProfile && (
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
                        <div className="fw-bold m-0">
                          <AiOutlinePicture size={25} className="me-2" />
                          Modifica immagine di copertina
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item className="d-flex align-items-center ">
                        <IoMdPhotos size={17} className="me-2" />
                        <div className="d-flex flex-column">
                          <p className="m-0">
                            <b>Crea una presentazione</b>
                          </p>
                          <p
                            className="fw-light m-0"
                            style={{ fontSize: "13px" }}
                          >
                            Fai un'ottima prima impressione usando fino a 5
                            immagini
                          </p>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}

              <img
                src={displayedProfile.image || "https://placehold.co/30x30"}
                alt="foto profilo"
                className="rounded-circle profile-image"
                onClick={isOwnProfile ? handleShowImg : undefined}
                style={{ cursor: isOwnProfile ? "pointer" : "default" }}
              />
            </div>

            <div className="p-3 pt-5">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div>
                    <h1 className="fs-3 m-0 me-2">
                      {displayedProfile.surname} {displayedProfile.name}
                    </h1>
                    <h6>{displayedProfile.username}</h6>
                    <GoShieldCheck />
                  </div>
                </div>
                {/* Pulsante edit visibile solo per il proprio profilo */}
                {isOwnProfile && <FaPen size={17} onClick={handleShowMod} />}
                <ModalePresentazione
                  showMod={showMod}
                  handleCloseMod={handleCloseMod}
                />
              </div>
              <div style={{ fontSize: "15px" }}>
                <p className="m-0 text-muted">{displayedProfile.title}</p>
                <p className="m-0 text-secondary">
                  {displayedProfile.area} .{" "}
                  <a href="#" className="fw-bold text-decoration-none">
                    informazioni di contatto
                  </a>
                </p>
                <a href="#" className="fw-bold text-decoration-none">
                  381 collegamenti
                </a>
              </div>

              {/* Pulsanti differenti in base al tipo di profilo */}
              {isOwnProfile ? (
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
              ) : (
                <div className="d-flex gap-2 mt-2 mb-4">
                  <Button
                    className="rounded-pill fw-bold d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: "#0A66C2",
                      color: "white",
                      border: "none",
                      fontSize: "14px",
                      padding: "8px 20px",
                    }}
                  >
                    <FaUserPlus size={14} />
                    Aggiungi agli amici
                  </Button>
                  <Button
                    className="rounded-pill fw-bold d-flex align-items-center gap-2"
                    style={{
                      color: "#0A66C2",
                      backgroundColor: "transparent",
                      border: "2px solid #0A66C2",
                      fontSize: "14px",
                      padding: "6px 20px",
                    }}
                  >
                    <FaEnvelope size={14} />
                    Messaggio
                  </Button>
                  <Button
                    onClick={goToMyProfile}
                    className="rounded-pill fw-bold"
                    style={{
                      color: "#0A66C2",
                      backgroundColor: "transparent",
                      border: "2px solid #0A66C2",
                      fontSize: "14px",
                      padding: "6px 20px",
                    }}
                  >
                    Torna al mio profilo
                  </Button>
                </div>
              )}

              {/* Sezione "Disponibile a lavorare" - visibile solo per il proprio profilo */}
              {isOwnProfile && (
                <div
                  className="d-flex align-items-start rounded-2 flex-column mt-3 p-3 w-50"
                  style={{ backgroundColor: "#DDE7F1" }}
                >
                  <div className="d-flex align-items-center w-100 justify-content-between">
                    <p className="p-0 m-0">
                      <b>Disponibile a lavorare</b>
                    </p>
                    <FaPen size={17} onClick={handleShowPref} />
                  </div>
                  <p style={{ fontSize: "13px" }}>
                    {displayedProfile.area} | in sede . Ibrido
                  </p>
                  <a href="#" className="text-decoration-none fw-bold">
                    Mostra dettagli
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* SEZIONE: INFORMAZIONI / BIO */}
          <section className="bg-light border border-secondary rounded-3 p-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h2 className="fs-4 fw-bold m-0">Informazioni</h2>
            </div>
            <p
              className="text-dark m-0"
              style={{ fontSize: "14px", lineHeight: "1.5" }}
            >
              {displayedProfile.bio ||
                (isOwnProfile
                  ? "Nessun riepilogo inserito. Aggiungi una bio per farti conoscere dai recruiter!"
                  : "L'utente non ha ancora inserito una descrizione di presentazione.")}
            </p>
          </section>

          {/* SEZIONE: ESPERIENZE */}
          <section className="bg-light border border-secondary rounded-3 p-3">
            <div className="d-flex  justify-content-between flex-column mb-3">
              {isOwnProfile && (
                <div className="">
                  <div className="d-flex justify-content-between mb-3">
                    <h2 className="fs-4 fw-bold m-0">Esperienza</h2>
                    <div>
                      <Button
                        variant=""
                        className=""
                        onClick={() => navigate("/Esperienze")}
                      >
                        <FiPlus className="m-0 p-0" />
                      </Button>
                      <Button
                        variant=""
                        className=""
                        onClick={() => navigate("/Esperienze")}
                      >
                        <FaPen size={17} />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <MapExp />
                  </div>
                </div>
              )}
            </div>

            {/* {displayedProfile.experiences &&
            displayedProfile.experiences.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                <h2 className="fs-4 fw-bold m-0">Esperienza</h2>
                {displayedProfile.experiences.map((exp: any, index: number) => (
                  <div
                    key={exp._id || index}
                    className="d-flex gap-3 align-items-start pb-3 border-bottom border-light"
                  >
                    <div className="p-2 bg-secondary bg-opacity-10 rounded-2 text-secondary">
                      <FaBriefcase size={22} />
                    </div>
                    <div className="d-flex flex-column">
                      <h4 className="fs-5 fw-bold m-0 text-dark">{exp.role}</h4>
                      <span className="text-muted small fw-semibold">
                        {exp.company}
                      </span>
                      <span
                        className="text-secondary mt-0.5"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {exp.startDate
                          ? new Date(exp.startDate).toLocaleDateString(
                              "it-IT",
                              { year: "numeric", month: "short" },
                            )
                          : ""}{" "}
                        -
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("it-IT", {
                              year: "numeric",
                              month: "short",
                            })
                          : " In corso"}
                      </span>
                      {exp.description && (
                        <p
                          className="text-muted mt-2 mb-0"
                          style={{ fontSize: "13.5px" }}
                        >
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted m-0 small">
                {isOwnProfile
                  ? "Non hai ancora inserito esperienze lavorative."
                  : "Nessuna esperienza lavorativa presente nel profilo di questo utente."}
              </p>
            )} */}
          </section>
        </div>
      )}

      {/* COMPONENTE CENTRALIZZATO DEI MODALI */}
      <ProfileModals
        isOwnProfile={isOwnProfile}
        displayedProfile={displayedProfile}
        showImg={showImg}
        handleCloseImg={handleCloseImg}
        handleShowUpPic={handleShowUpPic}
        showCover={showCover}
        handleCloseCover={handleCloseCover}
        showPref={showPref}
        handleClosePref={handleClosePref}
        showUpPic={showUpPic}
        handleCloseUpPic={handleCloseUpPic}
        preview={preview}
        handleUpload={handleUpload}
        setSelectedFile={setSelectedFile}
        setPreview={setPreview}
      />
    </>
  )
}

export default MainProfile
