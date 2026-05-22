import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { Profile } from "../interfaces/interfaces";
import { CardsProfileSingolo } from "./CardsProfileSingolo";
import { Col, Button } from "react-bootstrap";

interface CardsCollegatiContainerProps {
  collegati?: boolean;
  initialLimit?: number;
}

export const CardsProfile = ({
  collegati = true,
  initialLimit = 8,
}: CardsCollegatiContainerProps) => {
  const { allProfiles = [] } = useSelector(
    (state: RootState) => state.profile || {},
  );

  const [currentLimit, setCurrentLimit] = useState<number>(initialLimit);

  const [shuffledProfiles, setShuffledProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    if (allProfiles && allProfiles.length > 0) {
      const mixed = [...allProfiles].sort(() => Math.random() - 0.5);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShuffledProfiles(mixed);
    }
  }, [allProfiles]);

  const profilesToDisplay = useMemo(() => {
    return shuffledProfiles.slice(0, currentLimit);
  }, [shuffledProfiles, currentLimit]);

  const handleShowMore = () => {
    setCurrentLimit((prevLimit) => prevLimit + 8);
  };

  const hasMore = shuffledProfiles.length > currentLimit;

  return (
    <div>
      {profilesToDisplay.map((profilo: Profile) => (
        <Col className="m-0" key={profilo._id}>
          <div className=" h-100" style={{ cursor: "pointer" }}>
            <CardsProfileSingolo {...profilo} collegati={collegati} />
          </div>
        </Col>
      ))}

      {hasMore && (
        <div className="d-grid p-2 bg-white border-top">
          <Button
            variant="link"
            className="text-secondary fw-semibold text-decoration-none btn-outline-light btn-sm text-center w-100"
            onClick={handleShowMore}
          >
            Mostra altro
          </Button>
        </div>
      )}
    </div>
  );
};
