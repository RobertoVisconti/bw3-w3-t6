import { useState, useEffect, useRef } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { PiSmileyBold } from "react-icons/pi";

interface EmojiPickerButtonProps {
  text: string;
  setText: (text: string) => void;
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  align?: "left" | "right"; // Gestisce dove si apre il rettangolo del picker
  size?: number; // Gestisce la grandezza dell'icona della faccina
}

const EmojiPickerButton = ({
  text,
  setText,
  inputRef,
  align = "right", // Valore di default per la chat / altri componenti
  size = 18, // Valore di default per la chat / altri componenti
}: EmojiPickerButtonProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    const emoji = emojiData.emoji;
    const input = inputRef.current;

    if (!input) return;

    // Gestione dell'inserimento dell'emoji nella posizione del cursore
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    const newText = text.substring(0, start) + emoji + text.substring(end);
    setText(newText);

    // Riposiziona il cursore subito dopo l'emoji appena inserita
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  // Chiude il picker se si clicca fuori dal componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="position-relative d-inline-block">
      {/* Bottone della Faccina */}
      <button
        type="button"
        className="btn btn-link text-secondary p-0 border-0 rounded-circle d-flex align-items-center justify-content-center"
        onClick={() => setShowPicker(!showPicker)}
        title="Aggiungi emoji"
        style={{
          // Calcola dinamicamente l'area di hover tonda in base alla dimensione dell'icona
          width: `${size + 14}px`,
          height: `${size + 14}px`,
          backgroundColor: showPicker ? "#f3f3f3" : "transparent",
        }}
      >
        <PiSmileyBold size={size} className="text-secondary" />
      </button>

      {/* Popup del Picker */}
      {showPicker && (
        <div
          className="position-absolute shadow-lg"
          style={{
            zIndex: 1500, // Alto per sovrascrivere il modale Bootstrap
            bottom: `${size + 22}px`, // Si alza proporzionalmente alla grandezza del tasto
            left: align === "left" ? "0px" : "auto",
            right: align === "right" ? "0px" : "auto",
          }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            autoFocusSearch={false}
            theme={Theme.LIGHT}
            width={300}
            height={380}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerButton;
