import { useDyteClient, DyteProvider } from '@dytesdk/react-web-core';
import { DyteMeeting } from '@dytesdk/react-ui-kit';
import { useEffect } from 'react';
import { AUTH_TOKEN } from '../../constants/constants';




const DyteVideo = () => {
	const [meeting, initMeeting] = useDyteClient();

	useEffect(() => {
		
		initMeeting({
			authToken: AUTH_TOKEN,
			defaults: {
				audio: false,
				video: false,
			},
		});
	}, []);


	return (
	<DyteProvider value={meeting}>
		<div className="w-full h-full">
		<DyteMeeting meeting={meeting!} mode='fill'/>
		</div>
	</DyteProvider>
	)
};

export default DyteVideo;
