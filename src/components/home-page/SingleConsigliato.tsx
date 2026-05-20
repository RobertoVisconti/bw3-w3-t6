import { Button } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import type { Profile } from "../../interfaces/interfaces";

interface SingleConsigliatoProps {
  profilo: Profile;
}

const SingleConsigliato = function ({ profilo }: SingleConsigliatoProps) {
  return (
    <div className="d-flex align-items-center justify-content-between border-bottom py-2">
      <div className="d-flex align-items-center gap-2 border-0 overflow-hidden">
        <img
          src={profilo?.image || "https://placecats.com/60/60"}
          alt={`${profilo?.name} ${profilo?.surname}`}
          className="rounded-circle"
          style={{
            width: "48px",
            height: "48px",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        <div className="d-flex flex-column text-truncate">
          <span className="fw-bold text-dark text-truncate">
            {profilo?.name} {profilo?.surname}
          </span>
          <span className="text-secondary small text-truncate">
            {profilo?.title || "Membro di LinkedIn"}
          </span>
          <span className="text-secondary small text-truncate">
            <FaArrowTrendUp className="me-1 text-black" />
            Consigliato in base ai tuoi interessi
          </span>
        </div>
      </div>
      <div className="ms-2">
        <Button
          variant="outline-secondary"
          className="rounded-5 btn-sm px-3 fw-semibold"
        >
          <span className="d-flex align-items-center gap-1">
            <IoMdAdd className="fs-5" />
            Segui
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SingleConsigliato;
