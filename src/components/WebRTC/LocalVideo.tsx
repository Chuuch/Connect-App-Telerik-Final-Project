
import React, { RefObject } from 'react';

interface LocalVideoProps {
  localVideoRef: RefObject<HTMLVideoElement>;
}

const LocalVideo: React.FC<LocalVideoProps> = ({ localVideoRef }) => {
  return (
    <div>
      <h2>Your Video</h2>
      <video ref={localVideoRef} autoPlay playsInline muted />
    </div>
  );
};

export default LocalVideo;
