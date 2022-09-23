import { useState } from 'react';

const useWordle = (solution) => {
	const [ turn, setTurn ] = useState(0);
	const [ currentGuess, setCurrentGuess ] = useState('');
	const [ guesses, setGuesses ] = useState([ ...Array(6) ]);
	const [ history, setHistory ] = useState([]);
	const [ isCorrect, setIsCorrect ] = useState(false);
	const [ usedKeys, setUsedKeys ] = useState({});

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
		addNewGuess(formattedGuess);
		return formattedGuess;
	};

	const addNewGuess = (formattedGuess) => {
		if (currentGuess === solution) {
			setIsCorrect(true);
		}

		setGuesses((prev) => {
			let newGuesses = [ ...prev ];
			newGuesses[turn] = formattedGuess;
			return newGuesses;
		});
		setHistory((prev) => {
			return [ ...prev, currentGuess ];
		});
		setUsedKeys((prevUsedKeys) => {
			formattedGuess.forEach((l) => {
				const currentColor = prevUsedKeys[l.key];

				if (l.color === 'green') {
					prevUsedKeys[l.key] = 'green';
					return;
				}
				if (l.color === 'yellow' && currentColor !== 'green') {
					prevUsedKeys[l.key] = 'yellow';
					return;
				}
				if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
					prevUsedKeys[l.key] = 'grey';
					return;
				}
			});

			return prevUsedKeys;
		});
		setCurrentGuess('');
		setTurn(turn + 1);
	};

	const handleKeyUp = ({ key }) => {
		console.log(key);
		if (key === 'Enter') {
			if (turn > 5) {
				return;
			}
			// if (history.includes(currentGuess)) {
			// 	return;
			// }

			if (currentGuess.length !== 5) {
				return;
			}

			formatGuess();
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

	return { turn, currentGuess, guesses, history, isCorrect, handleKeyUp, usedKeys };
};

export default useWordle;
