import { Button, Col, Row } from "react-bootstrap";
import { SlOptions } from "react-icons/sl";
import { IoCloseSharp } from "react-icons/io5";
import SingleArticle from "./SingleArticle";

const Articoli = ["uno", "due", "tre"];

const ListArticle = function () {
  return (
    <div
      className="border-1 mt-3 rounded-2 bg-white px-2"
      style={{ border: "1px solid black", overflow: "hidden" }}
    >
      <Col
        className="d-flex justify-content-between align-items-center  py-2 gap-2 border-bottom "
        xs={12}
      >
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
      </Col>
      <Col className="p-2 ">
      {Articoli.map(articolo => {
        return (
          <SingleArticle/>
        )
      })}
      </Col>
    </div>
  );
};

export default ListArticle;
