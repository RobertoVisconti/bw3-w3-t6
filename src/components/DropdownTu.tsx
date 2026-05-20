import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"

import { useEffect } from "react"
import { getMyProfileAsync } from "../redux/actions/profileActions"
import { GoShieldCheck } from "react-icons/go"
import { Col, Image } from "react-bootstrap"
import type { FooterLink } from "../components/FooterLinkProfile"
import ButtonLinkedin from "./ButtonLinkedin"
import { useNavigate } from "react-router-dom"

const DropDownTu = () => {
  // funzuoine navigazione
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { myProfile, isLoading, error } = useSelector(
    (state: RootState) => state.profile,
  )

  useEffect(() => {
    dispatch(getMyProfileAsync())
  }, [dispatch])

  // Funzione per gestire la disconnessione reale
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()

    localStorage.removeItem("isLoggedIn")

    window.location.href = "/login"
  }

  const links: FooterLink[] = [
    { label: "Account", url: "#" },
    { label: "Prova 1 mese di Premium per 0€", url: "#" },
    { label: "impostazioni e privacy", url: "#" },
    { label: "Guida", url: "#" },
    { label: "Lingua", url: "#" },
    { label: "Gestisci", url: "#" },
    { label: "Post e attività", url: "#" },
    { label: "Account per la pubblicazione di offerte di lavoro", url: "#" },
    { label: "Esci", url: "#" },
  ]

  return (
    <>
      {/* section profilo */}
      {/* ! PAGE LAVORO --> la section profilo rimane invariata al cambio tra Home e Lavoro */}
      {isLoading && (
        <div className="text-center my-3">Caricamento profilo...</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {myProfile && (
        <>
          <section className=" d-flex  flex-column bg-light border border-secondary rounded-3 my-2 align-items-center p-3">
            <div className="d-flex">
              <Image
                src={myProfile?.image}
                roundedCircle
                className="linkedin-avatar  me-3"
                alt="foto-profilo"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
                onClick={() => navigate("/profilo")}
              />
              <div>
                <div className="d-flex align-items-center">
                  <h1 className="fs-5 m-0 me-2">
                    {myProfile.surname} {myProfile.name}
                  </h1>
                  <GoShieldCheck />
                </div>
                <p className="m-0 text-muted text-wrap">{myProfile.title}</p>
              </div>
            </div>
            <ButtonLinkedin
              text="Visualizza profilo"
              className="text-primary bg-transparent rounded-pill w-100 mt-2 mb-4 fw-bold border-2 "
              to="/profilo"
            />

            {links.slice(0, 5).map((link, i) => {
              return (
                <Col xs={12} key={i} className={i === 0 ? "bold-link" : ""}>
                  {" "}
                  <a
                    href={link.url}
                    className="text-decoration-none text-muted small d-inline-block mb-2  "
                  >
                    {link.label}
                  </a>
                </Col>
              )
            })}
            <hr />
            {links.slice(5, 8).map((link, i) => {
              return (
                <Col xs={12} key={i} className={i === 0 ? "bold-link" : ""}>
                  {" "}
                  <a
                    href={link.url}
                    className="text-decoration-none text-muted small d-inline-block mb-2  "
                  >
                    {link.label}
                  </a>
                </Col>
              )
            })}

            {links.slice(8, 9).map((link, i) => {
              return (
                <Col xs={12} key={i} className="bold-link">
                  {" "}
                  <a
                    href={link.url}
                    onClick={handleLogout}
                    className="text-decoration-none text-danger fw-semibold small d-inline-block mb-2"
                  >
                    {link.label}
                  </a>
                </Col>
              )
            })}
          </section>
        </>
      )}
    </>
  )
}

export default DropDownTu
