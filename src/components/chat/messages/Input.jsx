import { useState } from 'react';
import SocketContext from '../../../context/SocketContext';
import { useSelector } from 'react-redux';
function Input({ message, setMessage, textRef, socket }) {
  const { activeConversation, status } = useSelector((state) => state.chat);
  const [typing, setTyping] = useState(false);
  const onChangeHandler = (e) => {
    setMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit('typing', activeConversation._id);
    }
    let lastTypingTime = new Date().getTime();
    let timer = 2000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timer && typing) {
        socket.emit('stop typing', activeConversation._id);
        setTyping(false);
      }
    }, timer);
  };
  console.log('typing', message);
  return (
    <div className="w-full ">
      <input
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-l rounded-lg pl-4"
        placeholder="Type a message"
        value={message}
        onChange={onChangeHandler}
        ref={textRef}
      ></input>
    </div>
  );
}

const InputWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Input {...props} socket={socket}></Input>}
  </SocketContext.Consumer>
);
export default InputWithSocket;
