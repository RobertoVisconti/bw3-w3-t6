import { Container, Row } from "react-bootstrap";

import FormPost from "./FormPost";
import SingleCardArticle from "./SingleCardArticle";
import ListaConsigliati from "./ListaConsigliati";

const MainCenter = function () {
  return (
    <Container>
      <Row>
        <FormPost />
      </Row>
      <Row>
        <SingleCardArticle />
      </Row>
      <Row>
        <ListaConsigliati />
      </Row>
    </Container>
  );
};

export default MainCenter;
