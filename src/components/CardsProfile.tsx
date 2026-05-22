import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { Profile } from "../interfaces/interfaces";
import { CardsProfileSingolo } from "./CardsProfileSingolo";
import { Row, Col } from "react-bootstrap";

interface CardsCollegatiContainerProps {
  collegati?: boolean;
  limit?: number;
}

export const CardsProfile = ({
  collegati = true,
  limit = 8,
}: CardsCollegatiContainerProps) => {
  const { allProfiles = [] } = useSelector(
    (state: RootState) => state.profile || {},
  );

  const randomProfiles = useMemo(() => {
    if (!allProfiles || allProfiles.length === 0) return [];
    // eslint-disable-next-line react-hooks/purity
    return [...allProfiles].sort(() => Math.random() - 0.5).slice(0, limit);
  }, [allProfiles, limit]);

  return (
    <div>
      <h6 className="fw-semibold mb-0">Persone che potresti conoscere</h6>
      {randomProfiles.map((profilo: Profile) => (
        <Col className="m-0" key={profilo._id}>
          <div className="user-select-none h-100" style={{ cursor: "pointer" }}>
            <CardsProfileSingolo {...profilo} collegati={collegati} />
          </div>
        </Col>
      ))}
    </div>
  );
};
