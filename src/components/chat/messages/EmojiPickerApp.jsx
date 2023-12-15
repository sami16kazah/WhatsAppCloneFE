import EmojiPicker from 'emoji-picker-react';
import { CloseIcon, EmojiIcon } from '../../../svg';
import { useEffect, useState } from 'react';

export default function EmojiPickerApp({
  message,
  setMessage,
  textRef,
  showPicker,
  setShowPicker,
  setShowAttachments,
}) {
  const [cursorPostion, setCursorPosition] = useState();
  useEffect(() => {
    textRef.current.selectionEnd = cursorPostion;
  }, [cursorPostion]);

  const handleEmoji = (emojiData, e) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substr(0, ref.selectionStart);
    const end = message.substr(ref.selectionStart);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <li className="">
      <button
        onClick={() => {
          setShowAttachments(false);
          setShowPicker((prev) => !prev);
        }}
        className="btn"
        type="button"
      >
        {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1"></CloseIcon>
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1"></EmojiIcon>
        )}
      </button>

      {showPicker ? (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px]">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji}></EmojiPicker>
        </div>
      ) : null}
    </li>
  );
}
