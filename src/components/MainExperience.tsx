import { Button, Card, Modal } from "react-bootstrap"
import { FaPen, FaPlus } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"

import { FaArrowLeftLong } from "react-icons/fa6"
import { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import ButtonLinkedin from "./ButtonLinkedin"
import { createExperience } from "../redux/actions/experienceActions"

const MainExperience = () => {
  const { myProfile } = useSelector((state: RootState) => state.profile)
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    area: "",
    username: "", // SERVER GENERATED
    createdAt: "", // SERVER GENERATED
    updatedAt: "", // SERVER GENERATED
    __v: Number, // SERVER GENERATED
    _id: "", // SERVER GENERATED
  })

  useEffect(() => {
    if (myProfile?._id) {
      dispatch(createExperience(myProfile?._id, formData))
    }
  }, [dispatch, myProfile, formData])

  //   modale create experience
  const [showCreateExp, setShowCreateExp] = useState(false)

  const handleCloseCreateExp = () => setShowCreateExp(false)
  const handleShowCreateExp = () => setShowCreateExp(true)

  const tipiDiImpiego = [
    "Seleziona",
    "A tempo pieno",
    "Part-time",
    "Lavoratore autonomo",
    "Freelance",
    "Contratto",
    "Tirocinio",
    "Apprendistato",
    "Stagista",
  ]
  const tipiDiLocalita = ["Seleziona", "Sul posto", "Ibrida", "Da remoto"]
  const DoveOfferta = [
    "Seleziona",
    "linkedIn",
    "Sito web dell'azienda",
    "Indeed",
    "Altri siti di offerte di lavoro",
    "Segnalazioni",
    "Contatti di recruiter",
    "Agenzie di selezione del personale",
  ]

  return (
    <>
      <Card className="rounded-3 mb-2">
        <Card.Body className="p-3">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center ">
              <FaArrowLeftLong className="me-4" />
              <h4 className="p-0 m-0">Esperienza</h4>
            </div>
            <FaPlus onClick={handleShowCreateExp} />
          </div>
          <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex align-items-start">
              {/* logo lavoro */}
              <img
                src="https://placehold.co/40x30"
                alt="logo-lavoro"
                className=""
              />
              <div className="ms-3">
                {/* qui dentro possiamo aggiungere tutte le info */}
                <h6 className="fw-semibold mb-1">{myProfile?.title}</h6>
                <p className="text-secondary small mb-0">{myProfile?.area}</p>
                <p className="text-secondary small mb-0">{myProfile?.area}</p>
                <p className="text-secondary small mb-0">{myProfile?.area}</p>
                <p className="text-secondary small mb-0">{myProfile?.area}</p>
                <p className="text-secondary small mb-0">{myProfile?.area}</p>
              </div>
            </div>

            <Button variant="link" className="text-dark p-0">
              <FaPen size={17} />
            </Button>
          </div>

          <hr className="my-3" />
        </Card.Body>
      </Card>
      {/* modale create exp */}
      {/* modale create exp */}
      {/* modale create exp */}
      {/* modale create exp */}
      <Modal show={showCreateExp} onHide={handleCloseCreateExp} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi esperienza</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="fw-light" style={{ fontSize: "10px" }}>
              * indica che è obbligatorio
            </p>
            <Form>
              {/* Titolo */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Titolo*</Form.Label>
                <Form.Control
                  name="role"
                  type="text"
                  value={"Esempio: Retail Sales Manager"}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              {/* da aggiungere tipo di impiego  */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Tipo di impiego*</Form.Label>
                <Form.Select aria-label="Default select example">
                  {tipiDiImpiego.map((type) => {
                    return <option>{type}</option>
                  })}
                </Form.Select>
              </Form.Group>

              {/* Azienda */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Azienda o organizzazione*</Form.Label>
                <Form.Control
                  name="company"
                  type="text"
                  value={"Esempio: Microsoft"}
                />
              </Form.Group>
              {/* check box  */}
              <Form.Group>
                <Form.Check
                  className="my-5"
                  type="checkbox"
                  label="Attualmente ricopro  questo ruolo"
                />
                <Form.Check
                  className="my-5"
                  type="checkbox"
                  label="Termina ora la posizione attuale"
                />
              </Form.Group>

              {/* Data di inizio */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Data di inizio*</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              {/* località */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Località*</Form.Label>
                <Form.Control
                  name="area"
                  type="text"
                  value="Esempio: Milano, Italia"
                />
              </Form.Group>
              {/*tipi di località */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Tipo di località*</Form.Label>
                <Form.Select aria-label="Default select example">
                  {tipiDiLocalita.map((type) => {
                    return <option>{type}</option>
                  })}
                </Form.Select>
                <Form.Text className="fw-light" style={{ fontSize: "10px" }}>
                  Scegli un tipo di località (es. da remoto)
                </Form.Text>
              </Form.Group>
              {/* descrizione */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Descrizione</Form.Label>
                <Form.Control name="bio" as="textarea" rows={4} />
              </Form.Group>

              {/* sommario del profilo*/}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Sommario del profilo*</Form.Label>
                <Form.Control type="text" value={myProfile?.title} />
                <Form.Text className="fw-light" style={{ fontSize: "10px" }}>
                  Compare sotto il tuo nome nella parte superiore del profilo.
                </Form.Text>
              </Form.Group>

              {/*Dove hai trovato l’offerta di lavoro? */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Dove hai trovato l’offerta di lavoro?</Form.Label>
                <Form.Select aria-label="Default select example">
                  {DoveOfferta.map((type) => {
                    return <option>{type}</option>
                  })}
                </Form.Select>
                <Form.Text className="fw-light" style={{ fontSize: "10px" }}>
                  Queste informazioni verranno usate per migliorare la ricerca
                  di lavoro su LinkedIn
                </Form.Text>
              </Form.Group>
            </Form>
            <div className="">
              <h5>Competenze</h5>
              <p>
                Ti consigliamo di aggiungere le 5 competenze più utilizzate in
                questo ruolo. Appariranno anche nella sezione Competenze.
              </p>
              <div className="w-50">
                <ButtonLinkedin
                  to="#"
                  text="Aggiungi competenza"
                  className="bg-transparent text-primary "
                />
              </div>
            </div>
            <div>
              <h5>Contenuti Multimediali</h5>
              <p>
                Aggiungi contenuti multimediali come immagini, documenti, siti o
                presentazioni.
              </p>
              <div className="w-50">
                <ButtonLinkedin
                  to="#"
                  text=" + Aggiungi contenuti"
                  className="bg-transparent text-primary "
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="rounded-pill m-0 py-0 ">
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default MainExperience
