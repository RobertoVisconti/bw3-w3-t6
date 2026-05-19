import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { useEffect } from "react"
import { getMyProfileAsync } from "../redux/actions/profileActions"
import ButtonLinkedin from "./ButtonLinkedin"
import { FaPlus } from "react-icons/fa"

export interface ModalePresentazioneProps {
  showMod: boolean
  handleCloseMod: () => void
}

const ModalePresentazione = ({
  showMod,
  handleCloseMod,
}: ModalePresentazioneProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { myProfile } = useSelector((state: RootState) => state.profile)

  useEffect(() => {
    dispatch(getMyProfileAsync())
  }, [dispatch])

  return (
    <Modal show={showMod} onHide={handleCloseMod} scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="fs-6 m-0 p-0">
          Modifica presentazione
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* qui va il dropdown */}
        <p className="fw-light" style={{ fontSize: "10px" }}>
          * indica che è obbligatorio
        </p>
        <Form>
          <h5>Informazioni di base</h5>
          {/* nome */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome*</Form.Label>
            <Form.Control type="text" placeholder={myProfile?.name} />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          {/* cognome */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Cognome*</Form.Label>
            <Form.Control type="text" placeholder={myProfile?.surname} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* nome aggiuntivo */}
            <Form.Label>Nome aggiuntivo</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
          {/* pronomi */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Pronomi*</Form.Label>
            <Form.Control type="text" placeholder="" />
            <Form.Text className="fw-light" style={{ fontSize: "10px" }}>
              Indica i pronomi di genere che vuoi che gli altri usino per
              riferirsi a te.
            </Form.Text>
          </Form.Group>
          {/* sommario */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Sommario*</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <h5 className="m-0 mt-5">Posizione attuale</h5>
          {/* posizione lavorativa */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Posizione lavorativa*</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>{myProfile?.title}</option>
              {/* da cambiare */}
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <div className="w-75">
              <ButtonLinkedin
                text={`+ Aggiungi una nuova posizione lavorativa`}
                className=""
                style={{ fontSize: "15px" }}
                to="#"
              />
            </div>

            <Form.Check
              className="m-0"
              type="checkbox"
              label="Mostra l'azienda attuale nella mia presentazione"
            />
          </Form.Group>

          {/* settore */}
          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label>Settore*</Form.Label>
            <Form.Control type="textarea" placeholder="" />
            <Form.Text>
              Scopri di più sulle{" "}
              <a href="#" className="fw-bold text-decoration-none">
                opzioni relative al settore
              </a>
            </Form.Text>
          </Form.Group>

          {/* formazione  */}
          <h5 className="m-0">Formazione</h5>
          {/* Scuola o università */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Scuola o università*</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>{myProfile?.title}</option>
              {/* da cambiare */}
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <div className="w-75">
              <ButtonLinkedin
                text={`+ Aggiungi un nuovo grado di formazione`}
                className=""
                style={{ fontSize: "15px" }}
                to="#"
              />
            </div>

            <Form.Check
              type="checkbox"
              label="Mostra la scuola o università nella mia presentazione"
            />
          </Form.Group>

          {/* Località */}
          <h5 className="m-0">Località</h5>
          <Form.Label>Paese/Area geografica*</Form.Label>
          <Form.Control type="text" placeholder={myProfile?.area} />

          {/* Informazioni di contatto*/}

          <h5 className="mt-5 mb-1">informazioni di contatto</h5>
          <p className="fw-light" style={{ fontSize: "13px" }}>
            Aggiungi o modifica il tuo profilo URL, indirizzo email e altro
          </p>
          <a href="#" className="fw-bold text-decoration-none">
            Modifica le informazioni di contatto
          </a>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleCloseMod}
          className="rounded-pill m-0 py-0 "
        >
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ModalePresentazione
