import { Col, Container, Row } from "react-bootstrap";
import { SlOptions } from "react-icons/sl";
import { IoCloseSharp } from "react-icons/io5";
import { PiVideoFill } from "react-icons/pi";
import { AiFillPicture } from "react-icons/ai";
import { PiArticleBold } from "react-icons/pi";

const nomeAmico = "giovanni";

const MainCenter = function () {
  return (
    <Container fluid>
      <Row className="justify-content-center mt-3 rounded-2">
        <Col
          className="d-flex flex-column  pt-2 px-3"
          style={{ backgroundColor: "gray" }}
          xs={12}
        >
          <div className="d-flex justify-content-center align-items-center gap-2 w-100">
            <img
              src="https://placecats.com/60/60"
              alt="img-profile"
              className="rounded-circle"
              style={{ maxHeight: "100%" }}
            />
            <input
              type="text"
              id="input-post"
              placeholder="Crea un Post"
              className="rounded-5 w-100 px-3"
              style={{ height: "60px", border: "gray" }}
            />
          </div>
          <div className="d-flex justify-content-around py-3 fs-5">
            <a href="#" className="text-black text-decoration-none">
              <PiVideoFill className="fs-2 me-1 text-success" />
              <span>Video</span>
            </a>
            <a href="#" className="text-black text-decoration-none">
              <AiFillPicture className="fs-2 me-1 text-primary" />
              <span>Foto</span>
            </a>
            <a href="#" className="text-black text-decoration-none">
              <PiArticleBold className="fs-2 me-1 text-danger" />
              <span>Scrivi un articolo</span>
            </a>
          </div>
        </Col>
      </Row>
      <Row
        className="border-1 mt-3 rounded-2"
        style={{ backgroundColor: "gray" }}
      >
        <Col
          className="d-flex justify-content-between align-items-center  py-2 px-3 gap-2 "
          xs={12}
        >
            <div>

            
          <div className="d-flex align-items-center">
            <img
              src="https://placecats.com/35/35"
              alt="img-profile-friend"
              className="rounded-circle"
            />
            <p className="m-0 ms-2">
              <span className="fw-bold">{nomeAmico}</span> ha diffuso questo
              post
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
        </Col>
        <Col>
            <img src="https://placecats.com/60/60" alt="" className="rounded-circle" />
        </Col>
      </Row>
    </Container>
  );
};

export default MainCenter;
