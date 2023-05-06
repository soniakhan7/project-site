// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, push, set } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase();


const quizResultsRef = ref(db, 'quizResults');

async function addQuizResult(userId, diet, betterHealthHelp, allergies, cuisine, unwantedIngredients, cookingLevel, response) {
  const quizResultsData = {
    userId,
    diet,
    betterHealthHelp,
    allergies,
    cuisine,
    unwantedIngredients,
    cookingLevel,
    response,
    timestamp: new Date().toISOString(),
  };

  try {
    const newQuizResultRef = push(quizResultsRef);
    await set(newQuizResultRef, quizResultsData);
    console.log("Quiz result written with ID: ", newQuizResultRef.key);
  } catch (e) {
    console.error("Error adding quiz result: ", e);
  }
}

export { app, analytics, auth, provider, db, ref, push, addQuizResult, set };
