import moment from 'moment';
import FileImageVideo from './FileImageVideo';
import OtherFiles from './OtherFiles';
export default function FileMessage({ FileMessage, message, me }) {
  const { file, type } = FileMessage;
  console.log(file);
  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? 'ml-auto justify-end' : ''
      }`}
    >
      <div className="">
        <div
          className={`relative h-full dark:text-dark_text_1  rounded-lg ${
            me ? 'bg-white border-[3px] border-green_3' : 'dark:bg-dark_bg_2'
          }
          ${
            me && file.data.public_id.split('.')[1] === 'png'
              ? 'bg-white border-[3px] border-green_3'
              : 'dark:bg-dark_bg_2 p-1'
          }`}
        >
          <div
            className={`h-full text-sm ${
              type !== 'IMAGE' && type !== 'VIDEO' ? 'pb-5' : ''
            }`}
          >
            {FileMessage.type === 'IMAGE' || FileMessage.type === 'VIDEO' ? (
              <FileImageVideo
                url={file.data.secure_url}
                type={type}
              ></FileImageVideo>
            ) : (
              <OtherFiles file={file} type={type}></OtherFiles>
            )}
          </div>
          <span className="absolute right-1.5 bottom-1.5 text-xs pt-6 dark:text-dark_text_5 leading-none">
            {moment(message.createdAt).format('HH:mm')}
          </span>
        </div>
      </div>
    </div>
  );
}
