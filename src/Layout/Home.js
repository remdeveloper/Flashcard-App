import React, { useEffect, useState } from "react";

// import {
//   BrowserRouter as Router,
//   Link  
// } from "react-router-dom";
import DeckList from "./DeckList"

function Home(props) {


  return (
    <div>
      <DeckList handleDeleteDeck={props.handleDeleteDeck}/>
      {/* <Link to="/decks/new" className="btn btn-secondary">
        <span className="oi oi-plus" />
        {``} Create Deck
      </Link> */}
      {/* this calls DeckList and passes prop mappedDecks */}
      {/* {props.mappedDecks}            */}
    </div>
  );
}

export default Home;
