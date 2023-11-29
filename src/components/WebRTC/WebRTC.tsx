/* eslint-disable @typescript-eslint/no-unused-vars */
import { get, onChildAdded, push, ref, set, update } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import { BsCameraVideoOff, BsMicMute } from 'react-icons/bs';
import { FaPhoneSlash } from 'react-icons/fa6';
import { IoPersonAdd } from 'react-icons/io5';
import { LuScreenShare } from 'react-icons/lu';
import { auth, db } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';

interface WebRTCProps {
  roomId: string;
  userId: string;
}

const WebRTC: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const localStreamRef = useRef<MediaStream | null>(null);
	const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
	const remoteStreamRef = useRef<MediaStream | null>(null);
	const [roomID, setRoomID] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const handleICECandidate = (event: RTCPeerConnectionIceEvent) => {
			const iceCandidate = event.candidate;
			if (iceCandidate) {
				console.log('Sending ICE candidate to remote peer:', iceCandidate);
				// Send the ICE candidate to the other peer
				sendIceCandidateToRemotePeer(
					roomID!,
					auth?.currentUser?.uid || '',
					iceCandidate
				);
			}
		};

		const handleRemoteICECandidate = async (
			roomID: string,
			userUid: string,
			iceCandidate: RTCIceCandidate | null
		) => {
			try {
				if (iceCandidate) {
					await peerConnectionRef.current?.addIceCandidate(iceCandidate);
				}
			} catch (error) {
				console.error('Error handling remote ICE candidate:', error);
			}
		};

		const handleRemoteAnswer = async (
			roomID: string,
			userUid: string,
			answer: RTCSessionDescriptionInit
		) => {
			try {
				const remoteDescription = new RTCSessionDescription(answer);
				await peerConnectionRef.current?.setRemoteDescription(
					remoteDescription
				);
			} catch (error) {
				console.error('Error handling remote answer:', error);
			}
		};

		onChildAdded(
			ref(db, `rooms/${roomID}/users/${auth?.currentUser?.uid}/answer`),
			(snapshot) => {
				const answer = snapshot.val();
				handleRemoteAnswer(roomID!, auth?.currentUser?.uid || '', answer);
			}
		);

		const handleTrack = (event: RTCTrackEvent) => {
			remoteStreamRef.current = event.streams[0];

			if (videoRef.current && remoteStreamRef.current) {
				videoRef.current.srcObject = remoteStreamRef.current;
			}
		};

		const sendIceCandidateToRemotePeer = async (
			roomID: string,
			userUid: string,
			iceCandidate: RTCIceCandidate | null
		) => {
			try {
				await set(
					ref(db, `rooms/${roomID}/users/${userUid}/iceCandidate`),
					iceCandidate
				);
			} catch (error) {
				console.error('Error sending ICE candidate to remote peer:', error);
			}
		};

		const sendAnswerToRemotePeer = async (
			roomID: string,
			userUid: string,
			answer: RTCSessionDescriptionInit
		) => {
			try {
				await set(ref(db, `rooms/${roomID}/users/${userUid}/answer`), answer);
			} catch (error) {
				console.error('Error sending answer to remote peer:', error);
			}
		};

		const createRoom = async () => {
			try {
				const roomRef = push(ref(db, 'rooms'));
				const roomKey: string = roomRef.key || '';

				const userUid = auth?.currentUser?.uid || '';
				const roomData = {
					users: {
						[userUid]: true,
					},
					id: roomKey,
				};

				await set(ref(db, `rooms/${roomKey}`), roomData);

				setRoomID(roomKey);

				return roomKey;
			} catch (error) {
				console.error('Error creating room:', error);
			}
		};

		const joinRoom = async (roomID: string) => {
			try {
				const userUid = auth?.currentUser?.uid || '';
				const roomRef = ref(db, `rooms/${roomID}`);
				const roomSnapshot = await get(roomRef);

				if (roomSnapshot.exists()) {
					const usersRef = ref(db, `rooms/${roomID}/users`);
					await update(usersRef, {
						[userUid]: true,
					});
				} else {
					console.error('Room does not exist');
				}
			} catch (error) {
				console.error('Error joining room:', error);
			}
		};

		const sendOffer = async (
			roomID: string,
			offer: RTCSessionDescriptionInit
		) => {
			try {
				const userUid = auth?.currentUser?.uid || '';
				await set(ref(db, `rooms/${roomID}/users/${userUid}/offer`), offer);
			} catch (error) {
				console.error('Error sending offer:', error);
			}
		};

		const receiveOffer = async (roomID: string, userUid: string) => {
			try {
				const offerSnapshot = await get(
					ref(db, `rooms/${roomID}/users/${userUid}/offer`)
				);
				const offer = offerSnapshot.val();

				if (offer) {
					const answer = await peerConnectionRef.current?.createAnswer();
					await peerConnectionRef.current?.setLocalDescription(answer);

					await set(ref(db, `rooms/${roomID}/users/${userUid}/answer`), answer);

					sendAnswerToRemotePeer(roomID, auth?.currentUser?.uid || '', answer!);
				}

				onChildAdded(
					ref(db, `rooms/${roomID}/users/${userUid}/iceCandidates`),
					(snapshot) => {
						const iceCandidate = snapshot.val();
						handleRemoteICECandidate(roomID, userUid, iceCandidate);
					}
				);
			} catch (error) {
				console.error('Error receiving offer:', error);
			}
		};

		const sendAnswer = async (
			roomID: string,
			answer: RTCSessionDescriptionInit
		) => {
			try {
				const userUid = auth?.currentUser?.uid || '';
				await set(ref(db, `rooms/${roomID}/users/${userUid}/answer`), answer);
			} catch (error) {
				console.error('Error sending answer:', error);
			}
		};

		const receiveAnswer = async (roomID: string, userUid: string) => {
			try {
				const answerSnapshot = await get(
					ref(db, `rooms/${roomID}/users/${userUid}/answer`)
				);
				const answer = answerSnapshot.val();

				if (answer) {
					handleRemoteAnswer(roomID, userUid, answer);
				}
			} catch (error) {
				console.error('Error receiving answer:', error);
			}
		};

		const initiateCall = async () => {
			try {
				localStreamRef.current = await navigator.mediaDevices.getUserMedia({
					video: true,
					audio: true,
				});

				if (videoRef.current && localStreamRef.current) {
					videoRef.current.srcObject = localStreamRef.current;
				}

				peerConnectionRef.current = new RTCPeerConnection();

				if (localStreamRef.current) {
					localStreamRef.current.getTracks().forEach((track) => {
						peerConnectionRef.current?.addTrack(
							track,
							localStreamRef.current as MediaStream
						);
					});
				}

				if (peerConnectionRef.current) {
					peerConnectionRef.current.onicecandidate = handleICECandidate;
					peerConnectionRef.current.ontrack = handleTrack;
				}

				const offer = await peerConnectionRef.current?.createOffer();
				await peerConnectionRef.current?.setLocalDescription(offer);

				const roomID = await createRoom();

				if (offer && roomID) {
					await sendOffer(roomID, offer);
				}

				await receiveAnswer(roomID!, auth?.currentUser?.uid || '');
			} catch (error) {
				console.error('Error initiating call:', error);
			}
		};

		initiateCall();

		return () => {
			if (peerConnectionRef.current) {
				peerConnectionRef.current.close();
			}
			if (localStreamRef.current) {
				localStreamRef.current.getTracks().forEach((track) => {
					track.stop();
				});
			}
			if (remoteStreamRef.current) {
				remoteStreamRef.current.getTracks().forEach((track) => {
					track.stop();
				});
			}
		};
	}, [navigate]);

	const leaveCall = () => {
		if (peerConnectionRef.current) {
			peerConnectionRef.current.close();
		}

		navigate('/calls');
	};

	return (
		<div className="w-[1824px] h-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
			<div className="">
				<video ref={videoRef} autoPlay playsInline muted />
				<div className="flex flex-row items-center justify-center mt-4 space-x-4">
					<button className="rounded-full bg-gray-300 hover:bg-gray-200 w-16 h-16 flex items-center justify-center">
						<BsMicMute size={28} />
					</button>
					<button className="rounded-full bg-gray-300 hover:bg-gray-200 w-16 h-16 flex items-center justify-center">
						<BsCameraVideoOff size={28} />
					</button>
					<button className="rounded-full bg-gray-300 hover:bg-gray-200 w-16 h-16 flex items-center justify-center">
						<LuScreenShare size={28} />
					</button>
					<button className="rounded-full bg-gray-300 hover:bg-gray-200 w-16 h-16 flex items-center justify-center">
						<IoPersonAdd size={28} />
					</button>
					<button
						onClick={() => leaveCall()}
						className="rounded-full bg-red-600 hover:bg-red-500 w-16 h-16 flex items-center justify-center"
					>
						<FaPhoneSlash size={28} className="fill-white" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default WebRTC;
