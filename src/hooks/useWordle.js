import { useState } from 'react';

const useWordle = (solution) => {
	const [ turn, setTurn ] = useState(0);
	const [ currentGuess, setCurrentGuess ] = useState('');
	const [ guesses, setGuesses ] = useState([]);
	const [ history, setHistory ] = useState([]);
	const [ isCorrect, setIsCorrect ] = useState(false);

	const formatGuess = () => {
		console.log('formatting');
		let solutionArray = [ ...solution ];
		let formattedGuess = [ ...currentGuess ].map((letter) => {
			return { key: letter, color: 'grey' };
		});

		formattedGuess.forEach((letter, i) => {
			if (solutionArray[i] === letter.key) {
				formattedGuess[i].color = 'green';
				solutionArray[i] = null;
			}
		});

		formattedGuess.forEach((letter, i) => {
			if (solutionArray.includes(letter.key) && letter.color !== 'green') {
				formattedGuess[i].color = 'yellow';
			}
		});
		console.log(formattedGuess);
		setCurrentGuess('');
		return formattedGuess;
	};

	const addNewGuess = () => {};

	const handleKeyUp = ({ key }) => {
		console.log(key);
		if (key === 'Enter') {
			if (turn > 5) {
				return;
			}
			if (history.includes(currentGuess)) {
				return;
			}

			if (currentGuess.length !== 5) {
				return;
			}

			console.log(formatGuess());
		}
		if (key === 'Backspace') {
			setCurrentGuess((prev) => {
				return prev.slice(0, -1);
			});
			return;
		}
		if (/^[A-Za-z]$/.test(key)) {
			if (currentGuess.length < 5) {
				setCurrentGuess((prev) => {
					return prev + key;
				});
			}
		}
	};

	return { turn, currentGuess, guesses, history, isCorrect, handleKeyUp };
};

export default useWordle;
