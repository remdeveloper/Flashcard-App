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

function CardList(props){
    return(
        <div className="card">
        <div className="card-body">
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-4">{props.front}</div>

              <div className="col-4">{props.back}</div>

              <div className="col-4">
                <Link to="#" className="btn btn-secondary">
                  Edit
                </Link> 
                <Link to="#" className="btn btn-danger">
                  <span className="oi oi-trash" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CardList