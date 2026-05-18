import { Container, Row } from "react-bootstrap";

import FormPost from "./FormPost";

import ListaConsigliati from "./ListaConsigliati";
import ListArticle from "./ListArticles";

const MainCenter = function () {
  return (
    <Container>
      <Row>
        <FormPost />
      </Row>
      <Row>
        <ListaConsigliati />
      </Row>
      <Row>
        <ListArticle />
      </Row>
    </Container>
  );
};

export default MainCenter;
