import { useDispatch, useSelector } from 'react-redux';
import { SideBar } from '../components/sidebar';
import { useEffect, useRef, useState } from 'react';
import { getConversations, updateMessaages } from '../features/chatSlice';
import WhatsAppHome from '../components/chat/WhatsAppHome';
import ChatContainer from '../components/chat/ChatContainer';
import SocketContext from '../context/SocketContext';
import Call from '../components/chat/call/Call';
import Peer from 'simple-peer';
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from '../utils/chat';
function Home({ socket }) {
  const CallData = {
    socketId: '',
    recivingCall: false,
    CallEnded: false,
    name: '',
    picture: '',
    signal: '',
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState('false');
  const [stream, setStream] = useState(null);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const [call, setCall] = useState(CallData);
  const { recivingCall, CallEnded } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  const [startCalling, setStartCalling] = useState(false);

  useEffect(() => {
    setupMedia();
    socket.on('setup socket id', (id) => {
      setCall((prevCall) => ({ ...prevCall, socketId: id }));
    });
    socket.on('call user', (data) => {
      setCall((prevCall) => ({
        ...prevCall,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        recivingCall: true,
      }));
    });
  }, []);

  const callUser = () => {
    enableMedia();
    setCall((prevCall) => ({
      ...prevCall,
      name: getConversationName(user, activeConversation.users),
      picture: getConversationPicture(user, activeConversation.users),
    }));
    const peer = new Peer({ initiator: true, trickle: false, stream: stream });
    peer.on('signal', (data) => {
      socket.emit('call user', {
        userToCall: getConversationId(user, activeConversation.users),
        signal: data,
        from: call.socketId,
        name: user.name,
        picture: user.picture,
      });
    });
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
      console.log('user video stream ');
      console.log(stream);
    });
    socket.on('call accepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal.data);
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    enableMedia();
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream: stream });
    peer.on('signal', (data) => {
      socket.emit('answer call', { signal: data, socketId: call.socketId });
    });
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const enableMedia = () => {
    myVideo.current.srcObject = stream;

    setStartCalling(true);
  };

  const setupMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
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
      Notification.requestPermission();
      dispatch(getConversations(user.token));
    }
  }, [user]);

  const displayNotification = (message) => {
    if ('serviceWorker' in navigator) {
      var options = {
        body: message.message,
        icon: '../../../logo192.png',
        image: message.sender.picture,
        dir: 'ltr',
      };
      navigator.serviceWorker.ready.then((swreg) => {
        swreg.showNotification(message.sender.name, options);
      });
    }
  };

  useEffect(() => {
    socket.on('receive message', async (message) => {
      dispatch(updateMessaages(message));
      if (message?.sender._id !== user._id) {
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
    <>
      <div className="max-h-full dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
        <div className="container max-h-full flex">
          <SideBar onlineUsers={onlineUsers} typing={typing}></SideBar>
          {activeConversation._id ? (
            <ChatContainer
              onlineUsers={onlineUsers}
              typing={typing}
              callUser={callUser}
            />
          ) : (
            <WhatsAppHome></WhatsAppHome>
          )}
        </div>
      </div>
      <Call
        call={call}
        setCall={setCall}
        callAccepted={callAccepted}
        userVideo={userVideo}
        myVideo={myVideo}
        startCalling={startCalling}
        answerCall={answerCall}
      ></Call>
    </>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket}></Home>}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
