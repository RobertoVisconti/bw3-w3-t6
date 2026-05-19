import { Card, Button, Row, Col, Container } from "react-bootstrap";
import type { Profile } from "../interfaces/interfaces";

interface CardsCollegati extends Profile {
  collegati: boolean;
  affiliato?: boolean;
}

export const CardsCollegati = ({
  image,
  name,
  surname,
  title,
  area,
  collegati = true,
  affiliato = true,
}: CardsCollegati) => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={6} lg={3}>
          <Card className="position-relative">
            <Card.Img
              style={{ height: "60px" }}
              variant="top"
              src={image}
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
              src={image}
            />
            <Card.Body className="pb-0">
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
              <Button className="bg-transparent border-0">
                <i className="text-dark text-opacity-75 fas fa-times-circle top-0 end-0 m-2 fs-1 position-absolute"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
