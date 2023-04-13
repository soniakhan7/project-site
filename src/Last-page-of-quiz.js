import './quiz-form.css'
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';


function Results({response, name}) {

    const handleDownload = () => {
        if(response === 'Loading your meal plan...') {
            return 
        }
        const pdf = new jsPDF('p', 'pt');

        const output = name + "'s Meal Plan " + response + "\r\n\r\n BetterHealth";

        pdf.text(20, 20, output);

        pdf.save("MyMealPlan.pdf");
    }
    
    return (
    <>
        <head>
            <meta charset="UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Better Health</title>
        </head>

        <body>
            <header>
                <Link to='/'> <img src={require("./official-assets/final_logo_alt.png")} alt="logo"/> </Link>
            </header>
            <main>
                <div class="top-main">
                    <h1>Hi {name}!</h1>
                    <h3>Your personalized meal plan is here!</h3>

                    <p>We've taken your preferences and restrictions into consideration and curated a meal plan that's perfect
                        for
                        you.</p>

                    <p> You'll find breakfast, lunch, dinner, and snacks for each day of the week. We hope you enjoy your meal
                        plan
                        and it helps you on your journey to better health!</p>

                </div>

                <div id="response" className='response'>
                    <div>{response}</div>
                </div>

                <div class=" bottom-main">
                    
                        <p id="download-copy">To download your meal plan click the button below.</p>
                        <button id="button" onClick={handleDownload}>Download</button>
                
                        <h4>or</h4>
                
                
                        <p id="retake-quiz-copy">Not quite what you were looking for. <br/> Let's retake the quiz to get your perfect plan!</p>
                        <button onClick={() => window.location.href = '/Quiz'} id="button">Take the quiz</button>
                
                </div>

            </main>
            <div class="faux-footer">{/*Empty div container for demo purposes*/} </div>
        </body>
    </>
    )   
}

export default Results;