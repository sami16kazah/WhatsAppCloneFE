import { useSelector } from 'react-redux';
import { DotsIcon, SearchLargeIcon } from '../../svg';
import { Capitalize } from '../../utils/string';
import {
  getConversationName,
  getConversationPicture,
} from '../../utils/chat.js';
export default function ChatHeader({ onlineUsers }) {
  const { activeConversation } = useSelector((state) => state.chat);
  const { name, picture } = activeConversation;
  const { user } = useSelector((state) => state.user);
  return (
    <div className="h-[49px] dark:bg-dark_bg_2 flex items-center p-8 select-none">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button className="btn">
            <img
              src={getConversationPicture(user, activeConversation.users)}
              alt={getConversationName(user, activeConversation.users)}
              className={`w-full h-full rounded-full object-cover ${
                onlineUsers ? 'online' : ''
              }`}
            ></img>
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {Capitalize(getConversationName(user, activeConversation.users))}
            </h1>
            <span className="text-xs dark:text-dark_text_2">
              {onlineUsers ? 'online' : null}
            </span>
          </div>
        </div>
        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1"></SearchLargeIcon>
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1"></DotsIcon>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
