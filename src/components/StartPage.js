import React from "react"

export default function StartPage(props) {
    return (
        <div className="start-page-container">
            <h1 className="start-page-title">Quizzical</h1>
            <p className="start-page-desc">Simple quiz mini-game</p>
            <button className="start-page-button" onClick={props.handleClick}>Start Game</button>
        </div>
    )
}