import { Container, Row } from "react-bootstrap";

import FormPost from "./FormPost";

import ListaConsigliati from "./ListaConsigliati";
import ListArticle from "./ListArticles";

import FooterLinkedin from "../footer/FooterLinkedin";

const MainCenter = function () {
  return (
    <Container fluid>
      <Row>
        <FormPost />
      </Row>
      <Row>
        <ListaConsigliati />
      </Row>
      <Row>
        <ListArticle />
        {/* FOOTER RIMOSSO , NON SERVE NELLA HOMEPAGE */}
      </Row>
    </Container>
  );
};

export default MainCenter;
