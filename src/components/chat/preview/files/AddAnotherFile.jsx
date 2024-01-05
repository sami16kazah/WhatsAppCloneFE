import { useRef } from 'react';
import CloseIcon from '../../../../svg/Close';
import { useDispatch } from 'react-redux';
import { addFiles } from '../../../../features/chatSlice';
import { getFileType } from '../../../../utils/files';
export default function AddAnotherFile({ setActiveIndex }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const fileHandler = (e) => {
    let files = Array.from(e.target.files);
    console.log(files);
    files.forEach((file) => {
      if (
        file.type !== 'application/pdf' &&
        file.type !== 'application/vnd.ms-word' &&
        file.type !== 'application/msword' &&
        file.type !==
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        file.type !== 'application/vnd.ms-powerpoint' &&
        file.type !== 'application/vnd.ms-publisher' &&
        file.type !== 'application/vnd.ms-excel' &&
        file.type !== 'text/plain' &&
        file.type !== 'application/x-freearc' &&
        file.type !==
          'application/vnd.openxmlformats-officedocument.presentationml.presentation' &&
        file.type !== 'application/zip' &&
        file.type !== 'application/vnd.rar' &&
        file.type !== 'audio/mpeg' &&
        file.type !== 'audio/wav' &&
        file.type !== 'audio/aac' &&
        file.type !== 'image/png' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/gif' &&
        file.type !== 'image/webp' &&
        file.type !== 'video/mp4' &&
        file.type !== 'video/mpeg' &&
        file.type !== 'video/x-msvideo' &&
        file.type !== 'video/webm' &&
        file.type !== 'video/ogg' &&
        file.type !== 'video/flv'
      ) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 100) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          dispatch(
            addFiles({
              file: file,
              fileData: e.target.result,
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };
  return (
    <div
      onClick={() => inputRef.current.click()}
      className="w-14 h-14 border mt-2 dark:border-white rounded-md flex items-center justify-center cursor-pointer"
    >
      <span className="rotate-45 ">
        <CloseIcon className="dark:fill-dark_svg_1"></CloseIcon>
      </span>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="application/* ,text/plain , image/* , video/*"
        onChange={fileHandler}
      ></input>
    </div>
  );
}
