import { Container, Dropdown } from "react-bootstrap";
import React from "react";
import { CurrentYear } from "./CurrentYear";

// Mini footer da mettere nel aside

interface FooterLink {
  label: string;
  url: string;
  isDropdown?: boolean;
  isDropdownDue?: boolean;
}

export const FooterMiniGenerale = () => {
  const links: FooterLink[] = [
    { label: "Informazioni", url: "#" },
    { label: "Accessibilità", url: "#" },
    { label: "Centro assistenza", url: "#" },
    { label: "Privacy e condizioni", url: "#", isDropdown: true },
    { label: "Opzioni per gli annunci pubblicitari", url: "#" },
    { label: "Pubblicità", url: "#" },
    { label: "Servizi alle aziende", url: "#", isDropdownDue: true },
    { label: "Scarica l'app Linkedin", url: "#" },
    { label: "Altro", url: "#" },
  ];

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center flex-wrap gap-x-3 gap-y-1 mb-3">
        {links.map((link, i) => (
          <React.Fragment key={i}>
            {link.isDropdown ? (
              // Primo dropdown privacy
              <div className="w-100 d-flex justify-content-center my-1">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    className="text-decoration-none text-secondary small p-0 border-0 d-flex align-items-center shadow-none"
                    style={{ fontSize: "11px" }}
                  >
                    {link.label}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="border-0 small shadow-sm">
                    <Dropdown.Item href="#">
                      Informativa sulla privacy
                    </Dropdown.Item>
                    <Dropdown.Item href="#">Contratto di licenza</Dropdown.Item>
                    <Dropdown.Item href="#">
                      Termini e condizioni delle pagine
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      Informativa sui cookie
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      Informativa sul copyright
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : link.isDropdownDue ? (
              // Dropdown aziende
              <Dropdown className="d-inline p-0">
                <Dropdown.Toggle
                  variant="link"
                  className="text-decoration-none text-secondary p-0 border-0 d-inline-flex align-items-center shadow-none w-auto mx-1"
                  style={{ fontSize: "11px" }}
                >
                  {link.label}
                </Dropdown.Toggle>
                <Dropdown.Menu className="border-0 shadow-sm">
                  <Dropdown.Item href="#" className="small">
                    <span className="medium">Assumi su Linkedin</span>
                    <br />
                    <span className="small">Trova, attrai e assumi</span>
                  </Dropdown.Item>
                  <Dropdown.Item href="#" className="small">
                    <span className="medium">Vendi con Linkedin</span>
                    <br />
                    <span className="small">
                      Sblocca nuove opportunità di vendita
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item href="#" className="small">
                    <span className="medium">Inizia con il premium</span>
                    <br />
                    <span className="small">Amplia e sfrutta la tua rete</span>
                  </Dropdown.Item>
                  <Dropdown.Item href="#" className="small">
                    <span className="medium">Impara con Linkedin</span>
                    <br />
                    <span className="small">
                      Corsi per formare i tuoi dipendenti
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item href="#" className="small">
                    <span className="medium">Admin Center</span>
                    <br />
                    <span className="small">
                      Gestisci i dettagli di fatturazione e account
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <span className="medium">
                      Crea una pagina aziendale <i className="fas fa-plus"></i>
                    </span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <a
                href={link.url}
                className="text-decoration-none text-muted d-inline-block p-0 mx-1 w-auto"
                style={{ fontSize: "11px" }}
              >
                {link.label}
              </a>
            )}
          </React.Fragment>
        ))}
        <p> </p>
      </div>{" "}
      <div className="text-center">
        <span className="text-primary fw-medium">
          Linked<i className="fab fa-linkedin"></i>
        </span>{" "}
        <span className="ms-1 small">
          <CurrentYear></CurrentYear>
        </span>
      </div>
    </Container>
  );
};
