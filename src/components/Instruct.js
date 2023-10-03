import React, { useState } from 'react'

export default function Instruct() {
    const instructions = [
        "Each guess must be a valid 5-letter word.",
        "The color of the tiles will change to show how close your guess was to the word.",
        "If the tile is green, the letter is in the word and in the correct spot.",
        "If the tile is yellow, the letter is in the word but in the wrong spot.",
        "If the tile is grey, the letter is not in the word and in any spot."
    ]
    const [hide, setHide] = useState(false);

    const handleHide = () => {
       setHide(true);
    }

  return (
    <div className= {hide? 'game': 'instruct'}>
        <div>
            <h1 className='main-title'>Welcome to Wordle!</h1>
            <h1>INSTRUCTIONS</h1>
            {instructions.map((inst) => (
            <ul>
                <li>{inst}</li>
            </ul>
            ))}
            <button
              onClick={handleHide}
              className = 'playbtn'
            >Play</button>
        </div>
    </div>
  )
}
