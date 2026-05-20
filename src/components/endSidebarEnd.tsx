import { Container } from "react-bootstrap";
import { HiDotsHorizontal } from "react-icons/hi";
import ButtonLinkedin from "./ButtonLinkedin";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getMyProfileAsync } from "../redux/actions/profileActions";

const EndSidebarEnd = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myProfile } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getMyProfileAsync());
  }, [dispatch]);

  return (
    <div>
      <Container
        fluid
        className="bg-white rounded-3 border border-secondary shadow-sm p-3 text-start m-0 my-2"
        style={{ maxWidth: "300px" }} // Mantiene il box compatto ed evita che si allarghi troppo su schermi grandi
      >
        <div className="d-flex align-items-center justify-content-end text-muted small mb-2">
          <p className="m-0 p-0 me-1" style={{ fontSize: "12px" }}>
            Annuncio
          </p>
          <HiDotsHorizontal />
        </div>

        <p
          className="text-center fw-light text-secondary px-2"
          style={{ fontSize: "14px" }}
        >
          {myProfile?.name}, unlock your full potential with LinkedIn Premium
        </p>

        {/* Container immagini affiancate */}
        <div className="d-flex align-items-center justify-content-center gap-3 my-3">
          <img
            src={myProfile?.image || "https://placehold.co/70x70"}
            alt="foto-profilo"
            className="rounded-circle border border-light shadow-sm"
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
            }}
          />
          <img
            src="https://placehold.co/70x70/0175b2/ffffff?text=Premium"
            alt="badge-premium"
            className="rounded-circle border border-light shadow-sm"
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
            }}
          />
        </div>

        <p
          className="text-center text-secondary px-1"
          style={{ fontSize: "13px" }}
        >
          See Who's viewed your profile in the last 365 days
        </p>

        <div className="d-flex justify-content-center mt-3 mb-1">
          <div className="w-70 text-center">
            <ButtonLinkedin
              text="Try for Free"
              className="rounded-pill border-primary fw-bold"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EndSidebarEnd;
