import { Button } from "react-bootstrap";
import type { Profile } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { addProfile } from "../../redux/actions/reteActions";
import { useState } from "react";

interface ButtonFollowProps {
  utente: Profile;
  isCollegato: boolean;
  isMini?: boolean;
}

const ButtonFollow = ({ utente, isCollegato, isMini }: ButtonFollowProps) => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    dispatch(addProfile(utente));
    console.log(`${utente.name} aggiunto alla tua rete!`);
    setIsClicked(true);
  };

  return (
    <Button
      variant="outline-primary"
      className="rounded-5 bg-light text-primary fw-medium custom-btn-follow"
      onClick={handleClick}
      disabled={isClicked}
      style={{ width: isMini ? "100px" : "100%" }}
    >
      {isClicked ? (
        isCollegato ? (
          <span className="d-flex align-items-center justify-content-center">
            <i
              className="fas fa-check"
              style={{
                fontSize: isMini ? "0.75rem" : "1rem",
                marginRight: isMini ? "3px" : "4px",
              }}
            ></i>{" "}
            Collegato
          </span>
        ) : (
          <span className="d-flex align-items-center justify-content-center">
            <i
              className="fas fa-check"
              style={{
                fontSize: isMini ? "0.75rem" : "1rem",
                marginRight: isMini ? "3px" : "4px",
              }}
            ></i>{" "}
            Seguito
          </span>
        )
      ) : isCollegato ? (
        <span className="d-flex align-items-center justify-content-center">
          <i
            className="fas fa-user-plus"
            style={{
              fontSize: isMini ? "0.75rem" : "1rem",
              marginRight: isMini ? "3px" : "4px",
            }}
          ></i>{" "}
          Collegati
        </span>
      ) : (
        <span className="d-flex align-items-center justify-content-center">
          <i
            className="fas fa-plus"
            style={{
              fontSize: isMini ? "0.75rem" : "1rem",
              marginRight: isMini ? "3px" : "4px",
            }}
          ></i>{" "}
          Segui
        </span>
      )}
    </Button>
  );
};

export default ButtonFollow;
