import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [cards, setCards] = useState([]);
  useEffect(() => {
    getCards()
    .then((resp) => setCards(resp.result.map((card) => transformToCard(card))))
  }, []);

  const [currentCard, setCurrentCard] = useState({});
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard(cards[Math.floor(Math.random() * cards.length)])
    }, 10000);
    return () => clearInterval(interval);
  })

  async function getCards() {
    const foundCards = await fetch("http://127.0.0.1:8765", {
      method: 'POST',
      headers: {
       // 'Accept': "*/*",
        //'Access-Control-Allow-Origin' : "*",
        'Content-Type' : 'application/json'
      },
      //mode: 'no-cors',
      body: JSON.stringify({"action": "findCards", "version": 6, "params": {"query":'-is:new (deck:"Core 2000" or deck:"All in One Kanji")'}})
    });
    const jsonCards = await foundCards.json();
    const allCards = await fetch("http://127.0.0.1:8765", {
      method: 'POST',
      headers: {
       // 'Accept': "*/*",
        //'Access-Control-Allow-Origin' : "*",
        'Content-Type' : 'application/json'
      },
      //mode: 'no-cors',
      body: JSON.stringify({"action": "cardsInfo", "version": 6, "params": {"cards": jsonCards.result}})
    });
    return allCards.json();
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
  

  return (
    <div className="App">
      <p className="main">{currentCard.main}</p>
      <p className="sub">{currentCard.sub1}</p>
      <p className="sub">{currentCard.sub2}</p>
    </div>
  );
}

export default App;
