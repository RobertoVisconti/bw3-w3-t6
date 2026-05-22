import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"

import { useEffect, useState } from "react"
import { getMyProfileAsync } from "../redux/actions/profileActions"
import { GoShieldCheck } from "react-icons/go"
import { Col, Image } from "react-bootstrap"

import { useNavigate } from "react-router-dom"
import ButtonLinkedin from "./generali/ButtonLinkedin"
import OffcanvasGuida from "./generali/OffcanvasGuida"

interface LocalFooterLink {
  label: string
  path?: string
  isLogout?: boolean
  onClick?: () => void
}

const DropDownTu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { myProfile, isLoading, error } = useSelector(
    (state: RootState) => state.profile,
  )

  useEffect(() => {
    dispatch(getMyProfileAsync())
  }, [dispatch])

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    localStorage.removeItem("isLoggedIn")
    window.location.href = "/login"
  }

  // costante per l'offcanvas di guida
  const [showGuida, setShowGuida] = useState(false)

  const links: LocalFooterLink[] = [
    { label: "Account", path: "/account" },
    { label: "Prova 1 mese di Premium per 0€", path: "/premium" },
    { label: "Impostazioni e privacy", path: "/impostazioni" },
    { label: "Guida", onClick: () => setShowGuida(true) },
    { label: "Lingua", path: "/Languages" },
    { label: "Gestisci", path: "/manage" },
    { label: "Post e attività", path: "/mypost" },
    {
      label: "Account per la pubblicazione di offerte di lavoro",
      path: "/crearelavoro",
    },
    { label: "Esci", isLogout: true },
  ]

  // 3. Funzione centralizzata per gestire il click sui link
  const handleLinkClick = (e: React.MouseEvent, link: LocalFooterLink) => {
    e.preventDefault()

    if (link.isLogout) {
      handleLogout(e)
    } else if (link.onClick) {
      link.onClick()
    } else if (link.path) {
      navigate(link.path)
    }
  }

  return (
    <>
      {isLoading && (
        <div className="text-center my-3">Caricamento profilo...</div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {myProfile && (
        <section className="d-flex flex-column bg-light border border-secondary rounded-3  align-items-center p-3">
          <div className="d-flex">
            <Image
              src={myProfile.image}
              roundedCircle
              className="linkedin-avatar me-3 "
              alt="foto-profilo"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                cursor: "pointer", // Aggiunto per far capire che è cliccabile
                aspectRatio: "1/1",
              }}
              onClick={() => navigate("/profilo")}
            />

            <div>
              <div className="d-flex align-items-center">
                <h1 className="fs-5 m-0 me-2 link-custom">
                  {myProfile.surname} {myProfile.name}
                </h1>
                <GoShieldCheck />
              </div>

              <p className="m-0 text-muted text-wrap">{myProfile.title}</p>
            </div>
          </div>
          <div className="d-flex">
            <ButtonLinkedin
              text="Visualizza profilo"
              className="text-primary bg-transparent rounded-pill w-100 mt-2 mb-4 fw-bold border-2"
              to="/profilo"
            />
            <ButtonLinkedin
              text="Verifica ora"
              className="text-primary bg-transparent rounded-pill w-100 mt-2 mb-4 ms-3 fw-bold border-2"
              to="/Authentication"
            />
          </div>
          {/* Primi 5 Link (Indici 0-4) */}
          {links.slice(0, 5).map((link, i) => (
            <Col xs={12} key={i} className={i === 0 ? "bold-link" : ""}>
              <a
                href="#"
                onClick={(e) => handleLinkClick(e, link)}
                className="text-decoration-none text-muted small d-inline-block mb-2"
              >
                {link.label}
              </a>
            </Col>
          ))}

          <hr className="w-100" />
          {/* Aggiunto w-100 per renderlo visibile a tutta larghezza se necessario */}
          {/* Successivi 3 Link (Indici 5-7) */}
          {links.slice(5, 8).map((link, i) => (
            <Col xs={12} key={i} className={i === 0 ? "bold-link" : ""}>
              <a
                href="#"
                onClick={(e) => handleLinkClick(e, link)}
                className="text-decoration-none text-muted small d-inline-block mb-2"
              >
                {link.label}
              </a>
            </Col>
          ))}
          {/* Ultimo Link - Esci (Indice 8) */}
          {links.slice(8, 9).map((link, i) => (
            <Col xs={12} key={i} className="bold-link">
              <a
                href="#"
                onClick={(e) => handleLinkClick(e, link)}
                className="text-decoration-none text-danger fw-semibold small d-inline-block mb-2"
              >
                {link.label}
              </a>
            </Col>
          ))}
          <OffcanvasGuida
            show={showGuida}
            handleClose={() => setShowGuida(false)}
          />
        </section>
      )}
    </>
  )
}

export default DropDownTu
