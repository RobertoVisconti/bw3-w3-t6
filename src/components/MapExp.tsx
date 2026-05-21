import { Button } from "react-bootstrap"
import { FaPen, FaTrash } from "react-icons/fa"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import type { Experience } from "../interfaces/interfaces"
import { useLocation, useParams } from "react-router-dom"

interface MapExpProps {
  userId?: string
  onEditClick: (exp: Experience) => void
  onDeleteClick: (expId: string) => void
}

const MapExp = ({ userId, onEditClick, onDeleteClick }: MapExpProps) => {
  // Params
  const location = useLocation()
  const isProfiloRoute = location.pathname.includes("/profilo")
  const isEsperienzeRoute = location.pathname.includes("/Esperienze")

  const experiences = useSelector(
    (state: RootState) => state.experience.experiences,
  )
  const { myProfile } = useSelector((state: RootState) => state.profile)
  const { userId: urlUserId } = useParams<{ userId?: string }>()

  const finalUserId = userId || urlUserId || myProfile?._id

  const userExperiences = experiences.filter((exp) => exp.user === finalUserId)

  if (!userExperiences.length) {
    return <p className="text-muted">Nessuna esperienza inserita</p>
  }

  return (
    <div>
      {userExperiences.map((exp: Experience) => (
        <div
          key={exp._id}
          className="d-flex justify-content-between align-items-start mb-3"
        >
          <div className="d-flex align-items-start">
            {/* Gestione robusta dell'immagine con fallback in caso di stringa vuota o errore di caricamento */}
            <img
              src={
                exp.image && exp.image.trim() !== ""
                  ? exp.image
                  : "https://placehold.co/40x30"
              }
              alt="logo"
              style={{ width: "40px", height: "30px", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/40x30"
              }}
            />

            <div className="ms-3">
              <h6 className="fw-semibold mb-1">{exp.role}</h6>
              <p className="text-secondary small mb-0">{exp.company}</p>

              <p className="text-secondary small mb-0">
                {new Date(exp.startDate).toLocaleDateString("it-IT")}
                {exp.endDate
                  ? ` - ${new Date(exp.endDate).toLocaleDateString("it-IT")}`
                  : " - Presente"}
              </p>

              <p className="text-secondary small mb-0">{exp.description}</p>
            </div>
          </div>

          {/* Icone visibili ed utilizzabili unicamente sul proprio profilo */}
          {finalUserId === myProfile?._id &&
            !isProfiloRoute &&
            isEsperienzeRoute && (
              <div className="d-flex gap-2">
                <Button
                  variant="link"
                  className="text-dark p-0"
                  onClick={() => onEditClick(exp)}
                >
                  <FaPen size={15} />
                </Button>

                <Button
                  variant="link"
                  className="text-danger p-0"
                  onClick={() => onDeleteClick(exp._id)}
                >
                  <FaTrash size={15} />
                </Button>
              </div>
            )}
        </div>
      ))}
    </div>
  )
}

export default MapExp
