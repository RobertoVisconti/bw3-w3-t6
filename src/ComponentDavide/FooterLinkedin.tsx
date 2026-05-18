import { Container } from "react-bootstrap";
import { CurrentYear } from "./CurrentYear";
import { FooterLinkProfile } from "./FooterLinkProfile";
import { FooterOpzioniLink } from "./FooterOpzioniLink";
import { SelezioneLingua } from "./SelezioneLingua";

const FooterLinkedin = () => {
  return (
    <Container>
      {" "}
      <div>
        <FooterLinkProfile></FooterLinkProfile>
      </div>
      <div>
        <CurrentYear></CurrentYear>
      </div>
      <div>
        <FooterOpzioniLink></FooterOpzioniLink>
        <SelezioneLingua></SelezioneLingua>
      </div>
    </Container>
  );
};

export default FooterLinkedin;
