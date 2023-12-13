import { useState } from 'react';
import SideBarHeader from './header/SideBarHeader';
import Notifications from './notifications/Notifications';
import Search from './search/Search';
import Conversations from './converstions/Conversations';

export default function SideBar() {
  const [searchResult, setSearchResults] = useState([]);
  return (
    <div className="w-[40%] h-full select-none">
      <SideBarHeader></SideBarHeader>
      <Notifications></Notifications>
      <Search searchLength={searchResult.length}></Search>
      <Conversations></Conversations>
    </div>
  );
}
