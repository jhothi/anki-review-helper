
export async function getCards() {
    const foundCards = await fetch("http://127.0.0.1:8765", {
        method: 'POST',
        headers: {
            // 'Accept': "*/*",
            //'Access-Control-Allow-Origin' : "*",
            'Content-Type': 'application/json'
        },
        //mode: 'no-cors',
        body: JSON.stringify({ "action": "findCards", "version": 6, "params": { "query": '-is:new (deck:"Core 2000" or deck:"All in One Kanji")' } })
    });
    const jsonCards = await foundCards.json();
    const allCards = await fetch("http://127.0.0.1:8765", {
        method: 'POST',
        headers: {
            // 'Accept': "*/*",
            //'Access-Control-Allow-Origin' : "*",
            'Content-Type': 'application/json'
        },
        //mode: 'no-cors',
        body: JSON.stringify({ "action": "cardsInfo", "version": 6, "params": { "cards": jsonCards.result } })
    });
    const response = await allCards.json();
    return response.result;
}
