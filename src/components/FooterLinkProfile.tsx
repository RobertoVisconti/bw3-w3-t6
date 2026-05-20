import { Col, Container, Row, Dropdown } from "react-bootstrap";

export interface FooterLink {
  label: string;
  url: string;
  isDropdown?: boolean;
}

export const FooterLinkProfile = () => {
  const links: FooterLink[] = [
    { label: "Informazioni", url: "#" },
    { label: "Accessibilità", url: "#" },
    { label: "Talent Solution", url: "#" },
    { label: "Linee guida della comunità", url: "#" },
    { label: "Carriera", url: "#" },
    { label: "Soluzioni di marketing", url: "#" },
    { label: "Privacy e condizioni", url: "#", isDropdown: true },
    { label: "Opzioni per gli annunci pubblicitari", url: "#" },
    { label: "Pubblicità", url: "#" },
    { label: "Sales Solution", url: "#" },
    { label: "Mobile", url: "#" },
    { label: "Piccole imprese", url: "#" },
    { label: "Centro sicurezza", url: "#" },
  ];

  return (
    <Container>
      <Row>
        {links.map((link, i) => (
          <Col key={i} xs={12} lg={4} className="p-0">
            {link.isDropdown ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  className="text-decoration-none text-secondary small p-0 border-0 d-flex align-items-center shadow-none"
                  style={{ fontSize: "13px" }}
                >
                  {link.label}
                </Dropdown.Toggle>
                <Dropdown.Menu className="border-0 shadow-sm">
                  <Dropdown.Item href="#" className="small">
                    Informativa sulla privacy
                  </Dropdown.Item>
                  <Dropdown.Item href="#" className="small">
                    Contratto di licenza
                  </Dropdown.Item>
                  <Dropdown.Item href="#" className="small">
                    Termini e condizioni delle pagine
                  </Dropdown.Item>
                  <Dropdown.Item href="#" className="small">
                    Informativa sui cookie
                  </Dropdown.Item>
                  <Dropdown.Item href="#" className="small">
                    Informativa sul copyright
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <a
                href={link.url}
                className="text-decoration-none text-muted small d-inline-block mb-2"
              >
                {link.label}
              </a>
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
};
