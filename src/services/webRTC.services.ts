import { ref, onValue, set, remove, off, onChildAdded } from '@firebase/database';
import { db } from '../config/firebase-config';

// type RTCOfferOptions = {
//     offerToReceiveAudio?: boolean;
//     offerToReceiveVideo?: boolean;
//   };

//   type RTCAnswerOptions = {
//     offerToReceiveAudio?: boolean;
//     offerToReceiveVideo?: boolean;
//   };


const createPeerConnection = (): RTCPeerConnection => {
    const configuration: RTCConfiguration = {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    };
  
    return new RTCPeerConnection(configuration);
  };

  const createAnswer = async (peerConnection: RTCPeerConnection): Promise<RTCSessionDescriptionInit> => {
    try {
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      return answer;
    } catch (error) {
      throw new Error(`Error creating answer: ${error}`);
    }
  };

const createOffer = async (
	peerConnection: RTCPeerConnection
): Promise<RTCSessionDescriptionInit> => {
	const offer =
		(await peerConnection.createOffer()) as RTCSessionDescriptionInit;
	await peerConnection.setLocalDescription(offer);

	return offer;
};

const sendOffer = async (
	roomId: string,
	offer: RTCSessionDescriptionInit,
	targetUserId: string
): Promise<void> => {
	const offerRef = ref(db, `rooms/${roomId}/offers/${targetUserId}`);
	await set(offerRef, offer);
};

const sendAnswer = async (roomId: string, answer: RTCSessionDescriptionInit, targetUserId: string): Promise<void> => {
    const answerRef = ref(db, `rooms/${roomId}/answers/${targetUserId}`);
    await set(answerRef, answer);
  };

const sendIceCandidate = async (roomId: string, iceCandidate: RTCIceCandidate, targetUserId: string): Promise<void> => {
    const iceCandidateRef = ref(db, `rooms/${roomId}/iceCandidates/${targetUserId}`);
    await set(iceCandidateRef, iceCandidate);
  };

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

const handleAnswer = async (
	peerConnection: RTCPeerConnection,
	answer: RTCSessionDescriptionInit
): Promise<void> => {
	await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
};

const addIceCandidate = async (
	peerConnection: RTCPeerConnection,
	iceCandidate: RTCIceCandidate
): Promise<void> => {
	await peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
};

const listenForOffer = (
	roomId: string,
	onOfferReceived: (offer: RTCSessionDescriptionInit) => void
): void => {
	const offersRef = ref(db, `rooms/${roomId}/offers`);
	onValue(offersRef, (snapshot) => {
		const offers = snapshot.val();
		if (offers) {
			const targetUserId = Object.keys(offers)[0];
			const offer = offers[targetUserId];
			onOfferReceived(offer);
			remove(ref(db, `rooms/${roomId}/offers/${targetUserId}`));
		}
	});   
};

const listenForAnswer = (
    roomId: string,
    onAnswerReceived: (answer: RTCSessionDescriptionInit) => void
  ): (() => void) => {
    const answersRef = ref(db, `rooms/${roomId}/answers`);
    const callback = onValue(answersRef, (snapshot) => {
      const answers = snapshot.val();
      if (answers) {
        const targetUserId = Object.keys(answers)[0];
        const answer = answers[targetUserId];
        onAnswerReceived(answer);
        remove(ref(db, `rooms/${roomId}/answers/${targetUserId}`));
      }
    });
  
    return () => off(answersRef, 'value', callback);
  };

  const listenForIceCandidate = (
    roomId: string,
    onIceCandidateReceived: (iceCandidate: RTCIceCandidate) => void
  ): (() => void) => {
    const iceCandidatesRef = ref(db, `rooms/${roomId}/iceCandidates`);
    const callback = onChildAdded(iceCandidatesRef, (snapshot) => {
      const iceCandidate = snapshot.val();
      if (iceCandidate) {
        onIceCandidateReceived(iceCandidate);    
        remove(ref(db, `rooms/${roomId}/iceCandidates`));
      }
     
    });
  
    
    return () => off(iceCandidatesRef, 'child_added', callback);
  };


export {
	createPeerConnection,
	createOffer,
    createAnswer,
    handleOfferReceived,
	handleAnswer,
	addIceCandidate,
	sendOffer,
	sendAnswer,
	sendIceCandidate,
	listenForOffer,
    listenForAnswer,
    listenForIceCandidate,
};
