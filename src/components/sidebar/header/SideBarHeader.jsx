import { useSelector } from 'react-redux';
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from '../../../svg';

export default function SideBarHeader() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16">
      <div className="w-full flex items-center justify-between">
        <button className="btn">
          <img
            src={user.picture}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          ></img>
        </button>
        <ul className="flex items-center gap-x-2 5">
          <li className="btn">
            <CommunityIcon className="dark:fill-dark_svg_1"></CommunityIcon>
          </li>
          <li className="btn">
            <StoryIcon className="dark:fill-dark_svg_1"></StoryIcon>
          </li>
          <li className="btn">
            <ChatIcon className="dark:fill-dark_svg_1"></ChatIcon>
          </li>
          <li className="btn">
            <DotsIcon className="dark:fill-dark_svg_1"></DotsIcon>
          </li>
        </ul>
      </div>
    </div>
  );
}
