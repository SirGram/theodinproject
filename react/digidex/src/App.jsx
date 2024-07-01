import React, { useEffect, useState, useCallback } from "react";
import "./App.css";

const Footer = () => (
  <footer>
    <p>
      <a href="https://github.com/SirGram" target="_blank" rel="noopener noreferrer">
        &copy;SirGram
      </a>{" "}
      {new Date().getFullYear()}
    </p>
  </footer>
);

const RandomCard = React.memo(({ data, onClick, isAnimationComplete }) => {
  const handleClick = useCallback(() => {
    if (isAnimationComplete) {
      onClick(data.name);
    }
  }, [data.name, onClick, isAnimationComplete]);

  return (
    <div onClick={handleClick} className="card">
      <div className={`inner ${data.level.toLowerCase()}`}>
        <div className="card-front">
          <div className="card-name show">{data.name.toUpperCase()}</div>
          <img src={data.img} alt={data.name} />
          <div className="card-name">{data.name}</div>
          <div className="card-number">{data.number}</div>
        </div>
        <div className="card-back">
          <div className="card-name">DIGIMON</div>
          <img src="/placeholder.png" alt="back" />
          <div className="card-number">DIGIMON</div>
        </div>
      </div>
    </div>
  );
});

const Dex = React.memo(({ data, clickedDigimon }) => (
  <div className="dex">
    <h1 className="title">DIGIDEX</h1>
    {data.map((el) => (
      <div key={el.number} className="card">
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
));

const App = () => {
  const NUMBER_OF_CARDS = 3;
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showDex, setShowDex] = useState(false);
  const [maxScore, setMaxScore] = useState(0);
  const [digimonData, setDigimonData] = useState([]);
  const [currentDigimon, setCurrentDigimon] = useState([]);
  const [clickedDigimon, setClickedDigimon] = useState([]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const fetchDigimonData = useCallback(async () => {
    const api = "https://digimon-api.vercel.app/api/digimon";
    try {
      const response = await fetch(api);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      const numberedData = data.map((digimon, index) => ({ ...digimon, number: index }));
      setDigimonData(numberedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Here you might want to set some error state to show to the user
    }
  }, []);

  useEffect(() => {
    fetchDigimonData();
  }, [fetchDigimonData]);

  useEffect(() => {
    if (digimonData.length > 0) {
      const cards = document.querySelectorAll(".inner");
      setIsAnimationComplete(false);
      setTimeout(() => {
        cards.forEach((card) => card.classList.add("flip"));
      }, 0);
      setTimeout(() => {
        cards.forEach((card) => card.classList.remove("flip"));
        shuffleCards();
        setIsAnimationComplete(true);
      }, 500);
    }
  }, [digimonData, clickedDigimon]);

  const changeCurrentDigimonData = useCallback(() => {
    const seenDigimon = (num) => clickedDigimon.some((el) => el === digimonData[num].name);
    const randomNumber = () => Math.floor(Math.random() * digimonData.length);
    
    const arr = [];
    let hasUnseenDigimon = false;
    
    while (arr.length < NUMBER_OF_CARDS) {
      let randomIndex;
      if (!hasUnseenDigimon) {
        do {
          randomIndex = randomNumber();
        } while (seenDigimon(randomIndex));
        hasUnseenDigimon = true;
      } else {
        randomIndex = randomNumber();
      }
      arr.push(digimonData[randomIndex]);
    }
    
    return arr.sort(() => Math.random() - 0.5);
  }, [digimonData, clickedDigimon, NUMBER_OF_CARDS]);

  const shuffleCards = useCallback(() => {
    const newData = changeCurrentDigimonData();
    setCurrentDigimon(newData);
  }, [changeCurrentDigimonData]);

  const handleClick = useCallback((name) => {
    if (!isAnimationComplete) return;

    if (!clickedDigimon.includes(name)) {
      const newScore = score + 1;
      setScore(newScore);
      setMaxScore((prev) => Math.max(prev, newScore));
      if (newScore === digimonData.length) {
        setGameOver(true);
      } else {
        setClickedDigimon((prev) => [...prev, name]);
      }
    } else {
      setScore(0);
      setClickedDigimon([]);
    }
    
    setIsAnimationComplete(false);
  }, [isAnimationComplete, clickedDigimon, score, digimonData.length]);

  return (
    <>
      <button className="game-image" onClick={() => setShowDex((prev) => !prev)}>
        <img src="/game.png" alt="Toggle Dex view" />
      </button>
      {!showDex ? (
        <div className="container">
          {!gameOver ? (
            <>
              <h2>Which <em>digimon</em> have you not seen?</h2>
              <h3>Max Score: {maxScore}</h3>
              <h3>Current Score: {score}</h3>
              <div className="card-container">
                {currentDigimon.map((digimon) => (
                  <RandomCard 
                    key={digimon.number} 
                    data={digimon} 
                    onClick={handleClick} 
                    isAnimationComplete={isAnimationComplete}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>You have an incredible memory... <em>Amazing</em></h2>
              <h3>Max Score: {maxScore}</h3>
              <h3>Current Score: {score}</h3>
              <div className="card-container" style={{ visibility: 'hidden' }} />
            </>
          )}
        </div>
      ) : (
        <Dex data={digimonData} clickedDigimon={clickedDigimon} />
      )}
      <Footer />
    </>
  );
};

export default App;