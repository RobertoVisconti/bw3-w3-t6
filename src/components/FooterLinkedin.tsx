import { Container } from "react-bootstrap";
import { CurrentYear } from "./CurrentYear";
import { FooterLinkProfile } from "./FooterLinkProfile";
import { FooterOpzioniLink } from "./FooterOpzioniLink";
import { SelezioneLingua } from "./SelezioneLingua";

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
        <div className="d-flex">
          <FooterOpzioniLink></FooterOpzioniLink>
          <SelezioneLingua></SelezioneLingua>
        </div>
      </div>
    </Container>
  );
};

export default FooterLinkedin;
