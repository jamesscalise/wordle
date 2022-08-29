import { useState } from "react"

const useWorlde = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)



    const formatGuess = () => {

    }

    const addNewGuess = () => {

    }

    const handleKeyUp = () => {

    }

    return {turn, currentGuess, guesses, history, isCorrect}
}

export default useWorlde