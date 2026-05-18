import { useState } from "react"
import { Container, ListGroup } from "react-bootstrap"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5"
import FooterLinkedin from "./FooterLinkedin"

const SideBarEnd = () => {
  const newsData = [
    {
      id: 1,
      title: "Playatomic, Canva: cercasi country manager",
      time: "2 giorni fa",
      readers: "393 lettori",
    },
    {
      id: 2,
      title: "L'auto europea parla sempre più cinese",
      time: "2 giorni fa",
      readers: "369 lettori",
    },
    {
      id: 3,
      title: "Aumentano i consumi per cani e gatti",
      time: "2 giorni fa",
      readers: "104 lettori",
    },
    {
      id: 4,
      title: "Le nuove Top Voices di LinkedIn",
      time: "4 giorni fa",
      readers: "1312 lettori",
    },
    {
      id: 5,
      title: "Internazionali di Roma: vince Sinner",
      time: "2h fa",
      readers: "1237 lettori",
    },
  ]

  const gamesData = [
    {
      id: 1,
      name: "Patches",
      number: "#62",
      desc: "Metti insieme i pezzi",
      icon: "🧩",
      bgIcon: "#e0f1ff",
    },
    {
      id: 2,
      name: "Zip",
      number: "#427",
      desc: "Completa il percorso",
      icon: "⚡",
      bgIcon: "#fff3cd",
    },
    {
      id: 3,
      name: "Mini Sudoku",
      number: "#280",
      desc: "Il gioco classico, in versione mini",
      icon: "🔢",
      bgIcon: "#d1e7dd",
    },
    {
      id: 4,
      name: "Tango",
      number: "#588",
      desc: "Armonizza la griglia",
      icon: "🎨",
      bgIcon: "#ffe2e2",
    },
  ]

  const [activeNews, setActiveNews] = useState(1)

  return (
    <>
      <Container
        fluid
        className="bg-white rounded-3 border border-secondary shadow-sm p-0 text-start m-0 my-2"
      >
        {/* ================= SEZIONE NOTIZIE ================= */}
        <div className="pt-3" style={{ textAlign: "left" }}>
          {/* Intestazione Notizie */}
          <div
            className="d-flex justify-content-between align-items-center px-3 mb-1"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h5
              className="fw-semibold text-dark m-0"
              style={{
                fontSize: "1rem",
                letterSpacing: "-0.2px",
                fontWeight: "600",
              }}
            >
              LinkedIn Notizie
            </h5>
            <IoMdInformationCircleOutline
              size={16}
              className="text-secondary"
              style={{ cursor: "pointer" }}
            />
          </div>

          <span
            className="text-secondary px-3 d-block mb-2 fw-medium"
            style={{ fontSize: "0.78rem", display: "block", textAlign: "left" }}
          >
            Storie principali
          </span>

          {/* LIST GROUP NOTIZIE */}
          <ListGroup
            variant="flush"
            className="border-0 p-0 m-0"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {newsData.map((news) => (
              <ListGroup.Item
                key={news.id}
                as="div"
                onClick={() => setActiveNews(news.id)}
                className="px-3 py-2 w-100 transition-all"
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    activeNews === news.id ? "#eaeaea" : "transparent",
                  border: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (activeNews !== news.id)
                    e.currentTarget.style.backgroundColor = "#f3f3f3"
                }}
                onMouseLeave={(e) => {
                  if (activeNews !== news.id)
                    e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                {/* Titolo  */}
                <div
                  className="fw-semibold text-dark text-truncate w-100"
                  style={{
                    fontSize: "0.86rem",
                    lineHeight: "1.3",
                    textAlign: "left",
                    fontWeight: "600",
                    display: "block",
                  }}
                >
                  {news.title}
                </div>
                {/* Sottotitolo */}
                <div
                  className="text-secondary w-100"
                  style={{
                    fontSize: "0.75rem",
                    marginTop: "2px",
                    textAlign: "left",
                    display: "block",
                  }}
                >
                  {news.time} • {news.readers}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Mostra altre notizie */}
          <div
            className="px-3 py-2 d-flex align-items-center text-secondary fw-semibold mt-1"
            style={{
              fontSize: "0.84rem",
              gap: "4px",
              cursor: "pointer",
              width: "fit-content",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span className="ps-1">Mostra altre notizie</span>
            <IoChevronDownOutline size={15} />
          </div>
        </div>

        <hr className="my-1 border-light-subtle mx-3" />

        {/* ================= SEZIONE ROMPICAPO ================= */}
        <div className="py-2" style={{ textAlign: "left" }}>
          <div className="px-3 pb-2 pt-1" style={{ textAlign: "left" }}>
            <h5
              className="fw-semibold text-dark m-0"
              style={{
                fontSize: "1rem",
                letterSpacing: "-0.2px",
                fontWeight: "600",
              }}
            >
              I rompicapo di oggi
            </h5>
          </div>

          {/* LIST GROUP ROMPICAPO */}
          <ListGroup
            variant="flush"
            className="border-0 p-0 m-0 mb-2"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {gamesData.map((game) => (
              <ListGroup.Item
                key={game.id}
                as="div"
                className="px-3 py-2 w-100 text-dark"
                style={{
                  cursor: "pointer",
                  border: "none",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "left",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f3f3f3")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {/* Box Sinistro */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    textAlign: "left",
                    gap: "12px",
                    minWidth: "0",
                    flex: "1",
                  }}
                >
                  {/* Quadratino icona */}
                  <div
                    className="rounded-2 border border-light-subtle"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: game.bgIcon,
                      fontSize: "1.2rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {game.icon}
                  </div>

                  {/* Contenitore scritte del gioco */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      textAlign: "left",
                      minWidth: "0",
                      flex: "1",
                    }}
                  >
                    <div
                      className="fw-semibold text-dark text-truncate w-100"
                      style={{
                        fontSize: "0.86rem",
                        lineHeight: "1.2",
                        fontWeight: "600",
                        display: "block",
                      }}
                    >
                      {game.name}{" "}
                      <span
                        className="text-secondary fw-normal font-monospace"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {game.number}
                      </span>
                    </div>
                    <div
                      className="text-secondary text-truncate w-100"
                      style={{
                        fontSize: "0.75rem",
                        marginTop: "2px",
                        display: "block",
                      }}
                    >
                      {game.desc}
                    </div>
                  </div>
                </div>

                {/* Freccetta a destra */}
                <IoChevronForwardOutline
                  size={16}
                  className="text-secondary"
                  style={{ flexShrink: 0, marginLeft: "8px" }}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Mostra altro rompicapo */}
          <div
            className="px-3 pt-1 pb-2 d-flex align-items-center text-secondary fw-semibold"
            style={{
              fontSize: "0.84rem",
              gap: "4px",
              cursor: "pointer",
              width: "fit-content",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span className="ps-1">Mostra altro</span>
            <IoChevronDownOutline size={15} />
          </div>
        </div>
        <div></div>
      </Container>
      <FooterLinkedin />
    </>
  )
}

export default SideBarEnd
