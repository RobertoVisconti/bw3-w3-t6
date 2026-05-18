import { Link } from "react-router-dom"
import {
  Navbar as BsNavbar,
  Container,
  Form,
  InputGroup,
  Image,
  Dropdown,
} from "react-bootstrap"
import {
  FaLinkedin,
  FaSearch,
  FaMapMarkerAlt,
  FaHome,
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
} from "react-icons/fa"

import { useEffect } from "react"
import { getMyProfileAsync } from "../redux/actions/profileActions"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"

import DropDownTu from "./DropdownTu"

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { myProfile, isLoading, error } = useSelector(
    (state: RootState) => state.profile,
  )

  useEffect(() => {
    dispatch(getMyProfileAsync())
  }, [dispatch])

  return (
    <>
      {isLoading && (
        <div className="text-center my-3">Caricamento profilo...</div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {myProfile && (
        <BsNavbar bg="white" className="border-bottom py-0 linkedin-navbar">
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

              <InputGroup size="sm" className="linkedin-search">
                <InputGroup.Text className="bg-white border-end-0 rounded-start-pill">
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Qualifica, competenza..."
                  className="border-start-0 rounded-end-pill shadow-none"
                />
              </InputGroup>

              <InputGroup size="sm" className="linkedin-location">
                <InputGroup.Text className="bg-white border-end-0 rounded-start-pill">
                  <FaMapMarkerAlt />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Città, stato o..."
                  className="border-start-0 rounded-end-pill shadow-none"
                />
              </InputGroup>
            </div>

            <div className="d-flex align-items-center">
              <Link to="/" className="linkedin-item">
                <FaHome />
                <span>Home</span>
              </Link>

              <Link to="/rete" className="linkedin-item">
                <FaUserFriends />
                <span>La mia rete</span>
              </Link>

              <Link to="/lavoro" className="linkedin-item active">
                <FaBriefcase />
                <span>Lavoro</span>
              </Link>

              <Link to="/messaggi" className="linkedin-item">
                <FaCommentDots />
                <span>Messaggistica</span>
              </Link>

              <Link to="/notifiche" className="linkedin-item">
                <FaBell />
                <span>Notifiche</span>
              </Link>

              <Dropdown className="linkedin-business-dropdown">
                <Dropdown.Toggle
                  as="div"
                  className=" button-custom  d-flex flex-column linkedin-item linkedin-business"
                >
                  <Image
                    src={myProfile.image || "/roberto.jpeg"}
                    roundedCircle
                    className="linkedin-avatar"
                    style={{
                      width: "24px",
                      height: "24px",
                      objectFit: "cover",
                    }}
                  />
                  <span className="button-custom">
                    Tu <FaCaretDown className="linkedin-caret " />
                  </span>
                  <Dropdown.Menu align="end" className="m-0 p-0">
                    <DropDownTu />
                  </Dropdown.Menu>
                </Dropdown.Toggle>
              </Dropdown>

              <div className="vr mx-2 linkedin-divider"></div>

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
                        <strong>Pubblica un'offerta di lavoro gratuita</strong>
                        <p className="small mb-0">Trova candidati di qualità</p>
                      </div>

                      <div className="mb-4">
                        <strong>Fai pubblicità su LinkedIn</strong>
                        <p className="small mb-0">
                          Acquisisci clienti e fai crescere la tua azienda
                        </p>
                      </div>

                      <div className="mb-4">
                        <strong>Inizia con Premium</strong>
                        <p className="small mb-0">
                          Amplia e sfrutta la tua rete
                        </p>
                      </div>

                      <div className="mb-4">
                        <strong>Impara con LinkedIn</strong>
                        <p className="small mb-0">
                          Corsi per formare i tuoi dipendenti
                        </p>
                      </div>

                      <div className="mb-5">
                        <strong>Centro per amministratori</strong>
                        <p className="small mb-0">
                          Gestisci i dettagli di fatturazione e account
                        </p>
                      </div>

                      <strong>Crea una pagina aziendale +</strong>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <Link
                to="/premium"
                className="linkedin-premium text-decoration-underline"
              >
                Prova premium per 0 €
              </Link>
            </div>
          </Container>
        </BsNavbar>
      )}
    </>
  )
}

export default Navbar
