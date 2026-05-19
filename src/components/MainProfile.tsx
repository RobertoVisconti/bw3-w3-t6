import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { useEffect, useState } from "react"
import { getMyProfileAsync } from "../redux/actions/profileActions"
import { GoShieldCheck } from "react-icons/go"
import ButtonLinkedin from "./ButtonLinkedin"
import { IoPencil } from "react-icons/io5"
import ModalePresentazione from "./ModalePresentazione"

const MainProfile = () => {
  const [showMod, setShowMod] = useState(false)

  const handleCloseMod = () => setShowMod(false)
  const handleShowMod = () => setShowMod(true)

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
            <img
              src={myProfile.image || "https://placehold.co/30x30"}
              alt="foto profilo"
              className="rounded-circle profile-image"
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
              <IoPencil onClick={handleShowMod} />
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
              />
              <ButtonLinkedin
                text="Aggiungi sezione"
                className="text-primary bg-transparent rounded-pill w-100 mt-2 mb-4 fw-bold border-2"
                style={{ fontSize: "10px" }}
              />
              <ButtonLinkedin
                text="Migliore profilo"
                className="text-primary bg-transparent rounded-pill w-100 mt-2 mb-4 fw-bold border-2"
                style={{ fontSize: "10px" }}
              />
              <ButtonLinkedin
                text="..."
                className="text-primary bg-transparent rounded-pill w-100 mt-2 mb-4 fw-bold border-2 "
                style={{ fontSize: "10px" }}
              />
            </div>

            <div className="d-flex align-items-start rounded-2 flex-column  mt-3">
              <p className="p-0 m-0">
                <b>Disponibile a lavorare</b>
              </p>
              <p>{myProfile.area} | in sede . Ibrido</p>
              <a href="#" className="text-decoration-none fw-bold">
                Mostra dettagli
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
export default MainProfile
