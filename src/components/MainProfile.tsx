import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMyProfileAsync,
  uploadProfileImage,
} from "../redux/actions/profileActions";
import { GoShieldCheck } from "react-icons/go";
import ButtonLinkedin from "./ButtonLinkedin";
import { IoEyeSharp } from "react-icons/io5";
import ModalePresentazione from "../components/ModalePresentazione";
import {
  Button,
  Dropdown,
  Form,
  FormCheck,
  Image,
  Modal,
} from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";
import {
  FaCamera,
  FaPen,
  FaTrashAlt,
  FaUserPlus,
  FaEnvelope,
  FaBriefcase,
} from "react-icons/fa";
import { SlPicture } from "react-icons/sl";
import { AiOutlinePicture } from "react-icons/ai";
import { IoMdPhotos } from "react-icons/io";

const MainProfile = () => {
  // Recupero l'ID dell'utente dall'URL (se presente)
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  // funzioni upload Immagine profilo
  const [showUpPic, setShowUpPic] = useState(false);

  const handleCloseUpPic = () => setShowUpPic(false);
  const handleShowUpPic = () => setShowUpPic(true);

  // update
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!selectedFile || !displayedProfile?._id) return;

    await dispatch(uploadProfileImage(displayedProfile._id, selectedFile));

    setSelectedFile(null);
    setPreview(null);
    handleCloseImg();
  };

  // funzioni modal e presentazioni
  const [showMod, setShowMod] = useState(false);

  const handleCloseMod = () => setShowMod(false);
  const handleShowMod = () => setShowMod(true);

  // funzioni modeale pic

  const [showImg, setShowImg] = useState(false);

  const handleCloseImg = () => setShowImg(false);
  const handleShowImg = () => setShowImg(true);

  // funzione modale cover

  const [showCover, setShowCover] = useState(false);

  const handleCloseCover = () => setShowCover(false);
  const handleShowCover = () => setShowCover(true);

  // funzione modale preferenze offerte di lavoro

  const [showPref, setShowPref] = useState(false);

  const handleClosePref = () => setShowPref(false);
  const handleShowPref = () => setShowPref(true);

  const dispatch = useDispatch<AppDispatch>();
  const { myProfile, allProfiles, isLoading, error } = useSelector(
    (state: RootState) => state.profile,
  );

  // Stato per il profilo visualizzato
  const [displayedProfile, setDisplayedProfile] = useState<any>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(true);

  // Carico il mio profilo al mount
  useEffect(() => {
    dispatch(getMyProfileAsync());
  }, [dispatch]);

  // Logica per determinare quale profilo mostrare
  useEffect(() => {
    if (userId) {
      // Cerco il profilo dell'utente negli allProfiles
      const foundProfile = allProfiles?.find((p) => p._id === userId);
      if (foundProfile) {
        setDisplayedProfile(foundProfile);
        setIsOwnProfile(foundProfile._id === myProfile?._id);
      }
    } else {
      // Se non c'è userId nell'URL, mostro il mio profilo
      if (myProfile) {
        setDisplayedProfile(myProfile);
        setIsOwnProfile(true);
      }
    }
  }, [userId, myProfile, allProfiles]);

  // Funzione per tornare al proprio profilo
  const goToMyProfile = () => {
    navigate("/profilo");
    setDisplayedProfile(myProfile);
    setIsOwnProfile(true);
  };

  return (
    <>
      {/* section profilo */}
      {/* ! PAGE LAVORO --> la section profilo rimane invariata al cambio tra Home e Lavoro */}
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
                className="rounded-circle profile-image  "
                onClick={isOwnProfile ? handleShowImg : undefined}
                style={{ cursor: isOwnProfile ? "pointer" : "default" }}
              />
            </div>

            <div className="p-3 pt-5">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <h1 className="fs-3 m-0 me-2">
                    {displayedProfile.surname} {displayedProfile.name}
                  </h1>
                  <GoShieldCheck />
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
                <a className="fw-bold text-decoration-none">381 collegamenti</a>
              </div>

              {/* Pulsanti differenti in base al tipo di profilo */}
              {isOwnProfile ? (
                // Pulsanti per il proprio profilo
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
                // Pulsanti per i profili altrui
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
                    {displayedProfile.area} | in sede . Ibrido
                  </p>
                  <a href="#" className="text-decoration-none fw-bold">
                    Mostra dettagli
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* NUOVA SEZIONE: INFORMAZIONI / BIO (Mostrata sempre per tutti) */}
          <section className="bg-light border border-secondary rounded-3 p-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h2 className="fs-4 fw-bold m-0">Informazioni</h2>
              {isOwnProfile && (
                <FaPen size={15} style={{ cursor: "pointer" }} />
              )}
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

          {/* NUOVA SEZIONE: ESPERIENZE RESTRUTTURATE DALL'API (Mostrata sempre per tutti) */}
          <section className="bg-light border border-secondary rounded-3 p-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="fs-4 fw-bold m-0">Esperienza</h2>
              {isOwnProfile && (
                <Button
                  variant="outline-primary"
                  className="rounded-pill btn-sm fw-bold"
                >
                  + Aggiungi
                </Button>
              )}
            </div>

            {displayedProfile.experiences &&
            displayedProfile.experiences.length > 0 ? (
              <div className="d-flex flex-column gap-3">
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
            )}
          </section>
        </div>
      )}

      {/* modale pic */}
      {isOwnProfile && (
        <Modal show={showImg} onHide={handleCloseImg}>
          <Modal.Header closeButton className="bg-dark border-0">
            <Modal.Title className="text-light">Foto del profilo</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            <div className="w-100 justify-content-center d-flex">
              <Image
                src={displayedProfile?.image}
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
              onClick={handleCloseImg}
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
      )}

      {/* modale cover */}
      {isOwnProfile && (
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
      )}

      {/* Modal Preferenze Offerte Lavoro */}
      {isOwnProfile && (
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
                    text={displayedProfile?.area}
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
                  name="visibilità"
                  label="Solo recruiter"
                  id="available"
                />

                <FormCheck
                  type="radio"
                  name="visibilità"
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
              onClick={handleClosePref}
              className="rounded-pill m-0 py-0 "
            >
              Salva
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* modal Caricamento Foto */}
      {isOwnProfile && (
        <Modal show={showUpPic} onHide={handleCloseUpPic}>
          <Modal.Header closeButton className="bg-dark border-0">
            <Modal.Title className="text-light">
              Carica foto profilo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            <Form.Group>
              <Form.Label
                onClick={handleUpload}
                className="w-100 d-flex justify-content-center"
              >
                {preview && (
                  <Image
                    src={preview}
                    roundedCircle
                    className="linkedin-avatar "
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
                className="bg-transparent text-light border-0 border-bottom  "
                type="file"
                accept="image/*"
                onChange={(e) => {
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
              onClick={handleCloseUpPic}
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
      )}
    </>
  );
};

export default MainProfile;
