import { useState } from "react";
import { Card, Button, Modal, Image } from "react-bootstrap";
import {
  FaPen,
  FaTimes,
  FaGlobe,
  FaGlasses,
  FaLightbulb,
  FaUserPlus,
} from "react-icons/fa";

const ProfileRightSidebar = () => {
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  return (
    <>
      <Card className="rounded-3 mb-2">
        <Card.Body className="p-3">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h6 className="fw-semibold mb-1">Lingua del profilo</h6>
              <p className="text-secondary small mb-0">Italiano</p>
            </div>

            <Button
              variant="link"
              className="text-dark p-0"
              onClick={() => setShowLanguageModal(true)}
            >
              <FaPen size={17} />
            </Button>
          </div>

          <hr className="my-3" />

          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h6 className="fw-semibold mb-1">Profilo pubblico e URL</h6>
              <p className="text-secondary small mb-0 lh-sm">
                www.linkedin.com/in/roberto-
                <br />
                visconti-1234567
              </p>
            </div>

            <Button variant="link" className="text-dark p-0">
              <FaPen size={16} />
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card className="rounded-3">
        <Card.Body className="p-3">
          <h6 className="fw-semibold mb-0">Persone che potresti conoscere</h6>
          <p className="text-secondary small mb-3">
            Dalla tua scuola o università
          </p>

          <div className="d-flex gap-2">
            <Image
              src="https://placehold.co/50x50"
              roundedCircle
              width={50}
              height={50}
            />

            <div>
              <h6 className="fw-semibold mb-1 small text-dark">
                Nome Cognome
              </h6>

              <p className="text-secondary small mb-2 lh-sm">
                Junior Developer | React
              </p>

              <div className="w-100 d-flex justify-content-center">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="rounded-pill fw-semibold px-3 py-1"
                >
                  <FaUserPlus size={13} className="me-1" />
                  Collegati
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal
  show={showLanguageModal}
  onHide={() => setShowLanguageModal(false)}
  size="lg"
>
  <Modal.Header className="px-4 py-3 d-flex justify-content-between align-items-center">
    <Modal.Title className="fw-semibold fs-5 mb-0">
      Impostazioni lingua del profilo
    </Modal.Title>

    <Button
      variant="link"
      className="text-dark p-0 ms-auto"
      onClick={() => setShowLanguageModal(false)}
    >
      <FaTimes size={25} />
    </Button>
  </Modal.Header>

  <Modal.Body className="p-0">
    <div className="bg-light px-4 py-4 d-flex gap-4">
      <div className="d-flex gap-3">
        <FaGlobe size={55} className="text-secondary" />
        <p className="mb-0 lh-base" style={{ fontSize: "15px" }}>
        Aggiungi più di una lingua al tuo
        <br />
        profilo, così sarà più facile trovarti.
        </p>
      </div>

      <div className="d-flex gap-3">
        <FaGlasses size={55} className="text-secondary" />
        <p className="mb-0 lh-base" style={{ fontSize: "15px" }}>
          Se disponibile, mostreremo il tuo profilo
          <br />
          nella lingua di chi lo visita. Se non c'è
          <br />
          corrispondenza, verrà mostrato il tuo profilo
          predefinito.
        </p>
      </div>
    </div>

    <div className="px-4 py-4 mt-3">
      <h6 className="text-secondary mb-3">Lingue</h6>

      <div className="d-flex gap-2 mb-4">
        <Button
          variant="outline-secondary"
          className="rounded-pill px-3 fw-semibold"
        >
          Italiano
        </Button>

        <Button
          variant="outline-primary"
          className="rounded-pill px-3 fw-semibold"
        >
          + Aggiungi lingua
        </Button>
      </div>

      <div className="d-flex gap-3 text-secondary">
        <FaLightbulb size={22} className="text-dark mt-1" />

        <p className="mb-0 lh-base small">
          Puoi avere un solo profilo per lingua. Quando cambi il profilo
          nella tua lingua principale, le sezioni vuote verranno compilate
          usando la tua precedente lingua principale. Scopri di più su come{" "}
          <span className="text-primary fw-semibold">
            creare profili in un'altra lingua.
          </span>
        </p>
      </div>
    </div>
  </Modal.Body>
</Modal>
    </>
  );
};

export default ProfileRightSidebar;