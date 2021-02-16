import React, { useEffect, useState } from "react";
// import Header from "./Header";
// import NotFound from "./NotFound";
import {
  deleteDeck, listDecks

} from "../utils/api/index";
import { 
  Link,
} from "react-router-dom";

function DeckList(props) {
  const [deckList, setDeckList] = useState([]);

  // useEffect(() => {
  //   async function loadDeck() {
  //     let allDecks = await listDecks();
  //     setDeckList(allDecks);
  //   }
  //   loadDeck();
  // }, []);
  useEffect(loadDecks, []);

  const handleDeleteClick = (deckId) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      console.log(deckId, "who's id is here??s")
      deleteDeck(deckId).then(loadDecks);
      //props.handleDeleteDeck(deckList.id);
      
    }
  };
  function loadDecks() {
    listDecks().then(setDeckList)
    //setDeckList(allDecks);
  }
  // const [decks, setDecks] = useState([]);
  // useEffect(loadDecks, []);

  // function deleteHandler(deckId) {
  //   const confirmed = window.confirm(
  //     "Delete this deck?\n\nYou will not be able to recover it."
  //   );
  //   if (confirmed) {
  //     deleteDeck(deckId).then(loadDecks);
  //   }
  // }

  // function loadDecks() {
  //   listDecks().then(setDecks);
  // }


  const mappedDecks = deckList.map((deck) => {
    // return (
    //   <DeckList
    //     key={deck.id}
    //     deck={deck} 
    //     description={deck.description}
    //     cards={deck.cards}
    //     id={deck.id}
    //     name={deck.name}
    //     handleDeleteDeck={handleDeleteDeck}
    //   />
    // );
  return (
    <div className="card" key={deck.id}>
      <div className="card-body" >
        <h5 className="card-title">{deck.name}</h5>
        <h5 className="card-title">{deck.cards.length} cards</h5>
        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
          View
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
          Study
        </Link>
        <Link
          to="/"
          className="btn btn-danger"
          onClick={() => handleDeleteClick(deck.id)}
        >
          <span className="oi oi-trash" />
        </Link>
      </div>
    </div>
  );
});

  return (
    <>
      <Link to="/decks/new" className="btn btn-secondary">
        <span className="oi oi-plus" />
        {``} Create Deck
      </Link>
      <ul>
        {mappedDecks}
      </ul>
    </>
  )
}

export default DeckList;
