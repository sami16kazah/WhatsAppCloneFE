import { useDispatch, useSelector } from 'react-redux';
import AddAnotherFile from './AddAnotherFile';
import SendIcon from '../../../../svg/Send';
import { UploadFiles } from '../../../../utils/upload';
import { useState } from 'react';
import {
  removeFileFromFiles,
  sendMessage,
} from '../../../../features/chatSlice';
import { ClipLoader } from 'react-spinners';
import SocketContext from '../../../../context/SocketContext';
import { CloseIcon } from '../../../../svg';
import VideoThumbnail from 'react-video-thumbnail';
function HandleAndSend({ activeIndex, setActiveIndex, message, socket }) {
  const [loading, setLoading] = useState(false);
  const { files, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const dispatch = useDispatch();
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    //upload files first
    const upload_files = await UploadFiles(files);
    const values = {
      token,
      message,
      convo_Id: activeConversation._id,
      files: upload_files.length > 0 ? upload_files : [],
    };
    let newMsg = await dispatch(sendMessage(values));
    setLoading(false);
    socket.emit('send message', newMsg.payload);
  };
  const handleRemoveFile = (index) => {
    dispatch(removeFileFromFiles(index));
  };
  return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2">
      <span>
        <div className="flex gap-x-2">
          {files.map((file, i) => (
            <div
              key={i}
              className={`fileThumbNail relative w-14 h-14 mt-2 border dark:border-white rounded-md overflow-hidden cursor-pointer ${
                activeIndex === i ? 'border-[3px] !border-green_1' : ''
              }`}
              onClick={() => setActiveIndex(i)}
            >
              {file.type === 'IMAGE' ? (
                <img
                  src={file.fileData}
                  className="w-full h-full object-cover"
                ></img>
              ) : file.type === 'VIDEO' ? (
                <VideoThumbnail
                  className=" h-full w-full object-cover"
                  videoUrl={file.fileData}
                ></VideoThumbnail>
              ) : (
                <img
                  src={require('../myFilePicture.png')}
                  className="w-full h-full object-cover"
                ></img>
              )}
              <div
                className="removeFileIcon hidden"
                onClick={() => handleRemoveFile(i)}
              >
                <CloseIcon className="fill-white absolute right-0 top-0"></CloseIcon>{' '}
              </div>
            </div>
          ))}
          <AddAnotherFile setActiveIndex={setActiveIndex}></AddAnotherFile>
          <div
            className="bg-green_1 w-14 h-14 mt-2 rounded-full flex items-center justify-center cursor-pointer"
            onClick={(e) => sendMessageHandler(e)}
          >
            {loading ? (
              <ClipLoader color="#E9EDEF" size={25}></ClipLoader>
            ) : (
              <SendIcon className="fill-white"></SendIcon>
            )}
          </div>
        </div>
      </span>
    </div>
  );
}

const HandleAndSendWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <HandleAndSend {...props} socket={socket}></HandleAndSend>}
  </SocketContext.Consumer>
);
export default HandleAndSendWithSocket;
