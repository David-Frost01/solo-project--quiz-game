import React from "react"
import Choices from "./Choices"  

export default function Question(props) {
    const {question, answerObj, guessesSubmitted, correct_answer} = props
    const [selectedChoice, setSelectedChoice] = React.useState(answerObj)
    
    function renderHTML(rawHTML) {
        return React.createElement(
            "span", { dangerouslySetInnerHTML: { __html: rawHTML } }
        )
    }
    
    function selectItem(id) {
        return guessesSubmitted ?
            "" :
            setSelectedChoice(prevObj => {
                return prevObj.map(answer => {
                    if(answer.id === id) {
                        return {...answer, selected: !answer.selected}
                    } else {
                        return {...answer, selected: false}
                    }
                })
            })
    }
    
    if (guessesSubmitted) {
        showCorrect()
    }
    
    function showCorrect() {
        selectedChoice.map(choice => {
            if (choice.selected && choice.answer == correct_answer && choice.correct === false) {
                setSelectedChoice(prevObj => {
                    return prevObj.map(ans => {
                        return {...ans, correct: !ans.correct}
                    })
                })
            } else {
                return choice
            }
        })
    }
    
    const possibleAnswers = selectedChoice.map(answer => {
        return <Choices 
            key={answer.id}
            id={answer.id} 
            answer={answer.answer} 
            handleClick={() => selectItem(answer.id)}
            selected={answer.selected}
            renderHTML={renderHTML}
            guessesSubmitted={guessesSubmitted}
            correct={answer.correct}
            correct_answer={correct_answer}
        />
    })
    
    return (
        <div className="qeustion-answer-container">
            <h3 className="question">{renderHTML(question)}</h3>
            <div className="answers-container">
                {possibleAnswers}
            </div>
        </div>
    )
}
