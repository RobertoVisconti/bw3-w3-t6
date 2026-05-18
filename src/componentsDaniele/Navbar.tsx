import { Link } from "react-router-dom";
import { Navbar as BsNavbar, Container, Form, InputGroup, Image } from "react-bootstrap";
import {FaLinkedin, FaSearch, FaMapMarkerAlt, FaHome, FaUserFriends, FaBriefcase, FaCommentDots, FaBell, FaTh, FaCaretDown,} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <BsNavbar bg="white" className="border-bottom py-0 linkedin-navbar">
      <Container fluid className="d-flex align-items-center justify-content-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <Link to="/" className="text-primary fs-1 lh-1 d-flex align-items-center text-decoration-none">
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
            <Image src="https://placehold.co/24x24" roundedCircle  className="linkedin-avatar"/>
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

          <Link to="/premium" className="linkedin-premium text-decoration-underline">
            Prova premium per 0 €
            
          </Link>
        </div>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;