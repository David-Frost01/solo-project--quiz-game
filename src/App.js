import React from "react"
import StartPage from "./components/StartPage"
import QuizSheet from "./components/QuizSheet"

export default function App() {
    const [gameStart, setGameStart] = React.useState(false)
    
    function toggleGameStart() {
        setGameStart(prevState => !prevState)
    }
    
    return ( 
        <main>
            { gameStart ? <QuizSheet start={gameStart}/> : <StartPage handleClick={toggleGameStart}/> } 
        </main>
    )
}