// src/components/VideoChat.tsx
import React, { useEffect, useRef, useState } from 'react';
import LocalVideo from '../../components/WebRTC/LocalVideo';
import RemoteVideo from '../../components/WebRTC/RemoteVideo';
import { ref, set, onValue, off } from 'firebase/database';
import { db, auth } from '../../config/firebase-config'; // Import your Firebase configuration
import { uuidv4 } from '@firebase/util';

interface VideoChatProps {
  roomId: string;
}

const VideoChat: React.FC<VideoChatProps> = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const roomId = uuidv4();

  useEffect(() => {
    const setupLocalVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        
        const currentUserUid = auth?.currentUser?.uid;

        if (currentUserUid) {
          const userRef = ref(db, `users/${currentUserUid}`);
          set(userRef, {
            videoStreamId: stream.id,
            
          });

          const roomRef = ref(db, `rooms/${roomId}/participants/${currentUserUid}`);
          set(roomRef, {
            username: auth.currentUser?.displayName,
            
          });
        }
      } catch (error) {
        console.error('Error accessing camera and/or microphone:', error);
      }
    };

    setupLocalVideo();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [localStream, roomId]);

  useEffect(() => {
    const remoteParticipantRef = ref(db, `rooms/${roomId}/participants/remote`);
        onValue(remoteParticipantRef, (snapshot) => {
            const remoteStreamId = snapshot.val()?.streamId;

            if (remoteStreamId && remoteVideoRef.current) {
                const remoteStream = new MediaStream();
                const remoteTrack = localStream?.getTracks().find((track) => track.id === remoteStreamId);

                if (remoteTrack) {
                    remoteStream.addTrack(remoteTrack);
                    remoteVideoRef.current.srcObject = remoteStream;
                }
            }
        });
        
        return () => {
            off(remoteParticipantRef);
        };
  }, [roomId, localStream]);

  return (
    <div>
      <LocalVideo localVideoRef={localVideoRef} />
      <RemoteVideo remoteVideoRef={remoteVideoRef} />
    </div>
  );
};

export default VideoChat;