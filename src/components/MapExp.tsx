import { Button } from "react-bootstrap"
import { FaPen } from "react-icons/fa"
import type { Experience } from "../interfaces/interfaces"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"

interface MapExpProps {
  experiences?: Experience[]
}

const MapExp = () => {
  const experiences = useSelector(
    (state: RootState) => state.experience.experiences,
  )
  console.log(experiences)
  return (
    <div>
      {experiences?.map((exp) => {
        return (
          <>
            <div
              className="d-flex justify-content-between align-items-start"
              key={exp?._id}
            >
              <div className="d-flex align-items-start">
                {/* logo lavoro */}
                <img
                  src={exp.image || "https://placehold.co/40x30"}
                  alt="logo-lavoro"
                  className=""
                />
                <div className="ms-3">
                  {/* qui dentro possiamo aggiungere tutte le info */}
                  <h6 className="fw-semibold mb-1">{exp.role}</h6>
                  <p className="text-secondary small mb-0">{exp.area}</p>
                  <p className="text-secondary small mb-0">
                    {new Date(exp.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-secondary small mb-0 text-truncate">
                    {exp.description}
                  </p>
                </div>
              </div>

              <Button variant="link" className="text-dark p-0">
                <FaPen size={17} />
              </Button>
            </div>
            <hr className="my-3" />
          </>
        )
      })}
    </div>
  )
}
export default MapExp
