import React, { useEffect, useState } from "react";

import { readDeck, createCard } from "../utils/api/index";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import Form from "./Form"

function AddCard(props) {
  const { deckId } = useParams(); //takes the deckID from the url

  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
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

      <Form
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
        frontText={frontText}
        backText={backText}
        handleOnSave={handleAddCard} 
        deckId={deckId}
      />
    </div>
  );
}
export default AddCard;
