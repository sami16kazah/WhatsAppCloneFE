import EmojiPickerApp from './EmojiPickerApp';
import AttachMents from './AttachMents';
import Input from './Input';
import { SendIcon } from '../../../svg';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../features/chatSlice';
import { ClipLoader } from 'react-spinners';
import SocketContext from '../../../context/SocketContext';

function ChatActions({ socket }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const { activeConversation, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const [showPicker, setShowPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [loading, setLoading] = useState(false);

  const textRef = useRef();
  const values = {
    message,
    files: [],
    convo_Id: activeConversation._id,
    token: user.token,
  };
  const sendMessageHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    let newMessage = await dispatch(sendMessage(values));
    socket.emit('send message', newMessage.payload);
    setMessage('');
    setLoading(false);
  };
  return (
    <form
      onSubmit={(e) => sendMessageHandler(e)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      <div className="w-full flex items-center gap-x-2">
        <ul className="flex gap-x-2">
          <EmojiPickerApp
            message={message}
            setMessage={setMessage}
            textRef={textRef}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            setShowAttachments={setShowAttachments}
          ></EmojiPickerApp>
          <AttachMents
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
            setShowPicker={setShowPicker}
          ></AttachMents>
        </ul>
        <Input
          message={message}
          setMessage={setMessage}
          textRef={textRef}
        ></Input>
        <button className="btn" type="submit">
          {status === 'loading' && loading ? (
            <ClipLoader color="#E9EDEF" size={25}></ClipLoader>
          ) : (
            <SendIcon className="dark:fill-dark_svg_1"></SendIcon>
          )}
        </button>
      </div>
    </form>
  );
}

const ChatWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatActions {...props} socket={socket}></ChatActions>}
  </SocketContext.Consumer>
);
export default ChatWithContext;
