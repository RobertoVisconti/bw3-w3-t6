// import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FooterMiniGenerale } from "./footer/FooterMiniGenerale";
import { Container } from "react-bootstrap";

interface LinkFormat {
  icon: React.ReactNode;
  label: string;
  url: string;
}
export const ReteSidebar = () => {
  const links: LinkFormat[] = [
    {
      icon: <i className="fas fa-user-friends"></i>,
      label: "Collegamenti",
      url: "#",
    },
    {
      icon: <i className="fas fa-user-plus"></i>,
      label: "Persone che segui",
      url: "#",
    },
    {
      icon: <i className="fas fa-users"></i>,
      label: "Gruppi",
      url: "#",
    },
    {
      icon: <i className="fas fa-calendar-alt"></i>,
      label: "Eventi",
      url: "#",
    },
    {
      icon: <i className="fas fa-building"></i>,
      label: "Pagine",
      url: "#",
    },
    {
      icon: <i className="fas fa-newspaper"></i>,
      label: "Newsletter",
      url: "#",
    },
  ];

  return (
    <Container fluid className="p-0">
      {/* Box con i ling della sidebar */}
      <article className="bg-white border-card-linkedin  pb-2 mb-2 rounded-2">
        <h6 className="mx-n4 border-bottom border-secondary-subtle py-3 text-center">
          Gestsci la tua rete
        </h6>

        <div className="d-flex flex-column gap-3 px-4">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className="text-decoration-none text-secondary"
            >
              <span className="me-1 fs-5">{link.icon}</span>{" "}
              <span className="fw-medium">{link.label}</span>
            </a>
          ))}
        </div>
      </article>
      {/* Box annunci pubblicitari */}
      {/* <article className="border border-secondary">
     
        <div className="position-relative">
          {" "}
          <img
            src="https://placecats.com/100/50"
            alt=""
            className="w-100"
            style={{ height: "50px" }}
          />
          <Button
            size="sm"
            className="bg-light text-secondary border-0 position-absolute top-0 end-0 m-1 rounded-3"
          >
            Promosso <i className="fas fa-ellipsis-h"></i>
          </Button>
        </div>
     
        <div
          className="justify-content-center gap-3 d-flex position-relative"
          style={{ marginTop: "-10px", zIndex: "3" }}
        >
          <img
            src="https://placecats.com/50/50"
            alt=""
            className="rounded-circle"
          />
          <img src="https://placecats.com/50/50" alt="" />
        </div>
        <div className="p-3 text-center">
          <h6>Lorem ipsum dolor sit amet consectetur.</h6>
          <p className="text-muted small">
            Scopri le ultime offerte di lavore e notizie
          </p>
          <Button className="text-primary bg-transparent rounded-pill mt-2 fw-medium border-1 w-100">
            Segui
          </Button>
        </div>
      </article> */}
      <article>
        <Link to="/Lavoro">
          <img
            src="/JobImg.png"
            alt="Job Advertisement"
            className="w-100 h-auto my-2"
          />
        </Link>
      </article>
      <div className="d-none d-md-block">
        <FooterMiniGenerale />
      </div>
    </Container>
  );
};
