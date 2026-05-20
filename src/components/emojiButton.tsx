import { useState, useEffect, useRef } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { PiSmileyBold } from "react-icons/pi";

interface EmojiPickerButtonProps {
  text: string;
  setText: (text: string) => void;
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
}

const EmojiPickerButton = ({
  text,
  setText,
  inputRef,
}: EmojiPickerButtonProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    const emoji = emojiData.emoji;
    const input = inputRef.current;

    if (!input) return;

    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    const newText = text.substring(0, start) + emoji + text.substring(end);
    setText(newText);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

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
        className="btn btn-link text-secondary p-1 border-0 rounded-circle d-flex align-items-center justify-content-center"
        onClick={() => setShowPicker(!showPicker)}
        title="Aggiungi emoji"
      >
        <PiSmileyBold size={18} />
      </button>

      {/* Popup del Picker */}
      {showPicker && (
        <div
          className="position-absolute shadow-lg"
          style={{
            zIndex: 1100,
            bottom: "40px",
            right: "0px",
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
