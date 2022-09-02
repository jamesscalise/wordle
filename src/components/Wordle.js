import React, { useEffect } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';

export default function Wordle({ solution }) {
	const { currentGuess, handleKeyUp, guesses, isCorrect, turn } = useWordle(solution);

	useEffect(
		() => {
			window.addEventListener('keyup', handleKeyUp);

			return () => window.removeEventListener('keyup', handleKeyUp);
		},
		[ handleKeyUp ]
	);

	useEffect(
		() => {
			console.log('is this logging?');
			console.log(guesses, isCorrect, turn);
		},
		[ guesses, isCorrect, turn ]
	);

	return (
		<div>
			<div>
				Wordle {solution} - {currentGuess}
			</div>
			<div>{isCorrect && <div>correct</div>}</div>
			<Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
		</div>
	);
}
