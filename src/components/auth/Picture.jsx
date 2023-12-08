import { useRef, useState } from 'react';

export default function Picture({
  readablePicture,
  setPicture,
  setReadablePicture,
}) {
  const [error, setError] = useState('');
  const inputRef = useRef();
  const handlePicture = (e) => {
    let pic = e.target.files[0];
    if (
      pic.type !== 'image/jpeg' &&
      pic.type !== 'image/jpg' &&
      pic.type !== 'image/png' &&
      pic.type !== 'image/webp'
    ) {
      setError(`${pic.name.substr(0, 5)} format is not supported`);
      return;
    } else if (pic.size > 1024 * 1024 * 15) {
      setError(`${pic.name.substr(0, 5)} size is more than 15 mb`);
      return;
    } else {
      setError('');
      setPicture(pic);
      // reading the file
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
    }
  };
  const handleChangePic = () => {
    setPicture('');
    setReadablePicture('');
    inputRef.current.click();
  };
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="picture"
            className="w-20 h-20 object-cover rounded-full"
          ></img>
          <div
            className="w-20 mt-2 py-2 dark: bg-dark_bg_3 rounded-md text-xs flex items-center justify-center cursor-pointer"
            onClick={() => {
              handleChangePic();
            }}
          >
            Change
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current.click()}
          className="w-full h-12 dark: bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
        >
          {' '}
          Upload picture
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpeg,image/jpg,/image/webp"
        onChange={handlePicture}
      />
      <div className="mt-2">
        <p className="text-red-400 ">{error}</p>
      </div>
    </div>
  );
}
