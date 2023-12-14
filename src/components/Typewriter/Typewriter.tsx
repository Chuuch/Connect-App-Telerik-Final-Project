import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter';

interface TypewriterProps {

}

export const Typewriter: React.FC<TypewriterProps> = () => {
	const [text] = useTypewriter({
		words: [
			'Welcome!',
			'Connecting buddies one by one',
			'To make communication great again!',
		],
		loop: true,
		delaySpeed: 2000,
	});
	return (
		<></>
	)
}