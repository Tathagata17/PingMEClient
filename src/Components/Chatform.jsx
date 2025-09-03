import EmojiPicker from "emoji-picker-react";
import { SendHorizonal, Smile } from "lucide-react";
import React, { useState } from "react";

function Chatform({ message }) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    message(text);
    setText("");
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative">
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <input
        id="textInput"
          className="w-full p-2 rounded-md outline-none border"
          placeholder="Type a message"
          type="text"
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
          className="p-2"
        >
          <Smile />
        </button>
        <button type="submit" className="p-2" id="send">
          <SendHorizonal />
        </button>
      </form>

      {showEmoji && (
        <div className="absolute bottom-12 right-0 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}

export default Chatform;
