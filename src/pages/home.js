import { useDispatch, useSelector } from 'react-redux';
import { SideBar } from '../components/sidebar';
import { useEffect } from 'react';
import { getConversations } from '../features/chatSlice';
import WhatsAppHome from '../components/chat/WhatsAppHome';
export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      <div className="container min-h-screen flex">
        <SideBar></SideBar>
        {activeConversation._id ? 'home' : <WhatsAppHome></WhatsAppHome>}
      </div>
    </div>
  );
}
