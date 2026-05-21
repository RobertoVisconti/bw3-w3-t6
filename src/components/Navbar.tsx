import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Navbar as BsNavbar,
  Container,
  Form,
  InputGroup,
  Image,
  Dropdown,
  ListGroup,
  Modal,
  Button,
} from "react-bootstrap";
import {
  FaLinkedin,
  FaSearch,
  FaUserFriends,
  FaBriefcase,
  FaCommentDots,
  FaBell,
  FaTh,
  FaCaretDown,
  FaCompass,
  FaUsers,
  FaChartBar,
  FaCheckCircle,
  FaTimes,
  FaHome,
  FaBars,
} from "react-icons/fa";

import { useEffect, useState, useRef, useMemo } from "react";
import { getMyProfileAsync } from "../redux/actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

import DropDownTu from "./DropdownTu";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Stato di autenticazione reattivo
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Estraiamo i dati dallo store Redux
  const { myProfile, allProfiles, isLoading, error } = useSelector(
    (state: RootState) => state.profile,
  );

  // Controllo degli accessi ed esecuzione chiamate protetta
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!myProfile && !isLoading && !error) {
      dispatch(getMyProfileAsync());
    }
  }, [dispatch, isLoggedIn, navigate, myProfile, isLoading, error]);

  // Gestione della chiusura del dropdown cliccando fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🌟 OTTIMIZZAZIONE: Memorizziamo il filtro per evitare re-render infiniti in console
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return (allProfiles || []).filter((user) =>
      `${user.name} ${user.surname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  }, [allProfiles, searchQuery]);

  // Protezione di rotta immediata
  if (!isLoggedIn) {
    return null;
  }

  const isHomePath =
    location.pathname === "/" ||
    location.pathname.startsWith("/notizia") ||
    location.pathname.startsWith("/giochi");

  return (
    <>
      {isLoading && !myProfile && (
        <div className="text-center my-3 text-secondary small">
          Caricamento barra di navigazione...
        </div>
      )}

      {error && (
        <div className="alert alert-danger py-2 m-2 small">{error}</div>
      )}

      <BsNavbar
        bg="white"
        className="border-bottom py-1 linkedin-navbar position-relative"
        expand="md"
      >
        <Container
          fluid="lg"
          className="d-flex align-items-center justify-content-between gap-2 px-3"
        >
          {/* SEZIONE SINISTRA: Logo + Search Bar */}
          <div className="d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0">
            <Link
              to="/"
              className="text-primary fs-1 lh-1 d-flex align-items-center text-decoration-none"
            >
              <FaLinkedin />
            </Link>

            <div
              className="position-relative flex-grow-1"
              ref={dropdownRef}
              style={{ maxWidth: "280px", minWidth: "180px" }}
            >
              <InputGroup size="sm" className="linkedin-search">
                <InputGroup.Text className="bg-white border-end-0 rounded-start-pill text-secondary">
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Qualifica, competenza..."
                  className="border-start-0 rounded-end-pill shadow-none"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                />
              </InputGroup>

              {showDropdown && searchQuery.trim() !== "" && (
                <ListGroup
                  className="position-absolute w-100 shadow-lg mt-1 overflow-auto"
                  style={{
                    maxHeight: "280px",
                    zIndex: 1100,
                    borderRadius: "8px",
                  }}
                >
                  {filteredResults.length > 0 ? (
                    filteredResults.map((user) => (
                      <ListGroup.Item
                        key={user._id}
                        action
                        className="d-flex align-items-center gap-2 py-2 border-start-0 border-end-0"
                        onClick={() => {
                          navigate(`/profilo/${user._id}`);
                          setShowDropdown(false);
                          setSearchQuery("");
                        }}
                      >
                        <img
                          src={user.image || "https://placecats.com/30/30"}
                          alt={user.name}
                          className="rounded-circle"
                          style={{
                            width: "28px",
                            height: "28px",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          className="d-flex flex-column overflow-hidden"
                          style={{ lineHeight: "1.2" }}
                        >
                          <span
                            className="fw-semibold text-dark small text-truncate"
                            style={{ fontSize: "0.82rem" }}
                          >
                            {user.name} {user.surname}
                          </span>
                          <span
                            className="text-muted text-truncate"
                            style={{ fontSize: "0.72rem" }}
                          >
                            {user.title || "Membro LinkedIn"}
                          </span>
                        </div>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item className="text-muted small py-3 text-center bg-white">
                      Nessun utente trovato
                    </ListGroup.Item>
                  )}
                </ListGroup>
              )}
            </div>
          </div>

          {/* MOBILE HAMBURGER BUTTON (Allineato a destra simmetricamente) */}
          <button
            type="button"
            className="mobile-hamburger-btn border-0 bg-transparent d-md-none p-2 fs-4"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <FaBars />
          </button>

          {/* MENU MOBILE PANEL */}
          {showMobileMenu && (
            <div className="mobile-menu-panel shadow-sm border-bottom">
              <Link
                to="/"
                className="mobile-menu-item"
                onClick={() => setShowMobileMenu(false)}
              >
                <FaHome /> Home
              </Link>
              <Link
                to="/rete"
                className="mobile-menu-item"
                onClick={() => setShowMobileMenu(false)}
              >
                <FaUserFriends /> Rete
              </Link>
              <Link
                to="/lavoro"
                className="mobile-menu-item"
                onClick={() => setShowMobileMenu(false)}
              >
                <FaBriefcase /> Lavoro
              </Link>
              <Link
                to="/messaggistica"
                className="mobile-menu-item"
                onClick={() => setShowMobileMenu(false)}
              >
                <FaCommentDots /> Messaggistica
              </Link>
              <Link
                to="/notifiche"
                className="mobile-menu-item"
                onClick={() => setShowMobileMenu(false)}
              >
                <FaBell /> Notifiche
              </Link>
              <div className="mobile-menu-item gap-2">
                <Image
                  src={myProfile?.image || "/roberto.jpeg"}
                  roundedCircle
                  style={{ width: "24px", height: "24px", objectFit: "cover" }}
                />
                Tu
              </div>
              <div className="mobile-menu-item">
                <FaTh /> Per le aziende
              </div>
              <button
                type="button"
                className="mobile-menu-item mobile-premium-item border-0 bg-transparent text-decoration-underline text-start"
                onClick={() => {
                  setShowPremiumModal(true);
                  setShowMobileMenu(false);
                }}
              >
                Prova premium per 0 €
              </button>
            </div>
          )}

          {/* SEZIONE DESTRA: Link di Navigazione Desktop (Distanze uniformi ed equilibrate) */}
          <BsNavbar.Collapse
            id="navbar-links"
            className="justify-content-md-end flex-grow-0"
          >
            <div className="d-flex align-items-center gap-3 gap-lg-4">
              <Link
                to="/"
                className={
                  isHomePath
                    ? "linkedin-item text-black active"
                    : "linkedin-item"
                }
              >
                <FaHome />
                <span>Home</span>
              </Link>

              <Link
                to="/rete"
                className={
                  location.pathname.includes("/rete")
                    ? "linkedin-item text-black active"
                    : "linkedin-item"
                }
              >
                <FaUserFriends />
                <span>Rete</span>
              </Link>

              <Link
                to="/lavoro"
                className={
                  location.pathname.includes("/lavoro") ||
                  location.pathname.includes("/dettaglio-lavoro")
                    ? "linkedin-item text-black active"
                    : "linkedin-item"
                }
              >
                <FaBriefcase />
                <span>Lavoro</span>
              </Link>

              <Link
                to="/messaggistica"
                className={
                  location.pathname.includes("/messaggistica")
                    ? "linkedin-item text-black active"
                    : "linkedin-item"
                }
              >
                <FaCommentDots />
                <span>Messaggistica</span>
              </Link>

              <Link
                to="/notifiche"
                className={
                  location.pathname.includes("/notifiche")
                    ? "linkedin-item text-black active"
                    : "linkedin-item"
                }
              >
                <FaBell />
                <span>Notifiche</span>
              </Link>

              {/* Dropdown "Tu" */}
              <Dropdown className="linkedin-business-dropdown">
                <Dropdown.Toggle
                  as="div"
                  className="d-flex flex-column align-items-center linkedin-item cursor-pointer"
                >
                  <Image
                    src={myProfile?.image || "/roberto.jpeg"}
                    roundedCircle
                    className="linkedin-avatar mb-1"
                    style={{
                      width: "24px",
                      height: "24px",
                      objectFit: "cover",
                    }}
                  />
                  <span className="d-flex align-items-center gap-1">
                    Tu <FaCaretDown className="linkedin-caret" />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align="end"
                  className="m-0 p-0 shadow-lg"
                  style={{ minWidth: "400px" }}
                >
                  <DropDownTu />
                </Dropdown.Menu>
              </Dropdown>

              {/* Divisore Verticale Nativo e Pulito */}
              <div
                className="border-start d-none d-md-block"
                style={{ height: "32px", opacity: "0.15" }}
              ></div>

              {/* Dropdown "Per le aziende" */}
              <Dropdown className="linkedin-business-dropdown">
                <Dropdown.Toggle
                  as="div"
                  className="d-flex flex-column align-items-center linkedin-item cursor-pointer"
                >
                  <FaTh className="mb-1" />
                  <span className="d-flex align-items-center gap-1 text-center">
                    Per le aziende <FaCaretDown className="linkedin-caret" />
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  align="end"
                  className="linkedin-business-menu p-0 shadow-lg"
                >
                  <div className="d-flex">
                    <div className="business-left p-4">
                      <h6 className="fw-bold mb-4">Le mie app</h6>
                      <div className="business-app mb-4">
                        <FaCompass className="business-icon" />
                        <strong>Vendi</strong>
                      </div>
                      <div className="business-app mb-4">
                        <FaUsers className="business-icon" />
                        <strong>Gruppi</strong>
                      </div>
                      <p className="text-secondary fw-bold small mb-4">
                        Talent
                      </p>
                      <div className="business-app mb-4">
                        <FaBriefcase className="business-icon" />
                        <strong>Assumi con l'IA</strong>
                      </div>
                      <div className="business-app mb-4">
                        <FaChartBar className="business-icon" />
                        <strong>Talent Insights</strong>
                      </div>
                      <p className="text-secondary fw-bold small mb-4">
                        Vendite
                      </p>
                      <div className="business-app">
                        <FaCheckCircle className="business-icon" />
                        <strong>Marketplace dei servizi</strong>
                      </div>
                    </div>

                    <div className="business-right p-4 bg-light border-start">
                      <h6 className="fw-bold mb-4">
                        Scopri altro per il business
                      </h6>
                      <div className="mb-4">
                        <strong>Assumi su LinkedIn</strong>
                        <p className="small mb-0 text-muted">
                          Trova, attrai e assumi
                        </p>
                      </div>
                      <div className="mb-4">
                        <strong>Vendi con LinkedIn</strong>
                        <p className="small mb-0 text-muted">
                          Sblocca nuove opportunità di vendita
                        </p>
                      </div>
                      <div className="mb-4">
                        <strong>Pubblica un'offerta di lavoro gratuita</strong>
                        <p className="small mb-0 text-muted">
                          Trova candidati di qualità
                        </p>
                      </div>
                      <div className="mb-4">
                        <strong>Fai pubblicità su LinkedIn</strong>
                        <p className="small mb-0 text-muted">
                          Acquisisci clienti e fai crescere l'azienda
                        </p>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              {/* Link Premium */}
              <button
                type="button"
                className="linkedin-premium text-decoration-underline border-0 bg-transparent small fw-semibold text-warning-emphasis"
                onClick={() => setShowPremiumModal(true)}
                style={{
                  fontSize: "0.8rem",
                  maxWidth: "90px",
                  lineHeight: "1.2",
                }}
              >
                Prova premium per 0 €
              </button>
            </div>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>

      {/* MODAL PREMIUM (Invariato nella logica, pulito nelle spaziature interne) */}
      <Modal
        show={showPremiumModal}
        onHide={() => setShowPremiumModal(false)}
        dialogClassName="premium-modal"
        centered
      >
        <Modal.Body className="p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h6 className="fw-bold mb-0 lh-sm">
              Roberto, metti il turbo alla tua
              <br />
              carriera
            </h6>
            <Button
              variant="link"
              className="text-dark p-0 border-0 shadow-none"
              onClick={() => setShowPremiumModal(false)}
            >
              <FaTimes size={22} />
            </Button>
          </div>

          <div className="d-flex flex-column gap-3 mb-4">
            <div className="d-flex gap-3 align-items-center">
              <span className="text-warning fw-bold fs-5">✓</span>
              <span className="small text-black">
                Contatta chiunque con i messaggi InMail
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <span className="text-warning fw-bold fs-5">✓</span>
              <span className="small text-black">
                Ottieni 11 volte più visualizzazioni del profilo
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <span className="text-warning fw-bold fs-5">✓</span>
              <span className="small text-black">
                Accedi a informazioni esclusive sulle aziende
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <span className="text-warning fw-bold fs-5">✓</span>
              <span className="small text-black">
                Partecipa a conversazioni live con leader di settore
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center mb-4">
            <div className="d-flex me-3">
              <Image
                src="https://placehold.co/28x28"
                roundedCircle
                className="border border-white"
                style={{
                  width: "28px",
                  height: "28px",
                  objectFit: "cover",
                  marginRight: "-9px",
                  zIndex: 3,
                }}
              />
              <Image
                src="https://placehold.co/28x28"
                roundedCircle
                className="border border-white"
                style={{
                  width: "28px",
                  height: "28px",
                  objectFit: "cover",
                  marginRight: "-9px",
                  zIndex: 2,
                }}
              />
              <Image
                src="https://placehold.co/28x28"
                roundedCircle
                className="border border-white"
                style={{
                  width: "28px",
                  height: "28px",
                  objectFit: "cover",
                  zIndex: 1,
                }}
              />
            </div>
            <span className="text-secondary small">
              Milioni di utenti usano Premium
            </span>
          </div>

          <div className="d-grid">
            <Button
              className="rounded-pill fw-semibold border-0 py-2 mb-3 shadow-none"
              style={{ backgroundColor: "#f8c77e", color: "black" }}
            >
              Prova 1 mese di Premium per 0 €
            </Button>
          </div>

          <p className="text-secondary small mb-0 lh-sm text-center">
            Prova gratuita di 1 mese con assistenza 24/7. Facile da annullare.
            Ti invieremo un promemoria 7 giorni prima della fine del periodo di
            prova.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navbar;
