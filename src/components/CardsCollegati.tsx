import { Card, Button, Row, Col, Container } from "react-bootstrap";

interface infoCard {
  bgImg?: string;
  img?: string;
  name: string;
  quality?: string;
  affiliato?: boolean;
  affiliazione?: string;
  collegati: boolean;
}

export const CardsCollegati = ({
  name = "Gattino Panettiere",
  quality = "Panettiere professionale",
  affiliato = true,
  affiliazione = "Kitty Institute",
  collegati = true,
  bgImg = "https://placehold.net/400x100.png",
  img = "https://placecats.com/300/300",
}: infoCard) => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={6} lg={3}>
          <Card className="position-relative">
            <Card.Img
              style={{ height: "60px" }}
              variant="top"
              src={bgImg}
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
              src={img}
            />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                <span className="small text-muted">{quality}</span>
                {affiliato && (
                  <span className="small text-muted d-block">
                    {affiliazione}
                  </span>
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
