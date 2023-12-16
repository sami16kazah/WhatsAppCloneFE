import moment from 'moment';
import { BeatLoader } from 'react-spinners';

export default function Typing({ message, me }) {
  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? 'ml-auto justify-end' : ''
      }`}
    >
      <div className="">
        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${
            me ? 'bg-green_3' : 'dark:bg-dark_bg_2'
          }`}
        >
          <span className="flex gap-x-2 justify-between float-left h-full text-sm pb-4 pr-8 ">
            <BeatLoader color="white" size={5}></BeatLoader>
          </span>
          <span className="absolute right-1.5 bottom-1.5 text-xs pt-6 dark:text-dark_text_5 leading-none">
            {moment(message.createdAt).format('HH:mm')}
          </span>
        </div>
      </div>
    </div>
  );
}
