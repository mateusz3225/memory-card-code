import { useEffect, useState } from "react"
import '../styles/App.css'

const clickedPokemon = [];
function ShuffleAnyArray(array) {
   let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}



export default function App() {
const [currentScore,setCurrentScore] = useState(0);
const [highScore,setHighScore] = useState(0);
const [Pokemon,setPokemon] = useState(
    [
        {id:1, imageSrc:'', name: ''},
        {id:2, imageSrc:'', name: ''},
        {id:3, imageSrc:'', name: ''},
        {id:4, imageSrc:'', name: ''},
        {id:5, imageSrc:'', name: ''},
        {id:6, imageSrc:'', name: ''},
        {id:7, imageSrc:'', name: ''},
        {id:8, imageSrc:'', name: ''},
        {id:9, imageSrc:'', name: ''},
        {id:10, imageSrc:'', name: ''},
        {id:11, imageSrc:'', name: ''},
        {id:12, imageSrc:'', name: ''},
    ]
);


useEffect(() => { 
const GetPokemon = async () => {
    try {
        const promises = [];
        for(let i=0;i<12;i++) {
            let randomId = Math.floor(Math.random()*(1025-1)+1);
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`).then(data => data.json()));
    }
    const pokemonData = await Promise.all(promises);
    setPokemon(pokemonData.map((pokemon,index) =>({id: index+1, name:pokemon.species.name,imageSrc: pokemon.sprites.front_default })));
    } catch (error) {
        console.log(error);
    }
}
GetPokemon();
console.log(Pokemon);
}, []);

    return (
        <>
        <header>
        Current HighScore: {highScore<currentScore ? setHighScore(currentScore) : highScore} <br />
        Current Score: {currentScore} 
        </header>
        <main>
        {Pokemon.map((p, index) => (
        <Card
        key={p.id || index}
        image={p.imageSrc}
        name={p.name}
        currentScore={currentScore}
        setCurrentScore={setCurrentScore}
        setPokemon={setPokemon}
        array={Pokemon}
        />
        ))}
        </main>
        </>
    )
}

function Card({image, name,currentScore, setCurrentScore,setPokemon,array}) {
    function onClick() {
        if(!clickedPokemon.find((nameofPokemon) => nameofPokemon=== name)) {
            setCurrentScore(currentScore+1)
            clickedPokemon.push(name);
            setPokemon(ShuffleAnyArray(array));
        }
        else {
            setCurrentScore(0);
            setPokemon(ShuffleAnyArray(array));
            clickedPokemon.length = 0;
        }
    }
    return (
    <div className="card" onClick={onClick}>
        <img src={image}></img>
        <p>{name}</p>
    </div>
    )
}