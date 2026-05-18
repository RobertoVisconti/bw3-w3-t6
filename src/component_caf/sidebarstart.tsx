import { BiNews } from "react-icons/bi"
import { FaBookmark, FaCalendarAlt, FaLinkedin } from "react-icons/fa"
import { GoShieldCheck } from "react-icons/go"
import { HiUserGroup } from "react-icons/hi"

const SidebarStart =()=>{
return(
    <>
    {/* section profilo */}
    <section className="bg-light border border-secondary rounded-3 my-2  ">
        {/* banner */}
        <div className=" w-100 custom-profile-card rounded-top-2 position-relative ">
        <img src="https://placebear.com/100/100" alt=" foto profilo"  className="rounded-circle profile-image"/>
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
            <img src="https://placebear.com/100/100" alt="logo-lavoro" className="me-3" />
            <p><b>luogo di lavoro</b></p>
        </div>
        </div>
    </section>
    {/* section premium */}
    <section className="bg-light border border-secondary rounded-3 p-3 mb-2">
        <p>Accedi a strumenti e informazioni in esclusiva</p>
        <div className="d-flex align-items-center">
            <FaLinkedin />
            <p className="m-0 ms-2"><b>Prova Premium per 0€</b></p>
        </div>
    </section>
    {/* section visitatori */}
    <section className="bg-light border border-secondary rounded-3 p-3 mb-2" >
        <div className="d-flex justify-content-between">

        <p><b>visitatori del profilo</b></p>
        <p>1</p>
        </div>
        <p><b>vedi tutte le analisi</b></p>
    </section>
    {/* section icon */}
   <section className="bg-light border border-secondary rounded-3 p-3">
    {/* bookmark */}
    <div className="d-flex align-items-center">
        <FaBookmark />
        <p className="m-0 ms-3"> Elementi salvati</p>
    </div>
    {/* persone */}
    <div className="d-flex align-items-center">
        <HiUserGroup />
        <p className="m-0 ms-3"> Gruppi</p>
    </div>
    {/* newsletter */}
    <div className="d-flex align-items-center">
       <BiNews />
        <p className="m-0 ms-3"> Newsletter</p>
    </div>
    {/* eventi */}
    <div className="d-flex align-items-center">
       <FaCalendarAlt />
        <p className="m-0 ms-3"> Eventi</p>
    </div>
   </section>
    </>)
}
export  default SidebarStart