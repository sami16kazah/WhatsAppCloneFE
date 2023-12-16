import { useDispatch, useSelector } from 'react-redux';
import { SideBar } from '../components/sidebar';
import { useEffect, useState } from 'react';
import { getConversations, updateMessaages } from '../features/chatSlice';
import WhatsAppHome from '../components/chat/WhatsAppHome';
import ChatContainer from '../components/chat/ChatContainer';
import SocketContext from '../context/SocketContext';
function Home({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState('false');
  useEffect(() => {
    socket.emit('join', user._id);
    socket.on('get-online-users', (users) => {
      console.log('onlineUsers', users);
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  useEffect(() => {
    socket.on('receive message', (message) => {
      dispatch(updateMessaages(message));
    });
  }, []);

  useEffect(() => {
    socket.on('typing', (conversation) => {
      setTyping(conversation);
    });
    socket.on('stop typing', () => {
      setTyping(false);
    });
  }, []);

  return (
    <div className="max-h-full dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      <div className="container max-h-full flex">
        <SideBar onlineUsers={onlineUsers} typing={typing}></SideBar>
        {activeConversation._id ? (
          <ChatContainer onlineUsers={onlineUsers} typing={typing} />
        ) : (
          <WhatsAppHome></WhatsAppHome>
        )}
      </div>
    </div>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket}></Home>}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
