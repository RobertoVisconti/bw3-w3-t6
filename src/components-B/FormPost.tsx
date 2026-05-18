import { PiVideoFill } from "react-icons/pi";
import { AiFillPicture } from "react-icons/ai";
import { PiArticleBold } from "react-icons/pi";
import { Col, FormControl} from "react-bootstrap";

const FormPost = function () {
  return (
    <div
      className="justify-content-center mt-3 rounded-2 bg-white"
      style={{ border: "1px solid black", overflow: "hidden" }}
    >
      <Col className="d-flex flex-column  pt-2 px-3 " xs={12}>
        <div className="d-flex justify-content-center align-items-center gap-2 w-100">
          <img
            src="https://placecats.com/60/60"
            alt="img-profile"
            className="rounded-circle"
            style={{ maxHeight: "100%" }}
          />
          <FormControl
            type="text"
            id="input-post"
            placeholder="Crea un Post"
            className="rounded-5 w-100 px-3 border"
            style={{ height: "60px", border: "gray" }}
          />
        </div>
        <div className="d-flex justify-content-around py-3">
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
    </div>
  );
};

export default FormPost;
