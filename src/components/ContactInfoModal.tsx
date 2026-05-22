import { Modal, Button } from "react-bootstrap";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

interface ContactInfoModalProps {
  show: boolean;
  onHide: () => void;
  profileUrl?: string;
  email?: string;
}

const ContactInfoModal = ({
  show,
  onHide,
  profileUrl = "linkedin.com/in/roberto-visconti-b095a53b0",
  email = "robertovisconti93@gmail.com",
}: ContactInfoModalProps) => {
  return (
    <Modal show={show} onHide={onHide} backdrop={true} className="my-5">
      <Modal.Header
        closeButton
        className="border-0 pt-4 px-4 pb-2 align-items-center"
      >
        <Modal.Title className="fs-5 fw-normal text-dark">
          Informazioni di contatto
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pb-4 pt-2">
        <div className="d-flex flex-column gap-4">
          {/* Sezione link Profilo */}
          <div className="d-flex align-items-start gap-3">
            <div className="text-secondary pt-1" style={{ fontSize: "22px" }}>
              <FaLinkedin className="text-dark text-opacity-75" />
            </div>
            <div>
              <h6
                className="mb-1 fw-semibold text-dark"
                style={{ fontSize: "15px" }}
              >
                Il tuo profilo
              </h6>
              <a
                href={`${profileUrl}`}
                rel="noreferrer"
                className="text-decoration-none fw-semibold hover-underline"
                style={{ fontSize: "14px", color: "#0a66c2" }}
              >
                {profileUrl}
              </a>
            </div>
          </div>

          <div className="d-flex align-items-start gap-3">
            <div className="text-secondary pt-1" style={{ fontSize: "20px" }}>
              <FaEnvelope className="text-dark text-opacity-75" />
            </div>
            <div>
              <h6
                className="mb-1 fw-semibold text-dark"
                style={{ fontSize: "15px" }}
              >
                Email
              </h6>
              <a
                href={`mailto:${email}`}
                className="text-decoration-none fw-semibold hover-underline"
                style={{ fontSize: "14px", color: "#0a66c2" }}
              >
                {email}
              </a>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-top px-4 py-3 d-flex justify-content-end bg-white rounded-bottom-3">
        <Button
          variant="outline-primary"
          className="rounded-5 px-3 py-1 fw-bold btn-sm custom-btn-follow:hover"
          style={{
            borderColor: "#0a66c2",
            borderWidth: "1.5px",
            fontSize: "14px",
          }}
          onClick={() => {
            console.log("Modifica informazioni di contatto cliccato");
          }}
        >
          Modifica le informazioni di contatto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactInfoModal;
