import { Container } from "react-bootstrap";
import { CurrentYear } from "./CurrentYear";
import { FooterLinkProfile } from "./FooterLinkProfile";
import { FooterOpzioniLink } from "./FooterOpzioniLink";
import { SelezioneLingua } from "./SelezioneLingua";

const FooterLinkedin = () => {
  return (
    <Container>
      <div style={{ width: "70%" }}>
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
