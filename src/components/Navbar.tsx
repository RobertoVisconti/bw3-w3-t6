import { Link } from "react-router-dom";
import {
  Navbar as BsNavbar,
  Container,
  Form,
  InputGroup,
  Image,
} from "react-bootstrap";
import {
  FaLinkedin,
  FaSearch,
  FaMapMarkerAlt,
  FaHome,
  FaUserFriends,
  FaBriefcase,
  FaCommentDots,
  FaBell,
  FaTh,
  FaCaretDown,
} from "react-icons/fa";
import { useEffect } from "react";
import { getMyProfileAsync } from "../redux/actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myProfile, isLoading, error } = useSelector(
    (state: RootState) => state.profile,
  );

  useEffect(() => {
    dispatch(getMyProfileAsync());
  }, [dispatch]);

  return (
    <>
      {isLoading && (
        <div className="text-center my-3">Caricamento profilo...</div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {myProfile && (
        <BsNavbar bg="white" className="border-bottom py-0 linkedin-navbar">
          <Container
            fluid
            className="d-flex align-items-center justify-content-center gap-3"
          >
            <div className="d-flex align-items-center gap-2">
              <Link
                to="/"
                className="text-primary fs-1 lh-1 d-flex align-items-center text-decoration-none"
              >
                <FaLinkedin />
              </Link>

              <InputGroup size="sm" className="linkedin-search">
                <InputGroup.Text className="bg-white border-end-0 rounded-start-pill">
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Qualifica, competenza..."
                  className="border-start-0 rounded-end-pill shadow-none"
                />
              </InputGroup>

              <InputGroup size="sm" className="linkedin-location">
                <InputGroup.Text className="bg-white border-end-0 rounded-start-pill">
                  <FaMapMarkerAlt />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Città, stato o..."
                  className="border-start-0 rounded-end-pill shadow-none"
                />
              </InputGroup>
            </div>

            <div className="d-flex align-items-center">
              <Link to="/" className="linkedin-item">
                <FaHome />
                <span>Home</span>
              </Link>

              <Link to="/rete" className="linkedin-item">
                <FaUserFriends />
                <span>La mia rete</span>
              </Link>

              <Link to="/lavoro" className="linkedin-item active">
                <FaBriefcase />
                <span>Lavoro</span>
              </Link>

              <Link to="/messaggi" className="linkedin-item">
                <FaCommentDots />
                <span>Messaggistica</span>
              </Link>

              <Link to="/notifiche" className="linkedin-item">
                <FaBell />
                <span>Notifiche</span>
              </Link>

              <Link to="/profilo" className="linkedin-item">
                <Image
                  src={myProfile.image || "/roberto.jpeg"}
                  roundedCircle
                  className="linkedin-avatar"
                  style={{ width: "24px", height: "24px", objectFit: "cover" }}
                />
                <span className="linkedin-profile-text">
                  Tu <FaCaretDown className="linkedin-caret" />
                </span>
              </Link>

              <div className="vr mx-2 linkedin-divider"></div>

              <Link to="/aziende" className="linkedin-item linkedin-business">
                <FaTh />
                <span>
                  Per le aziende <FaCaretDown className="linkedin-caret" />
                </span>
              </Link>

              <Link
                to="/premium"
                className="linkedin-premium text-decoration-underline"
              >
                Prova premium per 0 €
              </Link>
            </div>
          </Container>
        </BsNavbar>
      )}
    </>
  );
};

export default Navbar;
