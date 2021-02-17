import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";
import NewDeck from "./NewDeck";
import DeckOverview from "./DeckOverview";
import EditDeck from "./EditDeck";

import AddCard from "./AddCard"
import EditCard from "./EditCard";


import {

  listDecks,

} from "../utils/api/index";
import {
  BrowserRouter as Router,

  Route,
  Switch,

} from "react-router-dom";

function Layout() {
  const [deckList, setDeckList] = useState([]);

  const handleDeleteDeck = (deckId) => {
    setDeckList(deckList.filter(deck => deck.id !== deckId));
  }

  const handleCreateDeck = (deck) => {
    setDeckList([...deckList, deck]);
  }
  
  useEffect(() => {
    async function loadDeck() {
      let allDecks = await listDecks();
      setDeckList(allDecks);
    }
    loadDeck();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact={true}>
            <Home handleDeleteDeck={handleDeleteDeck}/>
          </Route>
          <Route path="/decks/new" exact={true}>
            <NewDeck handleCreateDeck={handleCreateDeck}/>
          </Route>
          <Route path="/decks/:deckId" exact={true}>
            <DeckOverview deckList={deckList}/>
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck deckList={deckList}/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard deckList={deckList}/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit" exact={true}>
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
