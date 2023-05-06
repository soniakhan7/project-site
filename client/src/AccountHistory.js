import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "./firebaseConfig";
import "./AccountHistory.css";

const AccountHistory = ({ user }) => {
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    // If there is no user, do not try to fetch quiz results
    if (!user) {
      return;
    }

    // Get the user's quiz results from the database
    const quizResultsRef = ref(db, "quizResults");
    onValue(quizResultsRef, (snapshot) => {
      const quizResultsData = snapshot.val();
      if (quizResultsData) {
        const userQuizResults = Object.values(quizResultsData).filter((result) => result.userId === user.uid);
        const sortedQuizResults = userQuizResults.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
        const limitedQuizResults = sortedQuizResults.slice(0, 5);
        setQuizResults(limitedQuizResults);
      }
    });
  }, [user]);

  return (
    <div className="account-history-container">
      <h1 className="account-history-heading">Account History</h1>
      <ul className="account-history-list">
        {quizResults.map((result, index) => (
          <li key={index} className="account-history-list-item">
            <div className="account-history-details">
              <p>Diet: {result.diet}</p>
              <p>Goal: {result.betterHealthHelp}</p>
              <p>Allergies: {result.allergies.join(", ")}</p>
              <p>Cuisine: {result.cuisine.join(", ")}</p>
              <p>Unwanted Ingredients: {result.unwantedIngredients.join(", ")}</p>
              <p>Skill Level: {result.cookingLevel}</p>
              <p>Response: {result.response}</p>
              <p>Timestamp: {result.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountHistory;
