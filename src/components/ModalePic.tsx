import { Button, Image, Modal } from "react-bootstrap"
import { IoEyeSharp } from "react-icons/io5"
import ButtonLinkedin from "./ButtonLinkedin"
import { HiOutlinePencil } from "react-icons/hi"
import { FaCamera, FaTrashAlt } from "react-icons/fa"
import { SlPicture } from "react-icons/sl"

const ModalPic = () => {
  return (
    <Modal show={showImg} onHide={handleCloseImg}>
      <Modal.Header closeButton className="bg-dark border-0">
        <Modal.Title className="text-light">Foto del profilo</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="w-100 justify-content-center d-flex">
          <Image
            src={myProfile?.image}
            roundedCircle
            className="linkedin-avatar "
            alt="foto-profilo"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </div>
        {/* tasto visibilità */}
        <div className="w-25 border rounded-pill border-light mt-3 d-flex align-items-center">
          <IoEyeSharp className="text-light me-2 ms-2" />
          <ButtonLinkedin
            to="#"
            text="Chiunque"
            className="border-0 text-light m-0 p-0 bg-transparent"
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between bg-dark border-0">
        <div className="d-flex">
          <Button
            className="bg-transparent border-0 d-flex flex-column align-items-center"
            style={{ fontSize: "13px" }}
          >
            {" "}
            <HiOutlinePencil />
            Modifica
          </Button>

          {/* caricamento immagine */}
          <Button
            className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
            style={{ fontSize: "13px" }}
            onClick={() => {
              handleCloseImg()
              handleShowUpPic()
            }}
          >
            <FaCamera />
            Aggiorna
          </Button>
          {/* fine caricamento immagine */}
          <Button
            className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
            style={{ fontSize: "13px" }}
          >
            <SlPicture />
            Cornici
          </Button>
        </div>
        <Button
          className="bg-transparent border-0 d-flex flex-column align-items-center text-light"
          style={{ fontSize: "13px" }}
        >
          <FaTrashAlt />
          Elimina
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ModalPic
