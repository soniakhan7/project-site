import './quiz-form.css'
import {React, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Popup from './Popup'
import axios from 'axios'

function Quiz({setName, setResponse}) {
    const [betterHealthHelp, setHelp] = useState('')
    const [diet, setDiet] = useState('')
    const [allergies, setAllergy] = useState([])
    const [unwantedIngredients, setIngredients] = useState([])
    const [cuisine, setCusine] = useState([])
    const [cookingLevel, setLevel] = useState('')
    const [open, setOpen] = useState('false')
    const [buttonPopup, setButtonPopup] = useState(false)
    const [message, setMessage] = useState('')
    let navigate = useNavigate();

    const handleChange = (addition, arr, setter) => { 
        /*if(arr[0] === 'no allergies ' || arr[0] === 'no preference ') {
            setMessage('You cannot have multiple values with the value already set')
            setButtonPopup(true)
            return
        }*/
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] === addition + ", ") {
                const new_arr = arr.filter(item => item !== arr[i])
                setter(new_arr);
                return
            }   
        }
        const next_arr = [...arr, addition + ", "];
        setter(next_arr) 
    }




     const handleSubmit = () => {

        if(betterHealthHelp === '' || diet === '' || cookingLevel === '' || allergies.length === 0 ||
        unwantedIngredients.length === 0 || cuisine.length === 0) {
            setMessage('All questions must be answered.')
            setButtonPopup(true)
            return 
        }
        
        const prompt = `Create a 5 day meal plan with the following criteria: 
        diet: ${diet}, 
        main goal of the meal plan: ${betterHealthHelp},
        allergies: ${allergies}, 
        cuisine type: ${cuisine},
        unwanted ingredients: ${unwantedIngredients},  
        skill level: ${cookingLevel}.

        Format it so each meal is bulleted and on a seperate line.
        For each new day label it with "Day X:" in bold and then create a new line.
        Each day should have breakfast, lunch, and dinner.`


        
        axios
            .post("http://localhost:8080/", { prompt })
            .then((res) => {
                setResponse(res.data)
            })
            .catch((err) => {
                console.error(err) 
            })
        
        navigate('/Results') 
        
        

    }

    
    
    return (
    <>
        <head>
            <meta charset="UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Better Health Quiz</title>
        </head>

        <body>
        <header>
            <Link to='/'> <img src={require("./official-assets/final_logo_alt.png")} alt="logo"/> </Link>
        </header>
        <div>
            <h1>Take our 7 question quiz to receive your personalized meal plan.</h1>
        </div>
        <form id="meal-plan-form">
        <div>
            <h3>1. What is your name?</h3>
            <input type="text" id="username" name="username" placeholder="Enter your name" 
            onChange={e=>setName(e.target.value)}/>
        </div>
        <div class="goals-radio-group">
            <h3>2. How can Better Health help you?</h3>
            <input type="radio" id="goal1" name="goals" value="find new recipes"
            onChange={e=>setHelp(e.target.value)}/>
            <label for="goal1">
                Plan meals and find new recipes: Discover hundreds of recipes that you'll
                love.
            </label><br/>
            <input type="radio" id="goal2" name="goals" value="make nutritious food choices"
            onChange={e=>setHelp(e.target.value)}/>
            <label for="goal2">
                Make nutritious food choices: Eat well-balanced nutritious meals.
            </label><br/>
            <input type="radio" id="goal3" name="goals" value="manage weight"
            onChange={e=>setHelp(e.target.value)}/>
            <label for="goal3">
                Better manage your weight: Dive deep into science to lose weight and maintain your goals.
            </label><br/>
            <input type="radio" id="goal4" name="goals" value="15-30 min quick recipes"
            onChange={e=>setHelp(e.target.value)}/>
            <label for="goal4">
                Save time: Create a meal plan with quick and easy-to-cook recipes.
            </label><br/>
        </div>

        <div class="radio-group">
            <h3>3. Do you follow any of these diets?</h3>
            <input type="radio" id="diet-option1" name="diet" value="vegetarian" 
            onChange={e=>setDiet(e.target.value)}/>
            <label for="diet-option1">Vegetarian</label>

            <input type="radio" id="diet-option2" name="diet" value="pescatarian"
            onChange={e=>setDiet(e.target.value)}/>
            <label for="diet-option2">Pescatarian</label>

            <input type="radio" id="diet-option3" name="diet" value="ketogenic"
            onChange={e=>setDiet(e.target.value)}/>
            <label for="diet-option3">Ketogenic</label>

            <input type="radio" id="diet-option4" name="diet" value="paleo"
            onChange={e=>setDiet(e.target.value)}/>
            <label for="diet-option4">Paleolithic</label>

            <input type="radio" id="diet-option5" name="diet" value="vegan"
            onChange={e=>setDiet(e.target.value)}/>
            <label for="diet-option5">Vegan</label>

            <input type="radio" id="diet-option6" name="diet" value="ovo-vegetarian"
            onChange={e=>setDiet(e.target.value)}/>
            <label for="diet-option6">Ovo-Vegetarian</label>

            <input type="radio" id="diet-option7" name="diet" value="lacto-vegetarian"
            onChange={e=>setDiet(e.target.value)}/>
            <label for="diet-option7">Lacto-Vegetarian</label><br/>

            <input type="radio" id="null-option" name="diet" value="no diet"
            onChange={e=>setDiet(e.target.value)}/>
            <label for="null-option">I don't follow any diets.</label>
        </div>
        <div class="checkbox-group">
            <h3>4. Do you have any food allergies?</h3>
            <input type="checkbox" id="allergy1" name="allergies" value="gluten-free"
            onClick={() => handleChange('gluten-free', allergies, setAllergy)}/>
            <label for="allergy1">Gluten-free</label>

            <input type="checkbox" id="allergy2" name="allergies" value="tree-nut-free"
            onClick={() => handleChange('tree-nut-free', allergies, setAllergy)}/>
            <label for="allergy2">Tree nut-free</label>

            <input type="checkbox" id="allergy3" name="allergies" value="peanut-free"
            onClick={() => handleChange('peanut-free', allergies, setAllergy)}/>
            <label for="allergy3">Peanut-free</label>

            <input type="checkbox" id="allergy4" name="allergies" value="dairy-free"
            onClick={() => handleChange('dairy-free', allergies, setAllergy)}/>
            <label for="allergy4">Dairy-free</label>

            <input type="checkbox" id="allergy5" name="allergies" value="seafood-free"
            onClick={() => handleChange('seafood-free', allergies, setAllergy)}/>
            <label for="allergy5">Seafood-free</label>

            <input type="checkbox" id="allergy6" name="allergies" value="soybean-free"
            onClick={() => handleChange('soybean-free', allergies, setAllergy)}/>
            <label for="allergy6">Soybean-free</label>

            <input type="checkbox" id="allergy7" name="allergies" value="egg-free"
            onClick={() => handleChange('egg-free', allergies, setAllergy)}/>
            <label for="allergy7">Egg-free</label>

            <input type="checkbox" id="allergy8" name="allergies" value="sesame-free"
            onClick={() => handleChange('sesame-free', allergies, setAllergy)}/>
            <label for="allergy8">Sesame-free</label><br/>

            <input type="checkbox" id="allergy0" name="allergies" value="no allergies"
            onClick={() => handleChange('no allergies', allergies, setAllergy)}/>
            <label for="allergy0">I don't have any allergies.</label>
        </div>

        <div class="dropdown-multiselect">
            <h3>5. What ingredients do you not want in your meal plan?</h3>

            <div class="dropdown-select" onClick={() => {setOpen(!open)}}>
                <span class="selected-options">Select options</span>
                <i class="fa fa-chevron-down"></i>
            </div>
            <div className={`dropdown-options ${open ? 'inactive' : 'active'}`}>
                <label><input type="checkbox" name="ingredients" value="no preference"
                onClick={() => handleChange('no preference', unwantedIngredients, setIngredients)}
                />No preference</label>
                <label><input type="checkbox" name="ingredients" value="mustard"
                onClick={() => handleChange('mustard', unwantedIngredients, setIngredients)}
                />Mustard</label>
                <label><input type="checkbox" name="ingredients" value="tomatoes"
                onClick={() => handleChange('tomatoes', unwantedIngredients, setIngredients)}
                />Tomatoes</label>
                <label><input type="checkbox" name="ingredients" value="olives"
                onClick={() => handleChange('olives', unwantedIngredients, setIngredients)}
                />Olives</label>
                <label><input type="checkbox" name="ingredients" value="avocado"
                onClick={() => handleChange('avocado', unwantedIngredients, setIngredients)}
                />Avocado</label>
                <label><input type="checkbox" name="ingredients" value="beets"
                onClick={() => handleChange('beets', unwantedIngredients, setIngredients)}
                />Beets</label>
                <label><input type="checkbox" name="ingredients" value="beef"
                onClick={() => handleChange('beef', unwantedIngredients, setIngredients)}
                />Beef</label>
                <label><input type="checkbox" name="ingredients" value="pork"
                onClick={() => handleChange('pork', unwantedIngredients, setIngredients)}
                />Pork</label>
                <label><input type="checkbox" name="ingredients" value="cilantro"
                onClick={() => handleChange('cilantro', unwantedIngredients, setIngredients)}
                />Cilantro</label>
                <label><input type="checkbox" name="ingredients" value="mayonnaise"
                onClick={() => handleChange('mayonnaise', unwantedIngredients, setIngredients)}
                />Mayonaise</label>
                <label><input type="checkbox" name="ingredients" value="eggs"
                onClick={() => handleChange('eggs', unwantedIngredients, setIngredients)}
                />Eggs</label>
                <label><input type="checkbox" name="ingredients" value="coconut"
                onClick={() => handleChange('coconut', unwantedIngredients, setIngredients)}
                />Coconut</label>

            </div>
            
        </div>
        <div class="checkbox-group">
            <h3>6. What cuisine types are you interested in?</h3>
            <input type="checkbox" id="cuisine1" name="cuisine" value="american"
            onClick={() => handleChange('American', cuisine, setCusine)}/>
            <label for="cuisine1">American</label>

            <input type="checkbox" id="cuisine2" name="cuisine" value="kid-friendly"
            onClick={() => handleChange('kid-friendly', cuisine, setCusine)}/>
            <label for="cuisine2">Kid-friendly</label>

            <input type="checkbox" id="cuisine3" name="cuisine" value="asian"
            onClick={() => handleChange('Asian', cuisine, setCusine)}/>
            <label for="cuisine3">Asian</label>

            <input type="checkbox" id="cuisine4" name="cuisine" value="Mexican"
            onClick={() => handleChange('Mexican', cuisine, setCusine)}/>
            <label for="cuisine4">Mexican</label>

            <input type="checkbox" id="cuisine5" name="cuisine" value="mediterranean"
            onClick={() => handleChange('Mediterranean', cuisine, setCusine)}/>
            <label for="cuisine5">Mediterranean</label>

            <input type="checkbox" id="cuisine6" name="cuisine" value="spanish"
            onClick={() => handleChange('Spanish', cuisine, setCusine)}/>
            <label for="cuisine6">Spanish</label>

            <input type="checkbox" id="cuisine7" name="cuisine" value="Italian"
            onClick={() => handleChange('Italian', cuisine, setCusine)}/>
            <label for="cuisine7">Italian</label>

            <input type="checkbox" id="cuisine8" name="cuisine" value="french"
            onClick={() => handleChange('French', cuisine, setCusine)}/>
            <label for="cuisine8">French</label>

            <input type="checkbox" id="cuisine9" name="cuisine" value="barbecue"
            onClick={() => handleChange('barbecue', cuisine, setCusine)}/>
            <label for="cuisine9">Barbecue</label>

            <input type="checkbox" id="cuisine10" name="cuisine" value="no preference"
            onClick={() => handleChange('no preference', cuisine, setCusine)}/>
            <label for="cuisine10">No preference</label>

        </div>
        <div class="radio-group">
            <h3>7. What is your cooking skill level?</h3>
            <input type="radio" id="level-1" name="cooking-skill" value="beginner"
            onChange={e=>setLevel(e.target.value)}/>
            <label for="level-1">Beginner</label>
            <input type="radio" id="level-2" name="cooking-skill" value="intermediate"
            onChange={e=>setLevel(e.target.value)}/>
            <label for="level-2">Intermediate</label>
            <input type="radio" id="level-3" name="cooking-skill" value="advanced"
            onChange={e=>setLevel(e.target.value)}/>
            <label for="level-3">Advanced</label>
        </div>
    </form>
    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3>Error</h3>
        <p>{message}</p>
    </Popup>
    <div class="faux-footer">
        <h3>Done taking the quiz?</h3>
        <button type="submit" id="submit-button" onClick={handleSubmit}>Submit</button>
    </div><div>Quiz</div>
    </body>
    </>
    )}

export default Quiz;