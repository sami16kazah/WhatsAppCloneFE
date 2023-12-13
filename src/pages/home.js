import { useDispatch, useSelector } from 'react-redux';
import { SideBar } from '../components/sidebar';
import { useEffect } from 'react';
import { getConversations } from '../features/chatSlice';
export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      dispatch(getConversations(user.token));
    }
  });

  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      <div className="container min-h-screen flex">
        <SideBar></SideBar>
      </div>
    </div>
  );
}
