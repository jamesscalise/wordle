import React, { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

export default function Wordle({ solution }) {
	const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys } = useWordle(solution);
	const [showModal, setShowModal] = useState(false)

	useEffect(
		() => {
			window.addEventListener('keyup', handleKeyUp);

			if (isCorrect){
				window.removeEventListener('keyup', handleKeyUp);
				console.log('You win!');
				setTimeout(() => setShowModal(true), 2000);
			}
			if (turn > 5){
				window.removeEventListener('keyup', handleKeyUp);
				console.log('You lose!');
				setTimeout(() => setShowModal(true), 2000);
			}

			return () => window.removeEventListener('keyup', handleKeyUp);
		},
		[ handleKeyUp, isCorrect, turn ]
	);

	return (
		<div>
			Wordle {solution} - {currentGuess}
			{isCorrect && <div>correct</div>}
			<Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
			<Keypad usedKeys={usedKeys} />
			{showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
		</div>
	);
}
