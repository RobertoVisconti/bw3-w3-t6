import { Button, Card, Modal } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonLinkedin from "./generali/ButtonLinkedin";
import {
  createExperience,
  updateExperience,
  deleteExperience,
  getExperience,
} from "../redux/actions/experienceActions";
import { customFetch } from "../api/apiClient";
import MapExp from "./MapExp";
import type { Experience } from "../interfaces/interfaces";

interface MainExperienceProps {
  userId?: string;
}

const MainExperience = ({ userId }: MainExperienceProps) => {
  const { myProfile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();

  const [formExpData, setFormExpData] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    area: "",
  });

  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingExpId(null);
    setFormExpData({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      area: "",
    });
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
  };

  const handleShowCreate = () => {
    setEditingExpId(null);
    setShowModal(true);
  };

  const handleChangeExp = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormExpData({ ...formExpData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveSelectedImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
  };

  const uploadExperienceImage = async (expId: string) => {
    if (!myProfile?._id || !imageFile) return;
    try {
      const formData = new FormData();
      formData.append("experience", imageFile);

      await customFetch(
        `profile/${myProfile._id}/experiences/${expId}/picture`,
        "POST",
        formData,
      );

      console.log("Immagine caricata!");
      dispatch(getExperience(myProfile._id));
    } catch (error) {
      console.error("Errore upload immagine:", error);
    }
  };

  const handleSubmit = async () => {
    if (!myProfile?._id) return;

    const payload = {
      ...formExpData,
      startDate: formExpData.startDate
        ? new Date(formExpData.startDate).toISOString()
        : "",
      endDate: formExpData.endDate
        ? new Date(formExpData.endDate).toISOString()
        : undefined,
      image: imagePreview ? imagePreview : "",
    };

    if (editingExpId) {
      // 1. Modifica l'esperienza a server
      await dispatch(updateExperience(myProfile._id, editingExpId, payload));

      // 2. Se c'è un nuovo file selezionalo, caricalo
      if (imageFile) {
        await uploadExperienceImage(editingExpId);
      } else if (!imagePreview) {
        dispatch(getExperience(myProfile._id));
      }
    } else {
      const actionResult = await dispatch(
        createExperience(myProfile._id, payload),
      );
      if (actionResult && actionResult._id && imageFile) {
        await uploadExperienceImage(actionResult._id);
      }
    }

    handleCloseModal();
  };

  const handleEditInit = (exp: Experience) => {
    setEditingExpId(exp._id);
    setFormExpData({
      role: exp.role,
      company: exp.company,
      startDate: exp.startDate ? exp.startDate.split("T")[0] : "",
      endDate: exp.endDate ? exp.endDate.split("T")[0] : "",
      description: exp.description,
      area: exp.area,
    });

    if (exp.image) {
      setImagePreview(exp.image);
    }
    setShowModal(true);
  };

  const handleDeleteInit = async (expId: string) => {
    if (!myProfile?._id) return;
    if (
      window.confirm(
        "Sei sicuro di voler eliminare definitivamente questa esperienza?",
      )
    ) {
      await dispatch(deleteExperience(myProfile._id, expId));
    }
  };

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
  ];
  const tipiDiLocalita = ["Seleziona", "Sul posto", "Ibrida", "Da remoto"];

  const isOwnProfile = !userId || userId === myProfile?._id;

  return (
    <>
      <Card className="rounded-3 mb-2">
        <Card.Body className="p-3">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center ">
              <FaArrowLeftLong className="me-4" />
              <h4 className="p-0 m-0">Esperienza</h4>
            </div>
            {isOwnProfile && (
              <FaPlus
                onClick={handleShowCreate}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>

          {/* FIX CRITICO: Adesso colleghiamo le funzioni richieste da MapExp */}
          <MapExp
            userId={userId}
            onEditClick={handleEditInit}
            onDeleteClick={handleDeleteInit}
          />
        </Card.Body>
      </Card>

      {isOwnProfile && (
        <Modal show={showModal} onHide={handleCloseModal} scrollable>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingExpId ? "Modifica esperienza" : "Aggiungi esperienza"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p className="fw-light" style={{ fontSize: "10px" }}>
                * indica che è obbligatorio
              </p>
              <Form>
                {/* Campi del Form */}
                <Form.Group className="mb-3">
                  <Form.Label>Titolo*</Form.Label>
                  <Form.Control
                    name="role"
                    type="text"
                    required
                    value={formExpData.role}
                    onChange={handleChangeExp}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tipo di impiego</Form.Label>
                  <Form.Select aria-label="Tipo impiego">
                    {tipiDiImpiego.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Azienda o organizzazione*</Form.Label>
                  <Form.Control
                    name="company"
                    type="text"
                    required
                    value={formExpData.company}
                    onChange={handleChangeExp}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Data di inizio*</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    required
                    value={formExpData.startDate}
                    onChange={handleChangeExp}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Data di fine</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={formExpData.endDate}
                    onChange={handleChangeExp}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Località*</Form.Label>
                  <Form.Control
                    name="area"
                    type="text"
                    required
                    value={formExpData.area}
                    onChange={handleChangeExp}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tipo di località</Form.Label>
                  <Form.Select aria-label="Tipo località">
                    {tipiDiLocalita.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descrizione*</Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    rows={4}
                    required
                    value={formExpData.description}
                    onChange={handleChangeExp}
                  />
                </Form.Group>

                {/* INPUT FILE CON RESET INTELLIGENTE */}
                <Form.Group className="mb-3 border p-3 rounded bg-light">
                  <Form.Label className="fw-semibold">
                    Logo o immagine dell'esperienza
                  </Form.Label>

                  {imagePreview && (
                    <div className="mb-3 d-flex flex-column align-items-center bg-white p-2 border rounded">
                      <p className="small text-muted align-self-start mb-1">
                        Anteprima selezionata:
                      </p>
                      <div
                        style={{
                          width: "100%",
                          maxHeight: "180px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={imagePreview}
                          alt="Anteprima"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "180px",
                            objectFit: "contain",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="mt-2 d-flex align-items-center gap-1"
                        onClick={handleRemoveSelectedImage}
                      >
                        <FaTrash size={12} /> Rimuovi immagine
                      </Button>
                    </div>
                  )}

                  {/* Il prop key costringe React a resettare il campo di testo quando l'immagine viene rimossa */}
                  <Form.Control
                    key={imageFile ? imageFile.name : "empty"}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="rounded-pill px-4"
              onClick={handleSubmit}
            >
              {editingExpId ? "Aggiorna" : "Salva"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default MainExperience;
