import { Button } from "react-bootstrap";
import type { Profile } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { addProfile } from "../../redux/actions/reteActions";
import { useState } from "react";

interface ButtonFollowProps {
  utente: Profile;
  isCollegato: boolean;
}

const ButtonFollow = ({ utente, isCollegato }: ButtonFollowProps) => {
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
      className="rounded-5 bg-light text-primary fw-medium w-100 custom-btn-follow"
      onClick={handleClick}
      disabled={isClicked}
    >
      {isClicked ? (
        isCollegato ? (
          <span>
            <i className="fas fa-check me-1"></i> Collegato
          </span>
        ) : (
          <span>
            <i className="fas fa-check me-1"></i> Seguito
          </span>
        )
      ) : isCollegato ? (
        <span>
          <i className="fas fa-user-plus me-1"></i> Collegati
        </span>
      ) : (
        <span>
          <i className="fas fa-plus me-1"></i> Segui
        </span>
      )}
    </Button>
  );
};

export default ButtonFollow;
