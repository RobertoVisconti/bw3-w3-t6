import { Container, Dropdown } from "react-bootstrap";
import React from "react";
import { CurrentYear } from "./CurrentYear";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

// Mini footer da mettere nel aside

export const FooterMiniGenerale = () => {
  const { links, dropDownPrivacy, aziendeDropdown } = useSelector(
    (state: RootState) => state.footer,
  );

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
                    {dropDownPrivacy.map((dropDownPrivacy, i) => (
                      <Dropdown.Item href={dropDownPrivacy.url} key={i}>
                        {dropDownPrivacy.label}
                      </Dropdown.Item>
                    ))}
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
                  {aziendeDropdown.map((aziendeDropdown, i) => (
                    <Dropdown.Item
                      href={aziendeDropdown.url}
                      key={i}
                      className="small"
                    >
                      <span className="medium">{aziendeDropdown.label}</span>
                      <br />
                      <span className="small">{aziendeDropdown.desc}</span>
                    </Dropdown.Item>
                  ))}
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
