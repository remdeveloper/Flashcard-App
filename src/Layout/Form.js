import React from "react"
import {Link} from "react-router-dom"

function Form({
    handleFrontChange, 
    handleBackChange, 
    frontText, 
    backText, 
    handleOnSave, 
    deckId}){




    return(
        <div>

        
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
          {``} {``} Cancel
        </Link>
        handleAddCard
        handleEditCard
        <button onClick={handleOnSave} className="btn btn-primary">
          {``} {``} Save
        </button>
      </form>
      </div>
    )
}

export default Form