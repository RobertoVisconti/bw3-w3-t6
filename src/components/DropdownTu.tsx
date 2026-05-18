import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"

import { useEffect } from "react"
import { getMyProfileAsync } from "../redux/actions"
import { GoShieldCheck } from "react-icons/go"
import { Button, Col } from "react-bootstrap"
import type { FooterLink } from "../components/FooterLinkProfile"

const DropDownTu = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { myProfile, isLoading, error } = useSelector(
    (state: RootState) => state.profile,
  )

  useEffect(() => {
    dispatch(getMyProfileAsync())
  }, [dispatch])

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
              <img
                src={myProfile.image || "https://placehold.co/30x30"}
                alt="foto profilo"
                className="rounded-circle w-25 h-25 me-4"
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

            <Button className="text-primary bg-transparent rounded-pill w-100 mt-2 mb-4 fw-bold border-2">
              Visualizza profilo
            </Button>

            {links.slice(0, 5).map((link, i) => {
              return (
                <Col xs={12} className={i === 0 ? "bold-link" : ""}>
                  {" "}
                  <a
                    key={i}
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
                <Col xs={12} className={i === 0 ? "bold-link" : ""}>
                  {" "}
                  <a
                    key={i}
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
                <Col xs={12} className={i === 0 ? "bold-link" : ""}>
                  {" "}
                  <a
                    key={i}
                    href={link.url}
                    className="text-decoration-none text-muted small d-inline-block mb-2"
                  >
                    {link.label}
                  </a>
                </Col>
              )
            })}

            {/* <div>
              <p>
                <b>Account</b>
              </p>
              <p>Prova 1 mese di Premium per 0€</p>
              <p>impostazioni e privacy</p>
              <p>Guida</p>
              <p>Lingua</p>
              <hr />
              <p>
                <b>Gestisci</b>
              </p>
              <p>Post e aattività</p>
              <p>Account per la pubblicazione di offerte di lavoro</p>
              <hr />
              <p>Esci</p>
            </div> */}
          </section>
        </>
      )}
    </>
  )
}

export default DropDownTu
