import { Offcanvas, Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

interface OffcanvasGuidaProps {
  show: boolean;
  handleClose: () => void;
}

const OffcanvasGuida = ({ show, handleClose }: OffcanvasGuidaProps) => {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className="border-start-0 my-3"
      style={{ width: "400px", height: "300px" }}
    >
      <Offcanvas.Header
        className="d-flex align-items-center justify-content-between p-3"
        style={{ backgroundColor: "#283e4a", color: "white" }}
      >
        <Offcanvas.Title className="fw-bold fs-5">Guida</Offcanvas.Title>
        <Button
          variant="link"
          className="text-white p-0 border-0 shadow-none"
          onClick={handleClose}
        >
          <FaTimes size={20} />
        </Button>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-0 d-flex flex-column">
        <div className="p-3 bg-white">
          <InputGroup className="border rounded-2 overflow-hidden shadow-sm">
            <InputGroup.Text className="bg-white border-0 pe-1">
              <FaSearch className="text-secondary" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Chiedi o cerca qualcosa"
              className="border-0 shadow-none py-2"
              style={{ fontSize: "0.95rem" }}
            />
          </InputGroup>
        </div>

        <div className="mt-auto border-top p-3 bg-light bg-opacity-50">
          <a
            href="#S"
            target="_blank"
            rel="noreferrer"
            className="d-flex align-items-center gap-2 text-decoration-none fw-bold text-primary"
            style={{ fontSize: "0.9rem" }}
            onClick={handleClose}
          >
            <FaExternalLinkAlt size={14} />
            <span>Apri Guida in una nuova scheda</span>
          </a>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasGuida;
