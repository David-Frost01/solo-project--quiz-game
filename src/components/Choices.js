import React from "react"

export default function Choices(props) {
    const {selected, handleClick, answer, renderHTML, guessesSubmitted, correct, correct_answer} = props
    
    let styles = {backgroundColor: "#F5F7FB"}
    if(guessesSubmitted && answer === correct_answer) {
       styles = { backgroundColor: "#94D7A2"}
    } else if (guessesSubmitted && selected) {
        styles = { backgroundColor: "#F8BCBC" }
    } else {
        styles = { backgroundColor : selected ? "#D6DBF5" : "#F5F7FB" }
    }
    
    return (
        <p 
            onClick={handleClick}
            style={styles}
        >
            {renderHTML(answer)}
        </p>
    )
}