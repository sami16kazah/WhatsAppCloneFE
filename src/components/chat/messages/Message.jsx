import moment from 'moment';

export default function Message({ message, me }) {
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
          <p className="float-left h-full text-sm pb-4 pr-8 ">
            {message.message}
          </p>
          <span className="absolute right-1.5 bottom-1.5 text-xs pt-6 dark:text-dark_text_5 leading-none">
            {moment(message.createdAt).format('HH:mm')}
          </span>
        </div>
      </div>
    </div>
  );
}
