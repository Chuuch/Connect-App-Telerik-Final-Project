// src/components/VideoChat.tsx
import React, { useEffect, useRef, useState } from 'react';
import LocalVideo from '../../components/WebRTC/LocalVideo';
import RemoteVideo from '../../components/WebRTC/RemoteVideo';
import { ref, onValue, off, update } from 'firebase/database';
import { db, auth } from '../../config/firebase-config'; // Import your Firebase configuration

interface VideoChatProps {
  roomId: string;
}

const VideoChat: React.FC<VideoChatProps> = ({ roomId }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const setupLocalVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    console.log('localStream:', localStream); // Log localStream for debugging

    const currentUserUid = auth?.currentUser?.uid;

    if (currentUserUid) {
      const userRef = ref(db, `users/${currentUserUid}`);
      console.log('Setting videoStreamId:', localStream?.id); // Log videoStreamId for debugging
      update(userRef, {
        videoStreamId: localStream?.id || '',
      });

      const roomRef = ref(db, `rooms/${roomId}/participants/${currentUserUid}`);
      update(roomRef, {
        username: auth.currentUser?.uid,
      });
    }
  }, [localStream, roomId]);

  useEffect(() => {
    const remoteParticipantRef = ref(db, `rooms/${roomId}/participants/remote`);
    onValue(remoteParticipantRef, (snapshot) => {
      const remoteStreamId = snapshot.val()?.streamId;

      console.log('Remote stream ID:', remoteStreamId); // Log remoteStreamId for debugging

      if (remoteStreamId && remoteVideoRef.current) {
        const remoteStream = new MediaStream();
        const remoteTrack = localStream
          ?.getTracks()
          .find((track) => track.id === remoteStreamId);

        if (remoteTrack) {
          remoteStream.addTrack(remoteTrack);
          remoteVideoRef.current.srcObject = remoteStream;
        }
      }
    });

    return () => {
      off(remoteParticipantRef);
      // Add additional cleanup for other database references if needed
    };
  }, [roomId, localStream]);

  return (
    <div className='bg-gray-100 dark:bg-gray-800 h-full w-[2000px]'>
      <div className="flex flex-row items-center justify-center space-x-10 w-full">
      <LocalVideo localVideoRef={localVideoRef} />
      <RemoteVideo remoteVideoRef={remoteVideoRef} />
      </div>
    </div>
  );
};

export default VideoChat;
