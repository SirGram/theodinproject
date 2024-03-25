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
            <div className="card-name">{data.name}</div>
            <img src={data.img} alt={data.name} />
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
    const randomNumber = () => {
      return Math.floor(Math.random() * digimonData.length);
    };

    let counter = 0;
    const arr = [];
    while (counter < numberCards) {
      const randomIndex = randomNumber();
      arr.push(digimonData[randomIndex]);
      counter++;
    }

    return arr;
  }

  function changeCurrentDigimon(newData) {
    newData.forEach((digimon) => {
      const index = digimonData.findIndex((item) => item === digimon);
      digimon.number = index;
    });
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
      addScore();
    } else {
      resetScore();
    }
    const newClickedDigimon = [...clickedDigimon, name];
    setClickedDigimon(newClickedDigimon);
    setIsAnimationComplete(false);
  }

  function addScore() {
    const newScore = score + 1;
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
          <h2>Which digimon have you not seen?</h2>
          <h3>Max Score: {maxScore}</h3>
          <h3>Current Score: {score}</h3>
          <div className={`card-container`}>
            {currentDigimon.map((digimon, index) => (
              <RandomCard key={index} data={digimon} onClick={handleClick} />
            ))}
          </div>
        </div>
      ) : (
        <Dex data={digimonData} />
      )}
      <Footer />
    </>
  );
}

export default App;
