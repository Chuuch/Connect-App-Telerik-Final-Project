
import React, { RefObject } from 'react';

interface LocalVideoProps {
  localVideoRef: RefObject<HTMLVideoElement>;
}

const LocalVideo: React.FC<LocalVideoProps> = ({ localVideoRef }) => {
  return (
    <div className='flex flex-col items-center justify-center mt-52 text-white dark:text-gray-300'>
      <h2>Your Video</h2>
      <video ref={localVideoRef} autoPlay playsInline muted />
    </div>
  );
};

export default LocalVideo;
