import { useRef, useState } from "react";
import { FormControl } from "react-bootstrap";
import {
  PiCaretUpBold,
  PiCaretDownBold,
  PiNotePencilBold,
  PiDotsThreeBold,
  PiArrowLeftBold,
  PiPaperPlaneRightBold,
} from "react-icons/pi";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
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

const ChatBar = () => {
  const chatInputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
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

  const handleSendMessage = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim() || !myProfile?._id || !activeChat?._id) return;

    const msg: Message = {
      id: Date.now().toString(),
      senderId: myProfile._id,
      text: newMessage,
      timestamp: "Adesso",
    };

    // salviamo il messaggio unicamente nella lista dell'utente selezionato
    setConversations((prevConversations) => {
      const currentChatMessages = prevConversations[activeChat._id] || [];
      return {
        ...prevConversations,
        [activeChat._id]: [...currentChatMessages, msg],
      };
    });

    setNewMessage("");
  };

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
        <div
          className="d-flex align-items-center gap-2 overflow-hidden"
          style={{ maxWidth: "70%" }}
        >
          {isOpen && activeChat ? (
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-link text-secondary p-0 border-0 me-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveChat(null);
                }}
              >
                <PiArrowLeftBold />
              </button>
              <img
                src={activeChat.image || "https://placecats.com/100/100"}
                alt={activeChat.name}
                className="rounded-circle"
                style={{ width: "32px", height: "32px", objectFit: "cover" }}
              />
              <span
                className="fw-semibold text-dark text-truncate"
                style={{ fontSize: "0.9rem" }}
              >
                {activeChat.name}
              </span>
            </div>
          ) : (
            <>
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
            </>
          )}
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

      {isOpen && (
        <div
          className="d-flex flex-column h-100"
          style={{ paddingBottom: "50px" }}
        >
          {!activeChat ? (
            <>
              {/* LISTA UTENTI */}
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
                {isLoading ? (
                  <div className="text-center text-muted small mt-4">
                    Caricamento...
                  </div>
                ) : filteredChats.length > 0 ? (
                  filteredChats.map((user) => (
                    <div
                      key={user._id}
                      className="d-flex align-items-start gap-2 px-3 py-2 token-chat-row border-bottom border-light"
                      style={{ cursor: "pointer" }}
                      onClick={() => setActiveChat(user)}
                    >
                      <img
                        src={user.image || "https://placecats.com/40/40"}
                        alt={user.name}
                        className="rounded-circle"
                        style={{
                          width: "42px",
                          height: "42px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="d-flex flex-column w-100 overflow-hidden">
                        <div className="d-flex justify-content-between align-items-baseline">
                          <span
                            className="text-dark text-truncate"
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
            </>
          ) : (
            <>
              {/* FINESTRA DI CHAT INTERNA */}
              <div className="d-flex flex-column h-100 bg-light justify-content-between position-relative">
                <div
                  className="flex-grow-1 overflow-auto p-3"
                  style={{ maxHeight: "310px" }}
                >
                  {(() => {
                    const currentChatMessages =
                      conversations[activeChat._id] || [];

                    return currentChatMessages.length === 0 ? (
                      <div className="text-center text-muted small mt-5">
                        Dì ciao a {activeChat.name}! Inizia una conversazione.
                      </div>
                    ) : (
                      currentChatMessages.map((msg) => {
                        const isMe = msg.senderId === myProfile?._id;
                        return (
                          <div
                            key={msg.id}
                            className={`d-flex flex-column mb-2 ${isMe ? "align-items-end" : "align-items-start"}`}
                          >
                            <div
                              className={`px-3 py-2 rounded-3 text-break ${
                                isMe
                                  ? "bg-primary text-white"
                                  : "bg-white text-dark border shadow-sm"
                              }`}
                              style={{ fontSize: "0.85rem", maxWidth: "80%" }}
                            >
                              {msg.text}
                            </div>
                            <span
                              className="text-muted mt-1"
                              style={{ fontSize: "0.65rem" }}
                            >
                              {msg.timestamp}
                            </span>
                          </div>
                        );
                      })
                    );
                  })()}
                </div>

                <form
                  onSubmit={handleSendMessage}
                  className="d-flex align-items-center gap-1 p-2 bg-white border-top position-absolute bottom-0 start-0 w-100"
                  style={{ height: "52px" }}
                >
                  <input
                    ref={chatInputRef}
                    type="text"
                    placeholder="Invia un messaggio..."
                    className="form-control form-control-sm border-0 bg-light py-1.5 px-3"
                    style={{ fontSize: "0.85rem", borderRadius: "20px" }}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <EmojiPickerButton
                    text={newMessage}
                    setText={setNewMessage}
                    inputRef={chatInputRef}
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="btn btn-primary d-flex align-items-center justify-content-center p-2 rounded-circle border-0"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <PiPaperPlaneRightBold style={{ fontSize: "0.9rem" }} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBar;
