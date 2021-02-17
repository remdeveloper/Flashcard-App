import React, { useEffect, useState } from "react";

import { readDeck, createCard } from "../utils/api/index";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";

function AddCard(props) {
  const { deckId } = useParams(); //takes the deckID from the url

  const [frontText, setFrontText] = useState("");
  const [backText, setBackText  ] = useState("");
  const [deckName, setDeckName] = useState("");

  //code for showing deck name and description
  useEffect(() => {
    const loadDeck = async () => {
      const deck = await readDeck(deckId);
      setDeckName(deck.name);
    };
    loadDeck();
  }, [deckId]);

  const handleAddCard = async (e) => {
    e.preventDefault();
    const newCard = {
      front: frontText,
      back: backText,
    };

    await createCard(deckId, newCard);

    setFrontText("");
    setBackText("");
  };

  const handleFrontChange = (e) => {
    setFrontText(e.target.value);
  };

  const handleBackChange = (e) => {
    setBackText(e.target.value);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{deckName}: Add Card</h3>

      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Front
          </label>
          <textarea
            placeholder="Front side of card"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            row="2"
            value={frontText}
            onChange={handleFrontChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="2"
            placeholder="Back side of card"
            value={backText}
            onChange={handleBackChange}
          ></textarea>
        </div>

        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          {``} {``} Done
        </Link>
        <button onClick={handleAddCard} className="btn btn-primary">
          {``} {``} Save
        </button>
      </form>
    </div>
  );
}
export default AddCard;
