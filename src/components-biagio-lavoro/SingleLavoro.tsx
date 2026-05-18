import { SlOptions } from "react-icons/sl";
import { IoCloseSharp } from "react-icons/io5";

const SingleLavoro = function () {
  return (
    <div className="d-flex border-bottom py-1 ">
      <div className="d-flex align-items-start">
        <img
          src="https://placecats.com/70/70"
          alt=""
          className="rounded-circle"
        />
        <div className="ms-2">
          <h5 className="text-primary">Responsabile di sala</h5>
          <p style={{ lineHeight: "1.2" }} className="m-0">
            Descrizione lavoro Descrizione lavoro Descrizione lavoro Descrizione
            lavoro · Descrizione lavoro{" "}
          </p>
          <span className="small ">
            <span className="text-secondary">Promosso · </span>
            <span className="text-success">
              Invia una delle prime candidature
            </span>
          </span>
        </div>
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
  );
};

export default SingleLavoro;
