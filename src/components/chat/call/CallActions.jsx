import { ArrowIcon, CallIcon, MuteIcon, NoVideoIcon } from '../../../svg';

export default function CallActions() {
  return (
    <div className="h-22 w-full absolute bottom-0 z-40 px-1">
      <div className="relative bg-[#222] px-4 pt-6 pb-12 rounded-xl">
        <button className="-rotate-90 scale-y-[300%] absolute top-1 left-1/2">
          <ArrowIcon className="fill-dark_svg_2"></ArrowIcon>
        </button>
        <ul className="flex items-center justify-between">
          <li>
            <button className="btn-secondery">
              <MuteIcon className="fill-white"></MuteIcon>
            </button>
          </li>
          <li>
            <button className="btn-secondery">
              <NoVideoIcon className="fill-white"></NoVideoIcon>
            </button>
          </li>
          <li>
            <button className="btn-secondery bg-red-600 ]">
              <CallIcon className="fill-white w-6 "></CallIcon>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
