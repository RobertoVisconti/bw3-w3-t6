import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"

import { useEffect } from "react"
import { getMyProfileAsync } from "../redux/actions"
import { GoShieldCheck } from "react-icons/go"
import { Button } from "react-bootstrap"

const DropDawnTu = () => {
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

                <p className="m-0 text-muted">{myProfile.title}</p>
              </div>
            </div>

            <Button className="text-info bg-transparent rounded-pill w-100 mt-2">
              Visualizza profilo
            </Button>
            <hr className="text-dark" />
            <div>
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
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default DropDawnTu
