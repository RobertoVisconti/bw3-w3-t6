import { Button } from "react-bootstrap";

const ButtonFollow = () => {
  interface Button extends Profile {
    collegati: boolean;
  }

  return (
    <Button
      variant="primary"
      className="rounded-5 bg-light text-primary fw-medium w-100"
    >
      {collegati ? (
        <span>
          <i className="fas fa-user-plus"></i> Collegati
        </span>
      ) : (
        <span>
          <i className="fas fa-plus"></i>Segui
        </span>
      )}
    </Button>
  );
};

export default ButtonFollow;
