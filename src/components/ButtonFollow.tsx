import { Button } from "react-bootstrap";
import type { Profile } from "../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { addProfile } from "../redux/actions/reteActions";

interface ButtonFollowProps {
  utente: Profile;
  isCollegato: boolean;
}

const ButtonFollow = ({ utente, isCollegato }: ButtonFollowProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProfile(utente));
    console.log(`${utente.name} aggiunto alla tua rete!`);
  };

  return (
    <Button
      variant="primary"
      className="rounded-5 bg-light text-primary fw-medium w-100"
      onClick={handleClick}
    >
      {isCollegato ? (
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
