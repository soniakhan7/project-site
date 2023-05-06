import './form-entry.css'
import { Link } from 'react-router-dom';

function quizFront () {
    return (
        <div class="quiz-front">
            <head>
                <meta charset="UTF-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Better Health quiz</title>
            </head>

            <body>
                <div class="l-quiz-entry">
                    <img src={require("./official-assets/form-photo.png")} alt="food"/>
                </div>
                <div class="r-quiz-entry">
                    <div>
                        <Link to="/"> <img src={require("./official-assets/final_logo.png")} alt="logo"/> </Link>
                    </div>
                    <div>
                        <h1>Build your personalized meal plan today!</h1>
                        <p>Take our quiz to get started! Answer a few simple questions to receive a meal plan customized just for
                            you.</p>
                        <Link class="form-entry-cta" to="/Quiz"> Begin quiz</Link>
                    </div>
                </div>
            </body>
        </div>
    )

}

export default quizFront;