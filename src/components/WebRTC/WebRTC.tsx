import React, { useEffect, useRef } from 'react';
import { db } from '../../config/firebase-config';
import { onChildAdded, push, ref, update } from 'firebase/database';
import { BsCameraVideoOff, BsMicMute } from 'react-icons/bs';
import { FaPhoneSlash } from 'react-icons/fa6';
import { IoPersonAdd } from 'react-icons/io5';
import { LuScreenShare } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

interface WebRTCProps {
	roomId: string;
}

const WebRTC: React.FC<WebRTCProps> = ({ roomId }) => {
	const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
	const localVideoRef = useRef<HTMLVideoElement | null>(null);
	const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const navigate = useNavigate()

	useEffect(() => {
        const initPeerConnection = async () => {
            const configuration = {
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
            };
            const peerConnection = new RTCPeerConnection(configuration);

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                if (peerConnection.signalingState !== 'closed') {
                    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
                }
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }

            peerConnection.onicecandidate = async (event) => {
                if (event.candidate) {
                    const offerRef = ref(db, `rooms/${roomId}/offers`);
                    const newOffer = push(offerRef, JSON.stringify(event.candidate));
                    const newOfferKey: string | null = newOffer.key;

                    if (newOfferKey) {
                        const updates = {
                            [`rooms/${roomId}/offers/${newOfferKey}`]: newOfferKey,
                        };

                        await update(ref(db), updates);
                    }
                }
            };

            if (remoteVideoRef.current) {
                const remoteStream = new MediaStream();

                // Listen for remote tracks and add them to the remote stream
                peerConnection.ontrack = (event) => {
                    if (remoteVideoRef.current) {
                        remoteStream.addTrack(event.track);
                        remoteVideoRef.current.srcObject = remoteStream;
                    }
                };
            }

            const offersRef = ref(db, `rooms/${roomId}/offers`);
            onChildAdded(offersRef, (snapshot) => {
                const signal = JSON.parse(snapshot.val());
                peerConnection
                    .addIceCandidate(new RTCIceCandidate(signal))
                    .catch((error) => {
                        console.error('Error adding ice candidate:', error);
                    });
            });

            peerConnectionRef.current = peerConnection;
        };

        initPeerConnection();

        return () => {
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
        };
    }, [roomId, navigate]);

    const leaveCall = () => {
        peerConnectionRef.current?.close();
        navigate('/calls');
    };

	return (
		<div className='bg-gray-100 dark:bg-gray-800 w-[1824px] h-full'>
			<div className="flex flex-row justify-center items-center">
				<div className='flex items-center justify-center mt-32'>
					<video ref={localVideoRef} autoPlay muted />
				</div>
				<div>
					<video ref={remoteVideoRef} autoPlay />
				</div>
			</div>
			<div className="flex flex-row justify-center items-center  space-x-5 mt-4">
				<div className="flex rounded-full justify-center items-center bg-gray-300/60 h-16 w-16 hover:bg-gray-300 cursor-pointer">
					<BsMicMute size={25} />
				</div>
				<div className="flex rounded-full justify-center items-center bg-gray-300/60 h-16 w-16 hover:bg-gray-300 cursor-pointer">
					<BsCameraVideoOff size={28} />
				</div>
				<div className="flex rounded-full justify-center items-center bg-gray-300/60 h-16 w-16 hover:bg-gray-300 cursor-pointer">
					<LuScreenShare size={28} />
				</div>
				<div className="flex rounded-full justify-center items-center bg-gray-300/60 h-16 w-16 hover:bg-gray-300 cursor-pointer">
					<IoPersonAdd size={28} />
				</div>
				<div className="flex rounded-full justify-center items-center bg-red-600 h-16 w-16 hover:bg-red-500 cursor-pointer">
					<FaPhoneSlash size={28} className='fill-gray-100' onClick={() => leaveCall()}/>
				</div>
			</div>
		</div>
	);
};

export default WebRTC;
