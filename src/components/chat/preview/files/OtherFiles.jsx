import { SendIcon } from '../../../../svg/';
export default function OtherFiles({ file, type }) {
  return (
    <div className="bg-green_3 p-2">
      <div className="flex justify-between gap-x-8">
        <div className="flex justify-center gap-2">
          <img
            className="w-8 object-contain"
            src={require(`../myFilePicture.png`)}
          ></img>
          <div className="flex flex-col gap-2 ">
            <h1>{file.data.public_id.split('.')[1]}</h1>
            <span className="text-sm">
              {(file.data.bytes / 1024).toFixed(2)} KB - {type}
            </span>
          </div>
        </div>
        <a href={file.data.secure_url} target="_blank" download>
          <SendIcon></SendIcon>
        </a>
      </div>
    </div>
  );
}
