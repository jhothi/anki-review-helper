import React, { useState, useEffect } from 'react';
import './App.css';
import {getCards} from './anki'

function App() {

  // Setup the initial list of cards in the deck.
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getCards()
      .then((resp) => setCards(resp.result.map((card) => transformToCard(card))));
  }, []);

  // Move through list over time.
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length)
      console.log(index);
    }, 10000);
    return () => clearInterval(interval);
  });

  // Allow option to randomize deck.
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.code === "KeyS") {
        setCards((prev) => shuffleDeck(prev.slice(0)));
        setIndex(0);
      }
    });
    return () => window.removeEventListener("keydown", (event) => null);
  });
  function shuffleDeck(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function transformToCard(card) {
    if (card.deckName === "All in One Kanji") {
      return {
        main: card.fields.Kanji.value,
        sub1: card.fields.English.value,
        sub2: card.fields.Kunyomi.value
      }
    } else {
      return {
        main: card.fields['Vocabulary-Kanji'].value,
        sub1: card.fields['Vocabulary-English'].value,
        sub2: card.fields['Vocabulary-Kana'].value
      }
    }
  }


  if (cards.length > 0) {
    return (
      <div className="App">
        <p className="main">{cards[index].main}</p>
        <p className="sub">{cards[index].sub1}</p>
        <p className="sub">{cards[index].sub2}</p>
      </div>
    )
  }
  else {
    return <div className="App">Loading...</div>
  }
}

export default App;
