import { BiNews } from "react-icons/bi";
import { FaBookmark, FaCalendarAlt, FaLinkedin } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";

const SidebarStartHome = () => {
  return (
    <div>
      {/* section premium */}
      <section className="bg-light border-card-linkedin rounded-3 p-3 mb-2">
        <p>Accedi a strumenti e informazioni in esclusiva</p>
        <div className="d-flex align-items-center">
          <FaLinkedin />
          <p className="m-0 ms-2">
            <b>Prova Premium per 0€</b>
          </p>
        </div>
      </section>
      {/* section visitatori */}
      <section className="bg-light border-card-linkedin rounded-3 p-3 mb-2">
        <div className="d-flex justify-content-between">
          <p>
            <b>visitatori del profilo</b>
          </p>
          <p>1</p>
        </div>
        <p>
          <b>vedi tutte le analisi</b>
        </p>
      </section>
      {/* section icon */}
      <section className="bg-light border-card-linkedin rounded-3 p-3">
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
    </div>
  );
};
export default SidebarStartHome;
