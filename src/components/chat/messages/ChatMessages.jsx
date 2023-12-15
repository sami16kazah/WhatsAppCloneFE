import { useSelector } from 'react-redux';
import Message from './Message';
import { useEffect, useRef } from 'react';
export default function ChatMessages() {
  const { messages } = useSelector((state) => state.chat);
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
        <div ref={endRef} className="mt-2"></div>
      </div>
    </div>
  );
}
