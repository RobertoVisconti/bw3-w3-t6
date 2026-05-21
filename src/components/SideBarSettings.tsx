import { Col, Container, Image, Row } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

import { BiNews } from "react-icons/bi";
import { FaShieldAlt, FaUser } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { IoEyeSharp, IoNotifications } from "react-icons/io5";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const SideBarSettings = () => {
  const [activeId, setActiveId] = useState<string>("preferenze-account");

  const { myProfile } = useSelector((state: RootState) => state.profile);

  const menuItems: SidebarItem[] = [
    {
      id: "preferenze-account",
      label: "Preferenze account",
      icon: <FaUser className="fs-5" />,
    },
    {
      id: "accesso-sicurezza",
      label: "Accesso e sicurezza",
      icon: <GiPadlock className="fs-5" />,
    },
    {
      id: "visibilita",
      label: "Visibilità",
      icon: <IoEyeSharp className="fs-5" />,
    },
    {
      id: "privacy-dati",
      label: "Privacy dei dati",
      icon: <FaShieldAlt className="fs-5" />,
    },
    {
      id: "dati-pubblicita",
      label: "Dati pubblicità",
      icon: <BiNews className="fs-5" />,
    },
    {
      id: "servizi-linkedin",
      label: "Servizi LinkedIn",
      icon: <FaUser className="fs-5" />,
    },
    {
      id: "notifiche",
      label: "Notifiche",
      icon: <IoNotifications className="fs-5" />,
    },
  ];

  return (
    <Container
      fluid
      className="bg-white border-end py-4 px-3"
      style={{ minHeight: "calc(110vh - 80px)" }}
    >
      <Row>
        <Col xs={12}>
          {/* Header Profilo */}
          <div className="d-flex align-items-center mb-5 gap-2 my-5">
            <Image
              src={myProfile?.image || "https://via.placeholder.com/40"}
              roundedCircle
              style={{ width: "32px", height: "32px", objectFit: "cover" }}
              alt="Profilo utente"
            />

            <h1
              className="fs-4 fw-bold m-0 text-dark"
              style={{ letterSpacing: "-0.5px" }}
            >
              Impostazioni
            </h1>
          </div>

          {/* Lista di Navigazione della Sidebar */}
          <div className="d-flex flex-column gap-2">
            {menuItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className="d-flex align-items-center gap-3 py-2 px-3 rounded-end"
                  style={{
                    cursor: "pointer",
                    marginLeft: "-16px",
                    borderLeft: isActive
                      ? "4px solid #198754"
                      : "4px solid transparent",
                    color: isActive ? "#198754" : "#212529",
                    fontWeight: isActive ? "600" : "400",
                    backgroundColor: isActive ? "#f8f9fa" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor = "#f1f3f5";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <div style={{ color: isActive ? "#198754" : "#495057" }}>
                    {item.icon}
                  </div>
                  <span className="fs-6">{item.label}</span>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SideBarSettings;
