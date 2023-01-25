import React from "react"
import Question from "./Question"

export default function QuizSheet(props) {
    const [quiz, setQuiz] = React.useState([])
    const [guessesSubmitted, setGuessesSubmitted] = React.useState(false)
    const [nextGame, setNextGame] = React.useState(0)
    const [gameStart, setGameStart] = React.useState(props.start)

    if (gameStart) {
        setGameStart (prevState => !prevState)
        newGame()
    }

    React.useEffect( () => {
        return async () => {
            const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
            const data = await res.json()
            setQuiz(data.results)
        }
    }, [nextGame])

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]
        }
    }
    
    function showAnswers() {
        setGuessesSubmitted(prevState => !prevState)
    }
    
    function newGame() {
        setNextGame(prevState => prevState += 1)
        setGuessesSubmitted(prevState => !prevState)
    }
    
    const questions = quiz.map(quizQuestion => {
        const answerArr = [
            quizQuestion.correct_answer, 
            quizQuestion.incorrect_answers[0], 
            quizQuestion.incorrect_answers[1], 
            quizQuestion.incorrect_answers[2]
        ]
        shuffle(answerArr)
        
        const answerObj = [
            {id: answerArr[0], answer: answerArr[0], selected: false, correct: false}, 
            {id: answerArr[1], answer: answerArr[1], selected: false, correct: false},
            {id: answerArr[2], answer: answerArr[2], selected: false, correct: false},
            {id: answerArr[3], answer: answerArr[3], selected: false, correct: false}
        ]
        
        return <Question 
            key={quizQuestion.correct_answer}
            correct_answer={quizQuestion.correct_answer}
            question={quizQuestion.question}
            answerObj={answerObj}
            guessesSubmitted={guessesSubmitted}
        />
    })
    
    return (
        <div className="question-page-container">
            {questions}
            {
                guessesSubmitted ?
                <button className="question-page-button" onClick={newGame}>
                    Play Again
                </button> :
                <button className="question-page-button" onClick={showAnswers}>
                    Check Answers
                </button>
            }
        </div>
    )
} 
