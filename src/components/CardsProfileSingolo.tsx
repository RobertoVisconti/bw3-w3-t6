import { Card } from "react-bootstrap";
import type { Profile } from "../interfaces/interfaces";
import ButtonFollow from "./generali/ButtonFollow";

interface CardsCollegatiProps extends Profile {
  collegati: boolean;
  affiliato?: boolean;
  isMini?: boolean;
}

export const CardsProfileSingolo = (props: CardsCollegatiProps) => {
  const {
    image,
    name,
    surname,
    title,

    collegati = true,

    isMini = true,
  } = props;

  const utenteCompleto: Profile = { ...props };

  return (
    <Card
      className="position-relative  shadow-sm p-3 rounded-0"
      style={{ height: "130px" }}
    >
      <div className="d-flex gap-1">
        <Card.Img
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            aspectRatio: "1/1",
          }}
          className="rounded-circle mx-auto"
          src={image || "https://placecats.com/100/100"}
        />
        <Card.Body className="p-0 d-flex flex-column overflow-hidden w-100">
          <div className="overflow-hidden w-100" style={{ maxHeight: "65px" }}>
            <Card.Title className="m-0 text-truncate fs-6 fw-bold">
              {name} {surname}
            </Card.Title>

            <Card.Text className="m-0">
              <span className="small text-muted text-truncate d-block">
                {title}
              </span>
            </Card.Text>
          </div>
          <div className="mt-2 w-100">
            <ButtonFollow
              utente={utenteCompleto}
              isCollegato={collegati}
              isMini={isMini}
            />
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};
