import { GoShieldCheck } from "react-icons/go"
import SidebarStartHome from "./SidebarSartHome"
// import SidebarStartLavoro from "../lavoro/SidebarStartLavoro"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/store"
import { useEffect } from "react"
import { getMyProfileAsync } from "../../redux/actions/profileActions"
import { getExperience } from "../../redux/actions/experienceActions"

const SidebarStart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { myProfile, isLoading, error } = useSelector(
    (state: RootState) => state.profile,
  )

  const experiences = useSelector(
    (state: RootState) => state.experience.experiences,
  )
  console.log(experiences)

  useEffect(() => {
    dispatch(getMyProfileAsync())
  }, [dispatch])

  useEffect(() => {
    if (myProfile?._id) {
      dispatch(getExperience(myProfile._id))
    }
  }, [dispatch, myProfile?._id])

  return (
    <div
      className="position-sticky pt-2 d-none d-sm-block"
      style={{ top: "3em" }}
    >
      {/* section profilo */}
      {/* ! PAGE LAVORO --> la section profilo rimane invariata al cambio tra Home e Lavoro */}
      {isLoading && (
        <div className="text-center my-3">Caricamento profilo...</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      {myProfile && (
        <section className="bg-light rounded-3 my-2 border-card-linkedin">
          <a href="/profilo" className="text-decoration-none text-black">
            {/* banner */}
            <div
              className="w-100 custom-profile-card rounded-top-2 position-relative"
              style={{
                backgroundImage:
                  'url("https://png.pngtree.com/background/20250104/original/pngtree-free-vector-linkedin-banner-with-linked-technology-and-gradient-texture-picture-image_15305713.jpg")',
              }}
            >
              <img
                src={myProfile.image || "https://placehold.co/30x30"}
                alt="foto profilo"
                className="rounded-circle profile-image"
              />
            </div>
            <div className="p-3 pt-5">
              <div className="d-flex align-items-center">
                <h1 className="fs-3 m-0 me-2 link-custom">
                  {myProfile.surname} {myProfile.name}
                </h1>
                <GoShieldCheck />
              </div>
              <div>
                <p className="m-0 text-muted ">{myProfile.title}</p>
                <p className="m-0 text-secondary">{myProfile.area}</p>
              </div>
              <div className="d-flex align-items-center mt-3">
                <img
                  src={
                    experiences && experiences.length > 0
                      ? experiences[experiences.length - 1].image
                      : "https://placehold.co/30x30"
                  }
                  alt="logo-lavoro"
                  className="me-3 w-25"
                />
                <p className="p-0 m-0 link-custom">
                  <b>
                    {experiences && experiences.length > 0
                      ? experiences[experiences.length - 1].role
                      : "Nessuna esperienza"}
                  </b>
                </p>
              </div>
            </div>
          </a>
        </section>
      )}

      {/* ! PAGE LAVORO --> le section successive cambiano nella pagina Lavoro */}
      {/* ! PAGE HOME ! */}
      <div>
        <SidebarStartHome />
        {/* ! PAGE LAVORO! */}
        {/* <SidebarStartLavoro /> */}
      </div>
    </div>
  )
}

export default SidebarStart
