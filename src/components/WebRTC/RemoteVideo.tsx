
import React, { RefObject } from 'react';

interface RemoteVideoProps {
  remoteVideoRef: RefObject<HTMLVideoElement>;
}

const RemoteVideo: React.FC<RemoteVideoProps> = ({ remoteVideoRef }) => {
  return (
    <div>
      <h2>Participant's Video</h2>
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default RemoteVideo;
