import { Container, Card, Row, Col } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa6";

interface SubOption {
  id: string;
  title: string;
  currentValue?: string;
}

interface SettingSection {
  categoryTitle: string;
  options: SubOption[];
}

const MainContentSettings = () => {
  const settingsData: SettingSection[] = [
    {
      categoryTitle: "Informazioni profilo",
      options: [
        { id: "nome-localita", title: "Nome, località e settore" },
        {
          id: "info-demografiche",
          title: "Informazioni demografiche personali",
        },
        { id: "verifiche", title: "Verifiche" },
      ],
    },
    {
      categoryTitle: "Visualizzazione",
      options: [{ id: "modalita-scura", title: "Modalità scura" }],
    },
    {
      categoryTitle: "Preferenze generali",
      options: [
        { id: "lingua", title: "Lingua" },
        { id: "lingua-contenuti", title: "Lingua dei contenuti" },
        {
          id: "riproduzione-video",
          title: "Riproduci video automaticamente",
          currentValue: "Sì",
        },
        { id: "effetti-sonori", title: "Effetti sonori", currentValue: "Sì" },
        {
          id: "visualizzazione-foto",
          title: "Visualizzazione foto del profilo",
          currentValue: "Tutti gli utenti LinkedIn",
        },
        {
          id: "feed-preferita",
          title: "Visualizzazione feed preferita",
          currentValue: "Post più rilevanti (consigliata)",
        },
        {
          id: "persone-smesse-seguire",
          title: "Persone che hai smesso di seguire",
        },
      ],
    },
    {
      categoryTitle: "Opzioni di sincronizzazione",
      options: [
        { id: "sincronizza-calendario", title: "Sincronizza calendario" },
        { id: "sincronizza-contatti", title: "Sincronizza contatti" },
      ],
    },
    {
      categoryTitle: "Abbonamenti e pagamenti",
      options: [
        { id: "abbonati-gratis", title: "Abbonati gratuitamente" },
        {
          id: "cronologia-acquisti",
          title: "Visualizza la cronologia degli acquisti",
        },
      ],
    },
    {
      categoryTitle: "Partner e servizi",
      options: [{ id: "microsoft", title: "Microsoft" }],
    },
    {
      categoryTitle: "Gestione account",
      options: [
        { id: "sospendi-account", title: "Sospendi account" },
        { id: "chiudi-elimina", title: "Chiudi ed elimina account" },
      ],
    },
  ];

  const handleOptionClick = (id: string) => {
    console.log(`Hai cliccato l'opzione: ${id}`);
  };

  return (
    <Container className=" px-3" style={{ maxWidth: "800px" }}>
      <Row className="g-4">
        {settingsData.map((section, sectionIdx) => (
          <Col xs={12} key={sectionIdx}>
            <Card className="border-0 shadow-sm rounded-3 overflow-hidden">
              <Card.Body className="p-0">
                <div className="px-4 pt-3 pb-2">
                  <h2 className="fs-5 fw-semibold text-dark m-0">
                    {section.categoryTitle}
                  </h2>
                </div>

                <div className="d-flex flex-column">
                  {section.options.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => handleOptionClick(option.id)}
                      className="d-flex justify-content-between align-items-center px-4 py-3 border-top"
                      style={{
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        borderColor: "#f1f3f5",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <span
                        className="fs-6 text-secondary text-wrap"
                        style={{ maxWidth: "70%" }}
                      >
                        {option.title}
                      </span>

                      <div className="d-flex align-items-center gap-2 text-muted small">
                        {option.currentValue && (
                          <span className="text-end d-none d-sm-inline">
                            {option.currentValue}
                          </span>
                        )}
                        <FaChevronRight
                          className="fs-7 text-secondary"
                          style={{ opacity: 0.7 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MainContentSettings;
