import React from 'react';

export default function Row({ guess, turn, currentGuess, key }) {
	if (guess) {
		return (
			<div className="row past">
				{guess.map((letter, i) => (
					<div key={i} className={letter.color}>
						{letter.key}
					</div>
				))}
			</div>
		);
	}

	if (currentGuess) {
		let guessArray = currentGuess.split('');
		return (
			<div className="row current">
				{guessArray.map((letter, i) => <div key={i}>{letter}</div>)}
				{[ ...Array(5 - guessArray.length) ].map((_, i) => <div key={i} />)}
			</div>
		);
	}

	return (
		<div className="row">
			<div />
			<div />
			<div />
			<div />
			<div />
		</div>
	);
}
