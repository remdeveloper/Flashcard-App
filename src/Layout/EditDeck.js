import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";
import {
  stripCards,
  listDecks,
  createDeck,
  readDeck,
  updateDeck,
  deleteDeck,
  listCards,
  createCard,
  readCard,
  updateCard,
  deleteCard,
} from "../utils/api/index";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
  Switch,
  useLocation,
  useHistory,
  useParams,
  useRouteMatch,
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
  }, []);

  return (
    <div>      
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <a href="#">{deckData.name}</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
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
            value={deckData.name}
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
            value={deckData.description}
          ></textarea>
        </div>

        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          {``} {``} Cancel
        </Link>
        <Link to="/decks/:id" className="btn btn-primary">
          {``} {``} Submit
        </Link>
      </form>
    </div>
  );
}

export default EditDeck;
