import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  function Footer() {
    return (
      <footer>
        <p>
          <a href="https://github.com/SirGram" target="_blank">
            &copy;SirGram
          </a>{" "}
          2024
        </p>
      </footer>
    );
  }
  function RandomCard({ data, onClick }) {
    const handleClick = () => {
      onClick(data.name);
    };

    return (
      <div onClick={handleClick} className={`card`}>
        <div className={`inner ${data.level.toLowerCase()}`}>
          <div className="card-front">
            <div className="card-name show">{data.name.toUpperCase()}</div>
            <img src={data.img} alt={data.name} />
            <div className="card-name">{data.name}</div>
            <div className="card-number">{data.number}</div>
          </div>
          <div className="card-back">
            <div className="card-name">DIGIMON</div>
            <img src="../public/placeholder.png" alt="back" />
            <div className="card-number">DIGIMON</div>
          </div>
        </div>
      </div>
    );
  }

  function Dex({ data }) {
    return (
      <div className="dex">
        <h1 className="title">DIGIDEX</h1>
        {data.map((el, index) => (
          <div key={index} className="card">
            <div
              className={`inner ${el.level.toLowerCase()} ${
                clickedDigimon.includes(el.name) ? "seen" : ""
              }`}
            >
              <div className="card-name">{el.name.toUpperCase()}</div>
              <img src={el.img} alt={el.name} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const numberCards = 3;
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showDex, setShowDex] = useState(false);
  const [maxScore, setMaxScore] = useState(0);
  const [digimonData, setDigimonData] = useState(null);
  const [currentDigimon, setCurrentDigimon] = useState([]);
  const [clickedDigimon, setClickedDigimon] = useState([]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  useEffect(() => {
    const getDigimonData = async () => {
      const api = "https://digimon-api.vercel.app/api/digimon";
      try {
        const response = await fetch(api);
        const data = await response.json();
        data.forEach((digimon) => {
          const index = data.findIndex((item) => item === digimon);
          digimon.number = index;
        });
        setDigimonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getDigimonData();
  }, []);

  useEffect(() => {
    if (digimonData) {
      const cards = document.querySelectorAll(".inner");
      setIsAnimationComplete(false);
      setTimeout(() => {
        cards.forEach((card) => {
          card.classList.add("flip");
        });
      }, 0);
      setTimeout(() => {
        cards.forEach((card) => {
          card.classList.remove("flip");
        });
        shuffleCards();
        setIsAnimationComplete(true);
      }, 500);
    }
  }, [digimonData, clickedDigimon]);

  function changeCurrentDigimonData() {
    const seenDigimon = (newNum) => {
      return clickedDigimon.some((el) => el.number === newNum);
    };
    
    const randomNumber = () => {
      return Math.floor(Math.random() * digimonData.length);

    };

    let counter = 0;
    let counter2 
    let randomIndex
    const arr = [];    
  let hasUnseenDigimon = false;
    while (counter < numberCards) {
      counter2 = 1;      
      if (!hasUnseenDigimon) {
        // at least one not-seen digimon in deck
        do{
        randomIndex = randomNumber();  
        counter2++
      }while (seenDigimon(randomIndex))
        hasUnseenDigimon = true;
      }else{
        randomIndex = randomNumber(); 

      } 
      arr.push(digimonData[randomIndex]);
      counter++;
    }
    arr.sort(() => Math.random() - 0.5);

    return arr;
  }

  function changeCurrentDigimon(newData) {
   
    console.log(newData);

    setCurrentDigimon(newData);
  }

  function shuffleCards() {
    const newData = changeCurrentDigimonData();
    changeCurrentDigimon(newData);
  }

  function handleClick(name) {
    if (!isAnimationComplete) {
      return;
    }
    if (!clickedDigimon.includes(name)) {
      const newScore = score + 1;
      addScore(newScore);
      if( newScore === digimonData.length) {setGameOver=true}else{
        const newClickedDigimon = [...clickedDigimon, name];
        setClickedDigimon(newClickedDigimon);
      }
    } else {
      resetScore();
      setClickedDigimon([])
    }
    
    setIsAnimationComplete(false);
  }

  function addScore(newScore) {
    setScore(newScore);
    if (newScore > maxScore) setMaxScore(newScore);
  }

  function resetScore() {
    setScore(0);
  }

  return (
    <>
      <button className="game-image" onClick={() => setShowDex(!showDex)}>
        <img src="../public/game.png" />
      </button>
      {!showDex ? (
      <div className="container">
        {!gameOver ? (
          <>
            <h2>
              Which <em>digimon</em> have you not seen?
            </h2>
            <h3>Max Score: {maxScore}</h3>
            <h3>Current Score: {score}</h3>
            <div className={`card-container`}>
              {currentDigimon.map((digimon, index) => (
                <RandomCard key={index} data={digimon} onClick={handleClick} />
              ))}
            </div>
          </>
        ) : (
          <>
            <h2>
              You have an incredible memory... <em>Amazing</em>
            </h2>
            <h3>Max Score: {maxScore}</h3>
            <h3>Current Score: {score}</h3>
            <div className={`card-container`} style={{ visibility: 'hidden' }}>            
            </div>
          </>
        )}
      </div>
      ) : (
        <Dex data={digimonData} />
      )}
      <Footer />
    </>
  );
}

export default App;
