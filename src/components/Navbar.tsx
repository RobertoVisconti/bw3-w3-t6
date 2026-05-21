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
      // Evita di sparare fetch a raffica se c'è già un caricamento in corso o un errore 429
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

      {/* 🌟 ROBUSTEZZA: Mostriamo comunque la struttura della Navbar anche se il profilo sta caricando */}
      <BsNavbar
        bg="white"
        className="border-bottom py-0 linkedin-navbar position-relative"
        expand="md"
      >
        <Container
          fluid
          className="d-flex align-items-center justify-content-center gap-3"
        >
          <div className="d-flex align-items-center gap-2">
            <Link
              to="/"
              className="text-primary fs-1 lh-1 d-flex align-items-center text-decoration-none"
            >
              <FaLinkedin />
            </Link>

            <div
              className="position-relative"
              ref={dropdownRef}
              style={{ width: "240px" }}
            >
              <InputGroup size="sm" className="linkedin-search">
                <InputGroup.Text className="bg-white border-end-0 rounded-start-pill">
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

          <div className="d-flex align-items-center position-relative">
            <button
              type="button"
              className="mobile-hamburger-btn border-0 bg-transparent"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <FaBars />
            </button>

            {showMobileMenu && (
              <div className="mobile-menu-panel">
                <Link
                  to="/"
                  className="mobile-menu-item"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <FaHome />
                  Home
                </Link>

                <Link
                  to="/rete"
                  className="mobile-menu-item"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <FaUserFriends />
                  Rete
                </Link>

                <Link
                  to="/lavoro"
                  className="mobile-menu-item"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <FaBriefcase />
                  Lavoro
                </Link>

                <Link
                  to="/messaggistica"
                  className="mobile-menu-item"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <FaCommentDots />
                  Messaggistica
                </Link>

                <Link
                  to="/notifiche"
                  className="mobile-menu-item"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <FaBell />
                  Notifiche
                </Link>

                <div className="mobile-menu-item">
                  <Image
                    src={myProfile?.image || "/roberto.jpeg"}
                    roundedCircle
                    style={{
                      width: "24px",
                      height: "24px",
                      objectFit: "cover",
                    }}
                  />
                  Tu
                </div>

                <div className="mobile-menu-item">
                  <FaTh />
                  Per le aziende
                </div>

                <button
                  type="button"
                  className="mobile-menu-item mobile-premium-item border-0 bg-transparent text-decoration-underline"
                  onClick={() => {
                    setShowPremiumModal(true);
                    setShowMobileMenu(false);
                  }}
                >
                  Prova premium per 0 €
                </button>
              </div>
            )}

            <BsNavbar.Collapse id="navbar-links">
              <div className="d-flex justify-content-between w-100">
                <Link
                  to="/"
                  className={
                    isHomePath
                      ? "linkedin-item text-black home-shift"
                      : "linkedin-item home-shift"
                  }
                >
                  <FaHome />
                  <span>Home</span>
                </Link>

                <Link
                  to="/rete"
                  className={
                    location.pathname.includes("/rete")
                      ? "linkedin-item text-black"
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
                      ? "linkedin-item text-black"
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
                      ? "linkedin-item text-black"
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
                      ? "linkedin-item text-black"
                      : "linkedin-item"
                  }
                >
                  <FaBell />
                  <span>Notifiche</span>
                </Link>

                <Dropdown className="linkedin-business-dropdown">
                  <Dropdown.Toggle
                    as="div"
                    className="button-custom d-flex flex-column linkedin-item linkedin-business"
                  >
                    <Image
                      src={myProfile?.image || "/roberto.jpeg"} // Operatore Optional Chaining di sicurezza
                      roundedCircle
                      className="linkedin-avatar"
                      style={{
                        width: "25px",
                        height: "25px",
                        objectFit: "cover",
                      }}
                    />

                    <span className="button-custom">
                      Tu <FaCaretDown className="linkedin-caret" />
                    </span>

                    <Dropdown.Menu align="end" className="m-0 p-0">
                      <DropDownTu />
                    </Dropdown.Menu>
                  </Dropdown.Toggle>
                </Dropdown>
              </div>

              {/* <div className="vr mx-2 linkedin-divider"></div> */}

              <div className="d-md-flex d-none">
                <Dropdown className="linkedin-business-dropdown">
                  <Dropdown.Toggle
                    as="div"
                    className="linkedin-item linkedin-business"
                  >
                    <FaTh />
                    <span>
                      Per le aziende <FaCaretDown className="linkedin-caret" />
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    align="end"
                    className="linkedin-business-menu p-0"
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

                      <div className="business-right p-4">
                        <h6 className="fw-bold mb-4">
                          Scopri altro per il business
                        </h6>

                        <div className="mb-4">
                          <strong>Assumi su LinkedIn</strong>
                          <p className="small mb-0">Trova, attrai e assumi</p>
                        </div>

                        <div className="mb-4">
                          <strong>Vendi con LinkedIn</strong>
                          <p className="small mb-0">
                            Sblocca nuove opportunità di vendita
                          </p>
                        </div>

                        <div className="mb-4">
                          <strong>
                            Pubblica un'offerta di lavoro gratuita
                          </strong>
                          <p className="small mb-0">
                            Trova candidati di qualità
                          </p>
                        </div>

                        <div className="mb-4">
                          <strong>Fai pubblicità su LinkedIn</strong>
                          <p className="small mb-0">
                            Acquisisci clienti e fai crescere l'azienda
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

                <button
                  type="button"
                  className="linkedin-premium text-decoration-underline border-0 bg-transparent"
                  onClick={() => setShowPremiumModal(true)}
                >
                  Prova premium per 0 €
                </button>
              </div>
            </BsNavbar.Collapse>
          </div>
        </Container>
      </BsNavbar>

      <Modal
        show={showPremiumModal}
        onHide={() => setShowPremiumModal(false)}
        dialogClassName="premium-modal"
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
              className="text-dark p-0 border-0"
              onClick={() => setShowPremiumModal(false)}
            >
              <FaTimes size={22} />
            </Button>
          </div>

          <div className="d-flex flex-column gap-3 mb-3">
            <div className="d-flex gap-3">
              <span className="text-warning fw-bold fs-5">✓</span>
              <span className="small text-black">
                Contatta chiunque con i messaggi InMail
              </span>
            </div>

            <div className="d-flex gap-3">
              <span className="text-warning fw-bold fs-5">✓</span>
              <span className="small text-black">
                Ottieni 11 volte più visualizzazioni del profilo
              </span>
            </div>

            <div className="d-flex gap-3">
              <span className="text-warning fw-bold fs-5">✓</span>
              <span className="small text-black">
                Accedi a informazioni esclusive sulle aziende
              </span>
            </div>

            <div className="d-flex gap-3">
              <span className="text-warning fw-bold fs-5">✓</span>
              <span className="small text-black">
                Partecipa a conversazioni live con leader di settore
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center mb-3">
            <div className="d-flex me-2">
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

          <Button
  className="rounded-pill fw-semibold border-0 px-4 py-2 mb-3"
  style={{ backgroundColor: "#f8c77e", color: "black" }}
  onClick={() => {
    setShowPremiumModal(false);
    navigate("/premium");
  }}
>
  Prova 1 mese di Premium per 0 €
</Button>

          <p className="text-secondary small mb-0 lh-sm">
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
