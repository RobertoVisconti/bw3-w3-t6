import { Col, Container, Image, Row } from "react-bootstrap";
import ProfileRightSidebar from "../components/ProfileRightSidebar";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getExperience } from "../redux/actions/experienceActions";
import MainExperience from "../components/MainExperience";
import { useParams } from "react-router-dom";

const Esperienze = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams<{ userId?: string }>(); // Prendi l'ID dalla URL se esiste
  const { myProfile, allProfiles } = useSelector(
    (state: RootState) => state.profile,
  );

  // State per memorizzare il profilo visualizzato (può essere myProfile o un altro utente)
  const [displayedProfile, setDisplayedProfile] = useState(myProfile);

  // Logica: se c'è un userId nei params, cerca quel profilo
  useEffect(() => {
    if (userId) {
      // Stai visualizzando il profilo di un altro utente
      const searchedProfile = allProfiles?.find((p) => p._id === userId);
      setDisplayedProfile(searchedProfile || myProfile);
    } else {
      // Stai visualizzando il tuo profilo
      setDisplayedProfile(myProfile);
    }
  }, [userId, myProfile, allProfiles]);

  // Carica le esperienze per l'utente visualizzato
  useEffect(() => {
    if (displayedProfile?._id) {
      dispatch(getExperience(displayedProfile._id));
    }
  }, [dispatch, displayedProfile?._id]);

  return (
    <Container fluid>
      <Row className="bg-light px-5">
        <Col className="d-flex align-items-center">
          <Image
            src={displayedProfile?.image}
            roundedCircle
            className="linkedin-avatar  me-3 my-2"
            alt="foto-profilo"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
            }}
          />
          <div>
            <p className="fw-bold p-0 m-0">
              {displayedProfile?.name} {displayedProfile?.surname}
            </p>
            <p className="fw-light p-0 m-0" style={{ fontSize: "13px" }}>
              {displayedProfile?.title}
            </p>
          </div>
        </Col>
      </Row>
      <Row className=" px-5">
        {/* colonna principale */}
        <Col md={9} className="mt-2">
          <MainExperience userId={displayedProfile?._id} />
        </Col>

        {/* sidebar destra */}
        <Col md={3} className="mt-2">
          <ProfileRightSidebar />
        </Col>
      </Row>
    </Container>
  );
};
export default Esperienze;
