import { ref, push } from "firebase/database";
import { db } from "./firebaseConfig";

const addQuizResult = async (user, quizResult) => {
  try {
    // Associate the quiz result with the user's ID
    quizResult.userId = user.uid;
  
    // Add the quiz result to Realtime Database
    const quizResultsRef = ref(db, 'quizResults');
    const newQuizResultRef = push(quizResultsRef);
    await set(newQuizResultRef, {
      ...quizResult,
      timestamp: Date.now(),
    });
  
    console.log("Quiz result added with ID: ", newQuizResultRef.key);
  } catch (err) {
    console.error(err);
  }
};

export default addQuizResult;
