import { useRef } from 'react';
import { DocumentIcon, PhotoIcon } from '../../../../svg';
import { useDispatch, useSelector } from 'react-redux';
import { addFiles } from '../../../../features/chatSlice';
import { getFileType } from '../../../../utils/files';
export default function DocumentAttachment() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const documentHandler = (e) => {
    let files = Array.from(e.target.files);
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
        file.type !== 'audio/aac'
      ) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 25) {
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
    <li>
      <button
        type="button"
        className="rounded-full bg-[#BF59CF]"
        onClick={() => inputRef.current.click()}
      >
        <DocumentIcon></DocumentIcon>
        <input
          type="file"
          hidden
          multiple
          ref={inputRef}
          accept="application/pdf,application/msword,application/vnd.ms-powerpoint,application/vnd.ms-excel,application/vnd.ms-publisher,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip,application/x-freearc,text/plain,audio/m4a,audio/mpeg,audio/wav,audio/aac,application/vnd.rar,application/vnd.openxmlformats-officedocument.presentationml.presentation"
          onChange={documentHandler}
        ></input>
      </button>
    </li>
  );
}
