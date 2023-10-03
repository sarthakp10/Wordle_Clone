import { useEffect, useState } from 'react';
import Wordle from './components/Wordle';

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/solutions')
    .then(res => res.json())
    .then(json => {
      const randomSol = json[Math.floor(Math.random()*json.length)]
      setSolution(randomSol.word);
    })

  }, [setSolution])

  return (
    <div className="App">
        <h1>Wordle</h1>
        {solution && <Wordle solution = {solution}/>}
    </div>
  );
}

export default App;
