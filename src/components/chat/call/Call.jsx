import { useState } from 'react';
import CallActions from './CallActions';
import CallArea from './CallArea';
import CallHeader from './CallHeader';
import Ringing from './Ringing';

export default function Call({
  call,
  setCall,
  callAccepted,
  userVideo,
  myVideo,
  startCalling,
  answerCall,
}) {
  const { recivingCall, CallEnded } = call;
  const [showActions, setShowActions] = useState(false);
  const { name, picture } = call;
  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] z-10 rounded-2xl callbg overflow-hidden ${
          startCalling || (recivingCall && !callAccepted) ? '' : 'hidden'
        }`}
        onMouseOver={() => setShowActions(true)}
        onMouseOut={() => setShowActions(false)}
      >
        <div>
          <div>
            <CallHeader></CallHeader>
            <CallArea name={name}></CallArea>
            {showActions ? <CallActions></CallActions> : null}
          </div>
          <div>
            <div>
              {callAccepted && !CallEnded ? (
                <video
                  ref={userVideo}
                  playsInline
                  muted
                  autoPlay
                  className="largeVideoCall"
                ></video>
              ) : null}
            </div>
            <div>
              <video
                ref={myVideo}
                playsInline
                muted
                autoPlay
                className={`smallVideoCall ${showActions ? 'moveVideo' : ''}`}
              ></video>
            </div>
          </div>
        </div>
      </div>
      {recivingCall && !callAccepted && (
        <Ringing
          call={call}
          setCall={setCall}
          answerCall={answerCall}
          picture={picture}
        ></Ringing>
      )}
    </>
  );
}
