import { useEffect, useState } from 'react';
import { CloseIcon } from '../../../svg';
import { SeenIcon } from '../../../svg';

export default function Ringing({ call, setCall, name, picture, answerCall }) {
  const { recivingCall, CallEnded } = call;
  const [timer, setTimer] = useState(0);
  let interval;
  const handleTimer = () => {
    interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    if (timer <= 35) {
      handleTimer();
    } else {
      setCall({ ...call, recivingCall: false });
    }
    return () => clearInterval(interval);
  }, [timer]);

  console.log(picture);
  return (
    <div className="dark:bg-dark_bg_1 rounded-lg fixed top-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-lg z-30">
      <div className="p-4 flex items-center justify-between gap-x-8 ">
        <div className="flex items-center gap-x-2">
          <img
            className="w-28 h-28 rounded-full"
            src={picture}
            alt={`caller profile picture`}
          />
          <div>
            <h1 className="text-white">
              <b>{name}</b>
            </h1>
            <span className="text-dark_text_2"> Whats App Video .... </span>
          </div>
        </div>
        <ul className="flex items-center gap-x-2">
          <li>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
              <CloseIcon className="fill-white w-5"></CloseIcon>
            </button>
          </li>

          <li onClick={() => answerCall()}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
              <SeenIcon className="fill-white w-5"></SeenIcon>
            </button>
          </li>
        </ul>
      </div>
      <audio id="audio" src="../../../ring.mp3" autoPlay loop></audio>
    </div>
  );
}
