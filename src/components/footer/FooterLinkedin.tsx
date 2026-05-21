import { Container, Row } from "react-bootstrap";
import { CurrentYear } from "../generali/CurrentYear";
import { FooterLinkProfile } from "./FooterLinkProfile";
import { FooterOpzioniLink } from "./FooterOpzioniLink";
import { SelezioneLingua } from "../generali/SelezioneLingua";

// Footer per la pagina principale profile

const FooterLinkedin = () => {
  return (
    <Container>
      <div style={{ width: "70%" }} className="my-4">
        {" "}
        <div>
          <FooterLinkProfile></FooterLinkProfile>
        </div>
        <div className="my-2">
          <CurrentYear></CurrentYear>
        </div>
        <Row>
          <FooterOpzioniLink></FooterOpzioniLink>
          <SelezioneLingua></SelezioneLingua>
        </Row>
      </div>
    </Container>
  );
};

export default FooterLinkedin;
