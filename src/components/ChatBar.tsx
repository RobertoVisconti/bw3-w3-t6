import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import {
  PiCaretUpBold,
  PiCaretDownBold,
  PiNotePencilBold,
  PiDotsThreeBold,
} from "react-icons/pi";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
// Importiamo i tuoi file esistenti con i percorsi corretti per la cartella components
import { customFetch } from "../redux/actions/apiClient";
import type { Profile } from "../interfaces/interfaces";

const ChatBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Usiamo uno stato locale visto che il profileReducer gestisce solo 'myProfile'
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  // Prendiamo il tuo profilo da Redux per escluderti dalla lista chat
  const { myProfile } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        // Sfruttiamo la tua fidata customFetch che ha già URL e Token impostati
        const data = await customFetch<Profile[]>("profile", "GET");
        if (data) {
          setProfiles(data);
        }
      } catch (error) {
        console.error("Errore nel recupero dei profili per la chat:", error);
      } finally {
        setLoading(false);
      }
    };

    // Ottimizzazione: scarica i profili solo quando l'utente clicca per aprire la chat la prima volta
    if (isOpen && profiles.length === 0) {
      fetchProfiles();
    }
  }, [isOpen, profiles.length]);

  // Filtriamo i profili escludendo te stesso e applicando la ricerca per nome/cognome
  const filteredChats = profiles.filter(
    (user) =>
      user._id !== myProfile?._id &&
      `${user.name} ${user.surname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className="position-fixed bottom-0 end-0 me-4 shadow-lg bg-white rounded-top-3 d-none d-md-block"
      style={{
        zIndex: 1050,
        width: "320px",
        height: isOpen ? "460px" : "50px",
        transition: "height 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        border: "1px solid #dee2e6",
      }}
    >
      {/* HEADER BARRA */}
      <div
        className="d-flex align-items-center justify-content-between px-3 border-bottom"
        style={{ height: "50px", cursor: "pointer", backgroundColor: "#fff" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="d-flex align-items-center gap-2">
          <img
            src={myProfile?.image || "https://placecats.com/100/100"}
            alt="Il tuo profilo"
            className="rounded-circle"
            style={{ width: "32px", height: "32px", objectFit: "cover" }}
          />
          <span
            className="fw-semibold text-dark"
            style={{ fontSize: "0.9rem" }}
          >
            Messaggistica
          </span>
        </div>

        <div
          className="d-flex align-items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="btn btn-link text-secondary p-1 border-0 rounded-circle">
            <PiDotsThreeBold className="fs-5" />
          </button>
          <button className="btn btn-link text-secondary p-1 border-0 rounded-circle">
            <PiNotePencilBold className="fs-5" />
          </button>
          <button
            className="btn btn-link text-secondary p-1 border-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <PiCaretDownBold /> : <PiCaretUpBold />}
          </button>
        </div>
      </div>

      {/* CORPO CHAT ESPANSO */}
      {isOpen && (
        <div
          className="d-flex flex-column h-100"
          style={{ paddingBottom: "50px" }}
        >
          <div className="p-2 border-bottom bg-white">
            <FormControl
              type="text"
              placeholder="Cerca messaggi"
              className="form-control-sm border-0 py-1.5 px-3"
              style={{
                backgroundColor: "#edf2f7",
                fontSize: "0.85rem",
                borderRadius: "4px",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div
            className="flex-grow-1 overflow-auto bg-white"
            style={{ maxHeight: "350px" }}
          >
            {loading ? (
              <div className="text-center text-muted small mt-4">
                Caricamento in corso...
              </div>
            ) : filteredChats.length > 0 ? (
              filteredChats.map((user) => (
                <div
                  key={user._id}
                  className="d-flex align-items-start gap-2 px-3 py-2 token-chat-row"
                  style={{ cursor: "pointer" }}
                >
                  <div className="position-relative flex-shrink-0 mt-0.5">
                    <img
                      src={user.image || "https://placecats.com/40/40"}
                      alt={`${user.name} ${user.surname}`}
                      className="rounded-circle"
                      style={{
                        width: "42px",
                        height: "42px",
                        objectFit: "cover",
                      }}
                    />
                    <span
                      className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle"
                      style={{ width: "11px", height: "11px" }}
                    ></span>
                  </div>
                  <div className="d-flex flex-column w-100 overflow-hidden">
                    <div className="d-flex justify-content-between align-items-baseline">
                      <span
                        className="fw-normal text-dark text-truncate"
                        style={{ fontSize: "0.88rem", fontWeight: 500 }}
                      >
                        {user.name} {user.surname}
                      </span>
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.75rem" }}
                      >
                        18 mag
                      </span>
                    </div>
                    <span
                      className="text-muted text-truncate mt-0.5"
                      style={{ fontSize: "0.82rem" }}
                    >
                      {user.title || "Utente LinkedIn"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted small mt-4">
                Nessun utente trovato
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBar;
