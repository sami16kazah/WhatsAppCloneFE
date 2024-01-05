import FileInput from './FileInput';
import FileViewer from './FileView';
import Header from './Header';
import HandleAndSend from './HandleAndSend';
import { useState } from 'react';
export default function FilePreview() {
  const [message, setMessage] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="relative py-2 w-full flex items-center justify-center ">
      <div className="w-full flex flex-col items-center">
        <Header activeIndex={activeIndex}></Header>
        <FileViewer activeIndex={activeIndex}></FileViewer>
        <div className="w-full flex flex-col items-center">
          <FileInput message={message} setMessage={setMessage}></FileInput>
          <HandleAndSend
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            message={message}
          ></HandleAndSend>
        </div>
      </div>
    </div>
  );
}
