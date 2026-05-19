import { Button, Modal } from "react-bootstrap"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"

import ButtonLinkedin from "./ButtonLinkedin"

export interface ProfilePicProps {
  showImg: boolean
  handleCloseImg: () => void
}

const ProfilePicModal = ({ showImg, handleCloseImg }: ProfilePicProps) => {
  const { myProfile } = useSelector((state: RootState) => state.profile)

  return (
    <Modal show={showImg} onHide={handleCloseImg}>
      <Modal.Header closeButton>
        <Modal.Title>Foto del profilo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={myProfile?.image}
          alt="foto-profilo"
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
      </Modal.Body>
      {/* tasto visibilità */}
      <ButtonLinkedin to="#" text="Chiunque" />
      <Modal.Footer className="d-flex justify-content-between">
        <div>
          <Button variant="danger">Modifica</Button>
          <Button variant="secondary">Aggiorna</Button>
          <Button variant="secondary">Cornici</Button>
        </div>
        <Button variant="secondary">Elimina</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ProfilePicModal
