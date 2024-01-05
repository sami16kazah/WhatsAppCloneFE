import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '../../../../svg/Close.js';
import { clearFiles } from '../../../../features/chatSlice';
export default function Header({ activeIndex }) {
  const disptch = useDispatch();
  const { files } = useSelector((state) => state.chat);
  const clearFilesHandler = () => {
    disptch(clearFiles());
  };
  return (
    <div className="w-full pl-4">
      <div className="w-full flex items-center justify-between">
        <div
          className="translate-x-4 cursor-pointer"
          onClick={() => clearFilesHandler()}
        >
          <CloseIcon className="dark:fill-dark_svg_1"></CloseIcon>
        </div>
        <h1 className="dark:text-dark_text_1 text-[15px]">
          {files[activeIndex]?.file?.name}
        </h1>
        {/* empty tag to make h1 in the middle */}
        <span></span>
      </div>
    </div>
  );
}
