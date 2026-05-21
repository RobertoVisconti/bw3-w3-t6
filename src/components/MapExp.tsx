import { Button } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { Experience } from "../interfaces/interfaces";
import { useParams } from "react-router-dom";

interface MapExpProps {
  userId?: string;
}

const MapExp = ({ userId }: MapExpProps) => {
  const experiences = useSelector(
    (state: RootState) => state.experience.experiences,
  );
  const { myProfile } = useSelector((state: RootState) => state.profile);
  const { userId: urlUserId } = useParams<{ userId?: string }>();

  // Usa l'userId dal prop, altrimenti dalla URL, altrimenti il tuo profilo
  const finalUserId = userId || urlUserId || myProfile?._id;

  // Filtra le esperienze per l'utente
  const userExperiences = experiences.filter((exp) => exp.user === finalUserId);

  if (!userExperiences.length) {
    return <p className="text-muted">Nessuna esperienza inserita</p>;
  }

  return (
    <div>
      {userExperiences.map((exp: Experience) => (
        <div
          key={exp._id}
          className="d-flex justify-content-between align-items-start mb-3"
        >
          <div className="d-flex align-items-start">
            <img
              src={exp.image || "https://placehold.co/40x30"}
              alt="logo"
              style={{ width: "40px", height: "30px", objectFit: "cover" }}
            />

            <div className="ms-3">
              <h6 className="fw-semibold mb-1">{exp.role}</h6>
              <p className="text-secondary small mb-0">{exp.company}</p>

              <p className="text-secondary small mb-0">
                {new Date(exp.startDate).toLocaleDateString("it-IT")}
              </p>

              <p className="text-secondary small mb-0">{exp.description}</p>
            </div>
          </div>

          {finalUserId === myProfile?._id && (
            <Button variant="link" className="text-dark p-0">
              <FaPen size={17} />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MapExp;
