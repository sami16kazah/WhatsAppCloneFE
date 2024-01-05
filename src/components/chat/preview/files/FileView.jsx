import { useSelector } from 'react-redux';

export default function FileViewer({ activeIndex }) {
  const { files } = useSelector((state) => state.chat);
  return (
    <div className="w-full max-w-[60%]">
      <div className="flex items-center justify-center">
        {files[activeIndex]?.type === 'IMAGE' ? (
          <img
            src={files[activeIndex]?.fileData}
            alt=""
            className="max-w-[80%] object-contain hview"
          ></img>
        ) : files[activeIndex]?.type === 'VIDEO' ? (
          <video
            className="max-w-[80%] object-contain hview"
            src={files[activeIndex].fileData}
            controls
          ></video>
        ) : (
          <img
            src={require(`../myFilePicture.png`)}
            className="max-w-[80%] object-contain hview"
          ></img>
        )}
      </div>
      <span className=" flex items-center justify-center  dark:text-dark_text_2">
        {(files[activeIndex]?.file?.size / 1024).toFixed(2)} KB -{' '}
        {files[activeIndex]?.type}
      </span>
    </div>
  );
}
