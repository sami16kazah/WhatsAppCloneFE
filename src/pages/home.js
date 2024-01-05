import { useDispatch, useSelector } from 'react-redux';
import { SideBar } from '../components/sidebar';
import { useEffect, useRef, useState } from 'react';
import { getConversations, updateMessaages } from '../features/chatSlice';
import WhatsAppHome from '../components/chat/WhatsAppHome';
import ChatContainer from '../components/chat/ChatContainer';
import SocketContext from '../context/SocketContext';
function Home({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation, message } = useSelector((state) => state.chat);
  const activeConversationRef = useRef();
  activeConversationRef.current = activeConversation;
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState('false');
  let reg;

  const displayNotification = (message) => {
    Notification.requestPermission().then((status) => {
      if (status === 'granted') {
        // permission granted, show notification
        if ('serviceWorker' in navigator) {
          var options = {
            body: message.message,
            icon: '../../../logo192.png',
            image: message.sender.picture,
            dir: 'ltr',
            vibrate: [100, 50, 200],
            badge: '../../../logo192.png',
          };
          navigator.serviceWorker.ready.then((swreg) => {
            swreg.showNotification(message.sender.name, options);
          });
        }
      } else {
        // permission denied or default, do nothing
        console.log('Notification permission status:', status);
      }
    });
  };

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
    socket.on('receive message', async (message) => {
      await dispatch(updateMessaages(message));
      console.log(message.conversation._id, activeConversationRef.current._id);
      if (
        message._id &&
        //activeConversationRef.current._id !== undefined &&
        message.sender._id !== user._id &&
        message.conversation._id !== activeConversationRef.current._id
      ) {
        console.log(
          message.conversation._id,
          activeConversationRef.current._id
        );
        displayNotification(message);
      }
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
