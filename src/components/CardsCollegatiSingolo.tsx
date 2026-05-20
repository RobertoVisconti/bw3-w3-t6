import { Card, Button } from "react-bootstrap";
import type { Profile } from "../interfaces/interfaces";

interface CardsCollegatiProps extends Profile {
  collegati: boolean;
  affiliato?: boolean;
}

export const CardsCollegatiSingolo = ({
  image,
  name,
  surname,
  title,
  area,
  collegati = true,
  affiliato = true,
}: CardsCollegatiProps) => {
  return (
    <Card className="position-relative " style={{ height: "320px" }}>
      <Card.Img
        style={{ height: "60px" }}
        variant="top"
        src="https://placehold.net/400x600.png"
      ></Card.Img>
      <Card.Img
        style={{
          marginTop: "-45px",
          zIndex: "3",
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
            {name}
            {surname}
          </Card.Title>
          <Card.Text>
            <span className="small text-muted">{title}</span>
            {affiliato && (
              <span className="small text-muted d-block">{area}</span>
            )}
          </Card.Text>
        </div>

        <Button
          variant="primary"
          className=" rounded-5 bg-light text-primary fw-medium w-100"
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
        <Button className="bg-transparent border-0">
          <i className="text-dark text-opacity-75 fas fa-times-circle top-0 end-0 m-2 fs-1 position-absolute"></i>
        </Button>
      </Card.Body>
    </Card>
  );
};
