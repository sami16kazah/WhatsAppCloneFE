import { useState } from 'react';
import SideBarHeader from './header/SideBarHeader';
import Notifications from './notifications/Notifications';
import Search from './search/Search';
import Conversations from './converstions/Conversations';
import SearchResults from './search/SearchResults';
export default function SideBar({ onlineUsers, typing }) {
  const [searchResult, setSearchResults] = useState([]);

  return (
    <div className="flex0030 w-[30%] h-full select-none">
      <SideBarHeader></SideBarHeader>
      <Notifications></Notifications>
      <Search
        searchLength={searchResult.length}
        setSearchResults={setSearchResults}
      ></Search>
      {searchResult.length > 0 ? (
        <SearchResults
          searchResult={searchResult}
          setSearchResults={setSearchResults}
        ></SearchResults>
      ) : (
        <Conversations
          onlineUsers={onlineUsers}
          typing={typing}
        ></Conversations>
      )}
    </div>
  );
}
