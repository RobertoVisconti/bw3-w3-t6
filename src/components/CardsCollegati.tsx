import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { Profile } from "../interfaces/interfaces";
import { CardsCollegatiSingolo } from "./CardsCollegatiSingolo";
import { Row, Col } from "react-bootstrap";

interface CardsCollegatiContainerProps {
  collegati?: boolean;
  limit?: number;
}

export const CardsCollegati = ({
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
    <Row className="g-3 ">
      {randomProfiles.map((profilo: Profile) => (
        <Col xs={12} md={4} lg={3} key={profilo._id}>
          <div className="user-select-none h-100" style={{ cursor: "pointer" }}>
            <CardsCollegatiSingolo {...profilo} collegati={collegati} />
          </div>
        </Col>
      ))}
    </Row>
  );
};
