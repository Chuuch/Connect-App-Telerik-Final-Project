
import { uuidv4 } from "@firebase/util";
import WebRTC from "../WebRTC/WebRTC"


interface VideoCallProps {

}

export const VideoCallView: React.FC<VideoCallProps> = () => {

  return (
    <div>
      <WebRTC roomId={uuidv4()}/>
    </div>
  );
};