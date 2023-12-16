import { useSelector } from 'react-redux';
import Message from './Message';
import { useEffect, useRef } from 'react';
import { BeatLoader } from 'react-spinners';
import Typing from './Typing';
export default function ChatMessages({ typing }) {
  const { messages, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const endRef = useRef();
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behaviour: 'smooth' });
  };
  console.log('message', messages);
  return (
    <div className="mb-[60px] bg-[url(dark_background.jpg)] bg-cover bg-no-repeat">
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[6%]">
        {messages &&
          messages.map((msg) => (
            <Message
              message={msg}
              key={msg._id}
              me={user._id === msg.sender._id}
            />
          ))}
        <p className="text-dark_text_1 mb-4">
          {typing === activeConversation._id ? (
            <Typing message="typing ... "></Typing>
          ) : (
            ''
          )}
        </p>
        <div ref={endRef} className="mt-2"></div>
      </div>
    </div>
  );
}
