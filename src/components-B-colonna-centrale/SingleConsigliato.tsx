import { Button } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";

const SingleConsigliato = function () {
  return (
    <div className="d-flex align-items-center justify-content-between border-bottom py-1">
      <div className="d-flex align-items-center gap-2 border-0">
        <img
          src="https://placecats.com/60/60"
          alt=""
          className="rounded-circle"
        />
        <div className="d-flex flex-column">
          <span className="fw-bold">Nome autore Articolo</span>
          <span className="text-secondary small">
            Professione , descrizione
          </span>
          <span className="text-secondary small">
            <FaArrowTrendUp className="me-1 text-black" />
            altro......
          </span>
        </div>
      </div>
      <div>
        <Button variant="outline-primary" className="rounded-5">
          <span>
            <IoMdAdd />
            Segui
          </span>
        </Button>
      </div>
    </div>
  );
};


export default SingleConsigliato