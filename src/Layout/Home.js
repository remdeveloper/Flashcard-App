import React from "react";

import DeckList from "./DeckList";

function Home(props) {
  return (
    <div>
      <DeckList handleDeleteDeck={props.handleDeleteDeck} />
    </div>
  );
}

export default Home;
