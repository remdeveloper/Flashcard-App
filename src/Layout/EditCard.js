import React, { useState, useEffect } from "react";
import { updateCard, readDeck, readCard } from "../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";
import Form from "./Form"

function EditCard(props) {
  const { deckId, cardId } = useParams(); 
  const history = useHistory();
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [deckName, setDeckName] = useState("");

  useEffect(() => {
    const loadDeck = async () => {
      const deck = await readDeck(deckId);
      setDeckName(deck.name);
    };

    const loadCard = async () => {
      const card = await readCard(cardId);
      setFrontText(card.front);
      setBackText(card.back);
    };
    loadDeck();
    loadCard();
  }, [deckId, cardId]);

  const handleEditCard = async (e) => {
    e.preventDefault();
    const updatedCard = {
      id: cardId,
      front: frontText,
      back: backText,
      deckId: parseInt(deckId),
    };

    await updateCard(updatedCard);

    history.push(`/decks/${deckId}`);
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
            Edit Card
          </li>
        </ol>
      </nav>
      <h3>{deckName}: Edit Card</h3>

      
      <Form 
         handleFrontChange={handleFrontChange}
         handleBackChange={handleBackChange}
         frontText={frontText}
         backText={backText}
         handleOnSave={handleEditCard} 
         deckId={deckId}
         /> 
    </div>
  );
}
export default EditCard;