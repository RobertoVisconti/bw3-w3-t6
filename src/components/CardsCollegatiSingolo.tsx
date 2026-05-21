import { Card, Button } from "react-bootstrap";
import type { Profile } from "../interfaces/interfaces";
import ButtonFollow from "./generali/ButtonFollow";

interface CardsCollegatiProps extends Profile {
  collegati: boolean;
  affiliato?: boolean;
}

export const CardsCollegatiSingolo = ({
  _id,
  image,
  name,
  surname,
  title,
  area,
  username,
  email,
  createdAt,
  updatedAt,
  __v,
  collegati = true,
  affiliato = true,
}: CardsCollegatiProps) => {
  const utenteCompleto: Profile = {
    _id,
    image,
    name,
    surname,
    title,
    area,
    username,
    email,
    createdAt,
    updatedAt,
    __v,
  };

  return (
    <Card
      className="position-relative border-card-linkedin shadow-sm"
      style={{ height: "320px" }}
    >
      <Card.Img
        style={{ height: "60px" }}
        variant="top"
        src="https://placehold.net/400x600.png"
      />
      <Card.Img
        style={{
          marginTop: "-45px",
          zIndex: "1",
          width: "110px",
          height: "110px",
          objectFit: "cover",
        }}
        className="rounded-circle mx-auto"
        src={image || "https://placecats.com/100/100"}
      />
      <Card.Body className="pb-0 d-flex flex-column">
        <div className="flex-grow-1">
          <Card.Title>
            {name} {surname}
          </Card.Title>
          <Card.Text>
            <span className="small text-muted">{title}</span>
            {affiliato && (
              <span className="small text-muted d-block">{area}</span>
            )}
          </Card.Text>
        </div>

        <ButtonFollow utente={utenteCompleto} isCollegato={collegati} />

        <Button className="bg-transparent border-0">
          <i className="text-dark text-opacity-75 fas fa-times-circle top-0 end-0 m-2 fs-1 position-absolute"></i>
        </Button>
      </Card.Body>
    </Card>
  );
};
