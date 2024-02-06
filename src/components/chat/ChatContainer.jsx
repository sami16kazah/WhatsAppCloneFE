import { useDispatch, useSelector } from 'react-redux';
import ChatHeader from './ChatHeader';
import ChatMessages from './messages/ChatMessages';
import { useEffect } from 'react';
import { getConversationMessages } from '../../features/chatSlice';
import ChatActions from './messages/ChatActions';
import { getConversationId } from '../../utils/chat';

export default function ChatContainer({ onlineUsers, typing, callUser }) {
  const dispatch = useDispatch();
  const { activeConversation, messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const values = {
    token: user.token,
    convo_id: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative w-full h-full  dark:bg-dark_bg_1 select-none border-l dark:border-l-dark_border_2 border-b-[6px] border-b-green_2 overflow-hidden">
      <div className="">
        <ChatHeader
          onlineUsers={onlineUsers.find((u) =>
            u.userId === getConversationId(user, activeConversation.users)
              ? true
              : false
          )}
          callUser={callUser}
        ></ChatHeader>
        <ChatMessages typing={typing}></ChatMessages>
        <ChatActions></ChatActions>
      </div>
    </div>
  );
}
