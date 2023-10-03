import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});

    // format a guess into an array of letter objects
    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((l) => {
            return {key: l, color: 'grey'}
        })

        // find any green letters
        formattedGuess.forEach((l,i) => {
            if(solutionArray[i] === l.key) {
                formattedGuess[i].color = 'green';
                solutionArray[i] = null;
            }
        })

        // find any yellow letters
        formattedGuess.forEach((l,i) => {
            if(solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        })
        return formattedGuess;
    }

    const addnewGuess = (formattedGuess) => {
        if(currentGuess === solution) {
            setIsCorrect(true);
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        })
        setTurn((prevTurn) => {
            return prevTurn + 1;
        })

        setUsedKeys((prevUsedKeys) => {
            
            formattedGuess.forEach((l) => {
                const currentColor = prevUsedKeys[l.key];

                if(l.color === 'green') {
                    prevUsedKeys[l.key] = 'green';
                    return;
                }

                if(l.color === 'yellow' && currentColor !== 'green') {
                    prevUsedKeys[l.key] = 'yellow';
                    return;
                }

                if(l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                    prevUsedKeys[l.key] = 'grey';
                    return;
                }

            })
            return prevUsedKeys;
        })

        setCurrentGuess('');
    } 

    const handleKeyup = ({ key }) => {
        // console.log(key)
        if(key === 'Enter') {
            // only add guess if the turn is less than 5
            if(turn > 5) {
                console.log("you have used all your guesses");
                return;
            }
            // do not allow duplicate words
            if(history.includes(currentGuess)) {
                console.log("you have already tried this");
                return;
            }
            // check if the word is 5 chars long
            if(currentGuess.length !== 5) {
                console.log("word should be 5 chars long");
                return;
            }
            const formatted = formatGuess();
            // console.log(formatted);
            addnewGuess(formatted);
        }
        if(key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0,-1);
            })
            return;
        }

        if(key === 'Shift' || key === 'Control') {
            return;
        }

        if(/^[A-Za-z]$/) {
            if(currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key;
                })
            }
        }
    }
    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup};
}
 
export default useWordle;