import { FaBookmark, FaListUl } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { PiNoteFill } from "react-icons/pi";

const SidebarStartLavoro = () => {
  return (
    <section className="bg-light border border-secondary rounded-3 p-3">
      {/* preferenze */}
      <div className="d-flex align-items-center">
        <FaListUl />
        <p className="m-0 ms-3 fw-bold"> Preferenze</p>
      </div>
      {/* bookmark */}
      <div className="d-flex align-items-center ">
        <FaBookmark />
        <p className="m-0 ms-3 fw-bold fs-6">Tracker delle offerte di lavoro</p>
      </div>
      {/* info */}
      <div className="d-flex align-items-center">
        <ImLinkedin />
        <p className="m-0 ms-3 fw-bold"> Le mie informazioni sulla carriere </p>
      </div>
      <hr />
      {/* pubblica offerte */}
      <div className="d-flex align-items-center">
        <PiNoteFill />
        <p className="m-0 ms-3 fw-bold"> Pubblica offerte di lavoro gratuita</p>
      </div>
    </section>
  );
};
export default SidebarStartLavoro;
