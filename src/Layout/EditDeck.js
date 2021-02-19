import React, { useEffect, useState } from "react";

import {

  readDeck,

} from "../utils/api/index";
import {
  BrowserRouter as Router,
  Link,

  useParams,

} from "react-router-dom";

function EditDeck(props) {
  const { deckId } = useParams(); //takes the deckID from the url

  const [deckData, setDeckData] = useState({});

  //code for showing deck name and description
  useEffect(() => {
    const loadDeck = async () => {
      const deck = await readDeck(deckId);
      setDeckData(deck);
    };
    loadDeck();
  }, [deckId]);

  return (
    <div>      
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{deckData.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h3>Edit Deck</h3>

      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            defaultValue={deckData.name}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            defaultValue={deckData.description}
          ></textarea>
        </div>

        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          {``} {``} Cancel
        </Link>
        <Link to={`/decks/${deckId}`} className="btn btn-primary">
          {``} {``} Submit
        </Link>
      </form>
    </div>
  );
}

export default EditDeck;
