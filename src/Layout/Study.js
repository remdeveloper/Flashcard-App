import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link, 
  useHistory,
  useParams, 
} from "react-router-dom";

import { readDeck } from "../utils/api/index"

function Study() {
  const [cardContent, setCardContent] = useState("");
  const { deckId } = useParams();
  const history = useHistory();
  const [currentCard, setCurrentCard] = useState(0);
  const [deckName, setDeckName] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsList, setCardsList] = useState([]);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    // fetch(`http://localhost:5000/decks/${deckId}?_embed=cards`)
    //   .then((res) => res.json())
    readDeck(deckId)
      .then((json) => {
        setDeckName(json.name);
        setCardsList(json.cards);
        if( json.cards.length === 0){
          return null
        }
        setCardContent(json.cards[currentCard].front);
      });
  }, [currentCard, deckId]);

  useEffect(() => {
    if (cardsList.length > 0) {
      setCardContent(cardsList[currentCard].front);
    }
  }, [currentCard, cardsList]);

  const flipCard = () => {
    if (isFlipped) {
      setCardContent(cardsList[currentCard].front);
    } else {
      setCardContent(cardsList[currentCard].back);
    }
    setIsFlipped(!isFlipped);
    setShowNext(true);
  };

  const nextCard = () => {
    if (currentCard + 1 === cardsList.length) {
      if (
        window.confirm(
          'Restart Cards?\n\nClick "cancel" to return to the home page.'
        )
      ) {
        setIsFlipped(false);
        setShowNext(false);
        setCurrentCard(0);
      } else {
        history.push("/");
      }
    } else {
      setIsFlipped(false);
      setShowNext(false);
      setCurrentCard(currentCard + 1);
    }
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
            Study
          </li>
        </ol>
      </nav>
      <div>
        <h2 className="card-title">Study: {deckName}</h2>
      </div>
      <div className="card">
        <div className="card-body">
          {cardsList.length > 2 ? (
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <h5 className="card-title">
                    Card {currentCard + 1} of {cardsList.length}
                 
                  </h5>
                  <p className="card-text">{cardContent}</p>
                  <div className="d-grid gap-2 d-md-block"></div>
                </div>
                <button
                  onClick={flipCard}
                  className="btn btn-secondary"
                  type="button"
                >
                  Flip
                </button>
                {showNext ? (
                  <button
                    onClick={nextCard}
                    className="btn btn-primary"
                    type="button"
                  >
                    Next
                  </button>
                ) : null}
              </div>
            </div>
          ) : (
            <div>
              <h4>Not enough cards.</h4>
              <p>
                You need at least 3 cards to study. There are {cardsList.length}{" "}
                cards in this deck.
              </p>
              <button className="btn btn-primary">
                <span className="oi oi-plus"></span> Add Cards
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;
