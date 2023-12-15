import { useSelector } from 'react-redux';
import { DotsIcon, SearchLargeIcon } from '../../svg';
import { Capitalize } from '../../utils/string';
export default function ChatHeader() {
  const { activeConversation } = useSelector((state) => state.chat);
  const { name, picture } = activeConversation;
  return (
    <div className="h-[49px] dark:bg-dark_bg_2 flex items-center p-8 select-none">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button className="btn">
            <img
              src={picture}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            ></img>
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {Capitalize(name.split(' ')[0])}
            </h1>
            <span className="text-xs dark:text-dark_text_2">online</span>
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
