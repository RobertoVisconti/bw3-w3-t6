import { useRef, useState } from "react";
import { Container, Row, Col, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
  PiDotsThreeBold,
  PiNotePencilBold,
  PiPaperPlaneRightBold,
  PiImageBold,
  PiPaperclipBold,
  PiGifBold,
} from "react-icons/pi";
import EmojiPickerButton from "./emojiButton";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

interface UserProfile {
  _id: string;
  name: string;
  surname: string;
  image?: string;
  title?: string;
}

const Messaggistica = () => {
  // per l emoji
  const messageAreaRef = useRef<HTMLTextAreaElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState<UserProfile | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const [conversations, setConversations] = useState<{
    [userId: string]: Message[];
  }>({});

  const { myProfile, allProfiles, isLoading } = useSelector(
    (state: RootState) => state.profile,
  );

  const filteredChats = ((allProfiles as UserProfile[]) || [])
    .filter(
      (user) =>
        user._id !== myProfile?._id &&
        `${user.name} ${user.surname}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    )
    .slice(0, 15);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim() || !myProfile?._id || !activeChat?._id) return;

    const msg: Message = {
      id: Date.now().toString(),
      senderId: myProfile._id,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((prev) => ({
      ...prev,
      [activeChat._id]: [...(prev[activeChat._id] || []), msg],
    }));

    setNewMessage("");
  };

  return (
    <Container fluid>
      <Row >
        {/* COLONNA SINISTRA: LISTA CHAT */}
        <Col md={6} lg={4} className="p-0">
          <div
            className="bg-white rounded-start-3 border shadow-sm d-flex flex-column"
            style={{ height: "80vh" }}
          >
            {/* Header Lista */}
            <div className="d-flex align-items-center justify-content-between px-3 py-3 border-bottom">
              <span className="fw-semibold text-dark fs-5">Messaggistica</span>
              <div className="d-flex gap-1">
                <button
                  className="btn btn-link text-secondary p-2 border-0 rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: "transparent" }}
                >
                  <PiDotsThreeBold className="fs-5" />
                </button>
                <button
                  className="btn btn-link text-secondary p-2 border-0 rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: "transparent" }}
                >
                  <PiNotePencilBold className="fs-5" />
                </button>
              </div>
            </div>

            {/* Input di Ricerca */}
            <div className="p-2 border-bottom bg-white">
              <FormControl
                type="text"
                placeholder="Cerca messaggi"
                className="border-0 py-2 px-3"
                style={{
                  backgroundColor: "#edf2f7",
                  fontSize: "0.85rem",
                  borderRadius: "4px",
                  boxShadow: "none",
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Elenco Utenti */}
            <div className="flex-grow-1 overflow-auto">
              {isLoading ? (
                <div className="text-center text-muted small mt-4">
                  Caricamento...
                </div>
              ) : filteredChats.length > 0 ? (
                filteredChats.map((user) => {
                  const isSelected = activeChat?._id === user._id;
                  return (
                    <div
                      key={user._id}
                      className={`d-flex align-items-start gap-2 px-3 py-3 border-bottom border-light transition-all ${
                        isSelected
                          ? "bg-light border-start border-primary border-4"
                          : "bg-white list-group-item-action"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setActiveChat(user)}
                    >
                      <img
                        src={user.image || "https://placecats.com/45/45"}
                        alt={user.name}
                        className="rounded-circle"
                        style={{
                          width: "48px",
                          height: "48px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="d-flex flex-column w-100 overflow-hidden">
                        <div className="d-flex justify-content-between align-items-baseline">
                          <span
                            className="text-dark text-truncate fw-semibold"
                            style={{ fontSize: "0.92rem" }}
                          >
                            {user.name} {user.surname}
                          </span>
                          <span
                            className="text-muted small"
                            style={{ fontSize: "0.75rem" }}
                          >
                            17 mag
                          </span>
                        </div>
                        <span
                          className="text-muted text-truncate"
                          style={{ fontSize: "0.82rem" }}
                        >
                          {user.title || "Utente LinkedIn"}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-muted small mt-4">
                  Nessun contatto trovato
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* COLONNA DESTRA: FINESTRA DI CONVERSAZIONE ATTIVA */}
        <Col md={6} lg={8} className="p-0">
          <div
            className="bg-white rounded-end-3 border shadow-sm d-flex flex-column"
            style={{ height: "80vh" }}
          >
            {activeChat ? (
              <>
                {/* Header Chat Attiva */}
                <div
                  className="px-3 py-2 border-bottom d-flex flex-column justify-content-center"
                  style={{ height: "70px" }}
                >
                  <span
                    className="fw-bold text-dark m-0"
                    style={{ fontSize: "1rem" }}
                  >
                    {activeChat.name} {activeChat.surname}
                  </span>
                  <span
                    className="text-secondary text-truncate small"
                    style={{ fontSize: "0.8rem", maxWidth: "90%" }}
                  >
                    {activeChat.title || "Professionista su LinkedIn"}
                  </span>
                </div>

                {/* Area Messaggi */}
                <div className="flex-grow-1 overflow-auto p-3 bg-white d-flex flex-column">
                  {/* Profilo Interlocutore in cima */}
                  <div className="mb-4 p-2 border-bottom pb-3">
                    <img
                      src={activeChat.image || "https://placecats.com/80/80"}
                      alt={activeChat.name}
                      className="rounded-circle mb-2"
                      style={{
                        width: "72px",
                        height: "72px",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="fw-bold text-dark mb-0">
                      {activeChat.name} {activeChat.surname}
                    </h5>
                    <p className="text-muted small mb-0">
                      {activeChat.title || "Professionista su LinkedIn"}
                    </p>
                  </div>

                  {/* Lista messaggi storici stile LinkedIn */}
                  <div className="mt-auto">
                    {(conversations[activeChat._id] || []).map((msg) => {
                      const isMe = msg.senderId === myProfile?._id;
                      return (
                        <div
                          key={msg.id}
                          className="d-flex gap-2 mb-3 align-items-start"
                        >
                          <img
                            src={
                              isMe
                                ? myProfile?.image ||
                                  "https://placecats.com/35/35"
                                : activeChat.image ||
                                  "https://placecats.com/35/35"
                            }
                            alt="avatar"
                            className="rounded-circle mt-1"
                            style={{
                              width: "36px",
                              height: "36px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="d-flex flex-column w-100">
                            <div className="d-flex align-items-baseline gap-2">
                              <span className="fw-semibold text-dark small">
                                {isMe ? "Tu" : activeChat.name}
                              </span>
                              <span
                                className="text-muted"
                                style={{ fontSize: "0.7rem" }}
                              >
                                • {msg.timestamp}
                              </span>
                            </div>
                            <div
                              className="text-dark text-break pt-1"
                              style={{
                                fontSize: "0.88rem",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Form Invio Messaggio */}
                <form
                  onSubmit={handleSendMessage}
                  className="border-top p-3 bg-white"
                >
                  <textarea
                    ref={messageAreaRef}
                    placeholder="Scrivi un messaggio..."
                    className="form-control border-0 p-0 mb-2"
                    rows={3}
                    style={{
                      resize: "none",
                      fontSize: "0.88rem",
                      boxShadow: "none",
                      outline: "none",
                    }}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e as any);
                      }
                    }}
                  />
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Toolbar Icone */}
                    <div className="d-flex gap-1 text-secondary">
                      <button
                        type="button"
                        className="btn btn-link text-secondary p-1 border-0 rounded-circle d-flex align-items-center justify-content-center"
                      >
                        <PiImageBold size={18} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-link text-secondary p-1 border-0 rounded-circle d-flex align-items-center justify-content-center"
                      >
                        <PiPaperclipBold size={18} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-link text-secondary p-1 border-0 rounded-circle d-flex align-items-center justify-content-center"
                      >
                        <PiGifBold size={18} />
                      </button>

                      <EmojiPickerButton
                        text={newMessage}
                        setText={setNewMessage}
                        inputRef={messageAreaRef}
                      />
                    </div>
                    {/* Bottone Invia */}
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className={`btn rounded-5 px-3 py-1 fw-semibold d-flex align-items-center gap-1 border-0 ${
                        newMessage.trim()
                          ? "btn-primary"
                          : "btn-light text-muted"
                      }`}
                      style={{ fontSize: "0.85rem" }}
                    >
                      Invia <PiPaperPlaneRightBold />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="my-auto text-center text-muted px-3">
                <p className="fs-5 m-0 fw-semibold text-dark">
                  Seleziona una conversazione per iniziare
                </p>
                <span className="small text-secondary">
                  Scegli un contatto dall'elenco a sinistra per chattare.
                </span>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Messaggistica;
