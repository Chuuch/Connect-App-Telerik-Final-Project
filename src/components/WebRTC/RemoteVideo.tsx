
import React, { RefObject } from 'react';

interface RemoteVideoProps {
  remoteVideoRef: RefObject<HTMLVideoElement>;
}

const RemoteVideo: React.FC<RemoteVideoProps> = ({ remoteVideoRef }) => {
  return (
    <div className='flex items-center justify-center text-white dark:text-gray-300 mt-52'>
      
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default RemoteVideo;
