import { GoShieldCheck } from "react-icons/go"

import SidebarStartHome from "./SidebarSartHome"
import SidebarStartLavoro from "./SidebarStartLavoro"

const SidebarStart = () => {
  return (
    <>
      {/* section profilo */}
      {/* ! PAGE LAVORO -->la section profilo rimane invarita al cambio tra Home e Lavoro  */}
      <section className="bg-light border border-secondary rounded-3 my-2  ">
        {/* banner */}
        <div className=" w-100 custom-profile-card rounded-top-2 position-relative ">
          <img
            src="https://placebear.com/100/100"
            alt=" foto profilo"
            className="rounded-circle profile-image"
          />
        </div>
        <div className="p-3 pt-5">
          <div className="d-flex align-items-center">
            <h1 className="fs-3 m-0 me-2">Nome Profilo</h1>
            <GoShieldCheck />
          </div>
          <div>
            <p>professione</p>
            <p>localizzazione</p>
          </div>
          <div className="d-flex align-items-center">
            <img
              src="https://placebear.com/100/100"
              alt="logo-lavoro"
              className="me-3"
            />
            <p>
              <b>luogo di lavoro</b>
            </p>
          </div>
        </div>
      </section>
      {/* ! PAGE LAVORO --> le section successive cambiano nella pagina Lavoro */}
      {/* ! PAGE HOME ! */}
      <div>
        <SidebarStartHome />
        {/* ! PAGE LAVORO! */}
        {/* <SidebarStartLavoro /> */}
      </div>
    </>
  )
}
export default SidebarStart
