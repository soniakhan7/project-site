import {useState} from 'react'
import Home from './LandingPage.js'
import QuizFront from './Quiz-front.js'
import Quiz from './Quiz.js'
import Results from './Last-page-of-quiz.js'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
    
    const [name, setName] = useState('')
    const [response, setResponse] = useState('Loading your meal plan...')

    
    return (
    <div>
        <BrowserRouter>
        <div>
            <Routes>
            <Route path="/" element ={<Home/>} />
            <Route path="/QuizFront" element={<QuizFront/>} />
            <Route path="/Quiz" element ={<Quiz name={name} setName={setName} setResponse={setResponse}/>} />
            <Route path="/Results" element={<Results response={response} name={name} setName={setName} setResponse={setResponse}/>} />
            </Routes>
        </div>
    </BrowserRouter>
  </div>
  )
  
}

export default App;
