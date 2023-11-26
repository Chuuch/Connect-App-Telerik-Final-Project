import VideoChat from "../WebRTC/VideoChat"

interface VideoCallProps {

}

export const VideoCallView: React.FC<VideoCallProps> = () => {
  return (
    <div>
        <VideoChat roomId={''}/>
    </div>
  )
}