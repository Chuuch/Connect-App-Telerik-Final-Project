/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import LocalVideo from '../../components/WebRTC/LocalVideo';
import RemoteVideo from '../../components/WebRTC/RemoteVideo';
import { ref, onValue, off, update } from 'firebase/database';
import { db, auth } from '../../config/firebase-config';
import { LuScreenShare } from "react-icons/lu";
import { LuScreenShareOff } from "react-icons/lu";
import { FaPhoneSlash, FaPlay } from "react-icons/fa6";
import { IoPause } from 'react-icons/io5';
import { BsMic, BsMicMute } from 'react-icons/bs';
import {
	createPeerConnection,
	handleAnswer,
	addIceCandidate,
  listenForIceCandidate,
  sendAnswer,
  createAnswer,
} from '../../services/webRTC.services';

interface VideoChatProps {
	roomId: string;
	targetUserId: string;
}

const VideoChat: React.FC<VideoChatProps> = ({ roomId }) => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	const [localStream, setLocalStream] = useState<MediaStream | null>(null);
	const [isAudioMuted, setIsAudioMuted] = useState(false);
	const [isVideoStopped, setIsVideoStopped] = useState(false);
	const [isScreenSharing, setIsScreenSharing] = useState(false);

	const peerConnection = createPeerConnection();

  const handleOfferReceived = async (peerConnection: RTCPeerConnection, offer: RTCSessionDescriptionInit, roomId: string) => {
    try {
      await peerConnection.setRemoteDescription(offer);
      
      const answer = await createAnswer(peerConnection);
  
      const targetUserId = offer.sdp && typeof offer.sdp === 'string'
        ? extractTargetUserIdFromOffer(offer.sdp)
        : '';
  
      await sendAnswer(roomId, answer, targetUserId);
  
      console.log('Offer handled successfully.');
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };
  
  const extractTargetUserIdFromOffer = (offerSdp: string): string => {
    const sdpTokens = offerSdp.split(' ');
    return sdpTokens[3] || '';
  };

  const handleReceivedAnswer = async (answer: RTCSessionDescriptionInit) => {
    await handleAnswer(peerConnection, answer);
  };

	const handleReceivedIceCandidate = async (iceCandidate: RTCIceCandidate) => {
		await addIceCandidate(peerConnection, iceCandidate);
	};

  useEffect(() => {
    const cleanupListeners = () => {
      off(ref(db, `rooms/${roomId}/offers`));
      off(ref(db, `rooms/${roomId}/answers`));
      off(ref(db, `rooms/${roomId}/iceCandidates`));
    };
  
    const iceCandidateListenerCleanup = listenForIceCandidate(roomId, handleReceivedIceCandidate);
  
    return () => {
      cleanupListeners();
     
      iceCandidateListenerCleanup();
    };
  }, [roomId, handleReceivedAnswer, handleReceivedIceCandidate, handleOfferReceived]);

  

	const toggleAudio = () => {
		localStream?.getAudioTracks().forEach((track) => {
			track.enabled = !isAudioMuted;
		});
		setIsAudioMuted(!isAudioMuted);
	};

	const toggleVideo = () => {
		localStream?.getVideoTracks().forEach((track) => {
			track.enabled = !isVideoStopped;
		});
		setIsVideoStopped(!isVideoStopped);
	};

	const startScreenSharing = async () => {
		try {
			const screenStream = await navigator.mediaDevices.getDisplayMedia({
				video: true,
			});

			screenStream.getTracks().forEach((track) => {
				localStream?.addTrack(track);
			});

			if (localVideoRef.current) {
				localVideoRef.current.srcObject = localStream;
			}

			setIsScreenSharing(!isScreenSharing);
		} catch (error) {
			console.error('Error starting screen sharing:', error);
		}
	};

	const leaveCall = () => {};

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
	}, []);

	useEffect(() => {
		console.log('localStream:', localStream);

		const currentUserUid = auth?.currentUser?.uid;

		if (currentUserUid) {
			const userRef = ref(db, `users/${currentUserUid}`);
			console.log('Setting videoStreamId:', localStream?.id);
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

			console.log('Remote stream ID:', remoteStreamId);

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
		};
	}, [roomId, localStream]);

	return (
		<div className="bg-gray-100 dark:bg-gray-800 h-full w-[2000px]">
			<div className="flex flex-row items-center justify-center space-x-10 w-full">
				<LocalVideo localVideoRef={localVideoRef} />
				<RemoteVideo remoteVideoRef={remoteVideoRef} />
			</div>

			<div className="flex flex-row justify-center mt-4 space-x-4">
        <div className="rounded-full bg-gray-400 hover:bg-gray-300 flex items-center justify-center h-16 w-16 cursor-pointer">
				<button onClick={toggleAudio}>
					{isAudioMuted ? <BsMic size={28}/> : <BsMicMute size={28}/>}
				</button>
        </div>
        <div className='rounded-full bg-gray-400 hover:bg-gray-300 flex items-center justify-center h-16 w-16 cursor-pointer'>
				<button onClick={toggleVideo}>
					{isVideoStopped ? <IoPause size={28}/> : <FaPlay size={28}/>}
          
				</button>
        </div>
        <div className='rounded-full bg-gray-400 hover:bg-gray-300 flex items-center justify-center h-16 w-16 cursor-pointer'>
				<button onClick={startScreenSharing} >
					{isScreenSharing ? <LuScreenShareOff size={28}/> : <LuScreenShare size={28}/>}
				</button>
        </div>
        <div className="rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center h-16 w-16 cursor-pointer">
				<button onClick={leaveCall}>
          <FaPhoneSlash size={28} className='text-white'/>
        </button>
        </div>
			</div>
		</div>
	);
};

export default VideoChat;
