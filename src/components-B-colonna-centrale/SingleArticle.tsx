import { IoMdAdd } from "react-icons/io";
import { PiPlanetBold } from "react-icons/pi";
import { Button } from "react-bootstrap";
import { SlOptions } from "react-icons/sl";
import { IoCloseSharp } from "react-icons/io5";

const SingleArticle = function () {
  return (
    <div className="bg-white rounded-3 p-3 my-3 border border-black">
      <div className="d-flex justify-content-between align-items-center  py-2  border-bottom ">
        <div className="d-flex align-items-center">
          <img
            src="https://placecats.com/35/35"
            alt="img-profile-friend"
            className="rounded-circle"
          />
          <p className="m-0 ms-2">
            <span className="fw-bold">Utente</span> ha diffuso questo post
          </p>
        </div>
        <div className="text-black d-flex gap-2 fs-5">
          <a href="#">
            <SlOptions className="text-black" />
          </a>
          <a href="#">
            <IoCloseSharp className="text-black" />
          </a>
        </div>
      </div>
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

export default SingleArticle;
