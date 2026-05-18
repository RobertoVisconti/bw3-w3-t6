import { IoMdAdd } from "react-icons/io";
import { PiPlanetBold } from "react-icons/pi";
import { Button } from "react-bootstrap";


const SingleArticle = function () {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
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
              <span>4g</span>
              <span className="text-black">
                ·
                <PiPlanetBold />
              </span>
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
      <div>
        <p>Descrizione</p>
        <img
          src="https://placecats.com/300/300"
          alt=""
          className="w-100 rounded-3"
        />
      </div>
    </div>
  );
};


export default SingleArticle