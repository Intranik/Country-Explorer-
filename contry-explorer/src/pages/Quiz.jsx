import { useState, useEffect } from "react";
import '../index.css';
export default function Quiz() {
  const [step, setStep] = useState(1); // 1 = form, 2 = quiz, 3 = result
  const [username, setUsername] = useState("");
  const [region, setRegion] = useState("");
  const [countries, setCountries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // Hämta länder när användaren startar quiz
  useEffect(() => {
    if (step === 2 && region) {
      fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then(data => {
          // slumpa 15 länder
          const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 1);
          setCountries(shuffled);
        });
    }
  }, [step, region]);

  function handleSubmitForm(e) {
    e.preventDefault();
    if (username && region) {
      setStep(2);
    }
  }

  function checkAnswer() {
    const correct = countries[currentIndex].name.common.toLowerCase();
    if (answer.trim().toLowerCase() === correct) {
      setScore(score + 1);
      setFeedback("✅ Rätt!");
    } else {
      setFeedback(`❌ Fel! Rätt svar: ${countries[currentIndex].name.common}`);
    }

    // vänta 1 sekund innan nästa fråga
    setTimeout(() => {
      setAnswer("");
      setFeedback(null);
      if (currentIndex + 1 < countries.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setStep(3);
        saveResult();
      }
    }, 1000);
  }

  function saveResult() {
    const result = {
      username,
      region,
      score,
      total: countries.length,
      date: new Date().toLocaleString(),
    };

    const saved = JSON.parse(localStorage.getItem("quizResults") || "[]");
    saved.push(result);
    localStorage.setItem("quizResults", JSON.stringify(saved));
  }
  function resetQuiz() {
    setStep(1);
    setUsername("");
    setRegion("");
    setCountries([]);
    setCurrentIndex(0);
    setAnswer("");
    setScore(0);
    setFeedback(null);
  }

  if (step === 1) {
    return (
      <div class =" quizcontainer">
        <h1>Starta Quiz</h1>
        <form class ="quizform" onSubmit={handleSubmitForm}>
          <input 
            class ="inputfield"
            type="text"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <select class ="selectfield" value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">-- Välj region --</option>
            <option value="europe">Europa</option>
            <option value="asia">Asien</option>
            <option value="africa">Afrika</option>
            <option value="americas">Amerika</option>
            <option value="oceania">Oceanien</option>
          </select>
          <button type="submit">Starta</button>
        </form>
      </div>
    );
  }

  if (step === 2 && countries.length > 0) {
    const current = countries[currentIndex];
    return (
      <div>
        <h1>Fråga {currentIndex + 1} / {countries.length}</h1>
        <img src={current.flags.png} alt="flag" style={{ width: "200px" }} />
        <div class ="questionscontainer">
          <input
            class ="inputfield"
            type="text"
            placeholder="Skriv landets namn"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button class = "quizbtn " onClick={checkAnswer}>Svara</button>
        </div>
        {feedback && <p>{feedback}</p>}
        <p class = "pointsP">Poäng: {score}</p>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div>
        <h1>Resultat</h1>
        <p>{username}, du fick {score} av {countries.length} rätt!</p>
        <button onClick={resetQuiz}>Spela igen</button>
      </div>
    );
  }

  return <p>Laddar...</p>;
}
