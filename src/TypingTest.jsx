import { useState, useRef } from "react";
import "./TypingTest.css";

export default function TypingSpeed() {
  const ref = useRef();
  const intervalRef = useRef(null);

  const [time, setTime] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [paragraph, setParagraph] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const paragraphs = [
    "The quick brown fox jumps over the lazy dog. Typing fast requires a lot of practice every day. Learning to code is like learning a new language. The more you practice, the better you get.",
    "React is a powerful JavaScript library for building user interfaces. Hooks make it even easier to manage state. Typing tests help improve your speed and accuracy. Regular practice is the key to improvement.",
    "As I sit in my room late at night, staring at the computer screen, I decide it would be a good idea to create this text. There isn't much meaning to it, other than to get some simple practice. A lot of the texts that have been created are rather short, and don't give a good representation of actual typing speed and accuracy. They lack the length to gauge where your strengths and weaknesses are when typing.",
    "The cab arrived late. The inside was in as bad of shape as the outside which was concerning, and it didn't appear that it had been cleaned in months. The green tree air-freshener hanging from the rearview mirror was either exhausted of its scent or not strong enough to overcome the other odors emitting from the cab.",
  ];

  let startTest = () => {
    // pick random paragraph
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    setParagraph(paragraphs[randomIndex]);

    ref.current.disabled = false;
    ref.current.value = "";
    ref.current.focus();

    setTime(60);
    setWpm(0);
    setAccuracy(0);
    setIsFinished(false);

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalRef.current);
          ref.current.disabled = true;
          checkResult();
          setIsFinished(true);
          return 0;
        }
      });
    }, 1000);
  };

  let stopTest = () => {
    clearInterval(intervalRef.current);
    ref.current.disabled = true;
    checkResult();
    setIsFinished(true);
  };

  let checkResult = () => {
    let typedText = ref.current.value.trim();
    let typedWords = typedText.split(" ").filter((word) => word !== "");
    let paragraphWords = paragraph.split(" ").filter((word) => word !== "");

    // count correct words
    let correctWords = 0;
    typedWords.forEach((word, index) => {
      if (word === paragraphWords[index]) {
        correctWords++;
      }
    });

    setWpm(correctWords); // simple WPM (words typed correctly in 1 min)

    // accuracy calculation
    let acc =
      typedWords.length > 0 ? (correctWords / typedWords.length) * 100 : 0;
    setAccuracy(acc.toFixed(2));
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>Typing Speed</h1>

      <p className="paragraph">
        {paragraph || "Click start to get your paragraph..."}
      </p>

      {isFinished ? (
        <div>
          <h3>Your Typing speed is : {wpm} wpm</h3>
          <h3>Accuracy : {accuracy}%</h3>
        </div>
      ) : (
        <h3>Time left : {time}</h3>
      )}

      <button onClick={startTest}>Start Test</button>
      <button onClick={stopTest} style={{ marginLeft: "10px" }}>
        Stop Test
      </button>

      <br />
      <br />
      <textarea ref={ref} className="textarea" style={{}}></textarea>
    </div>
  );
}
