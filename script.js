import { randomQuotes } from "./text/text.js";
const quoteArea = document.querySelector("#quote");
const typingArea = document.querySelector("#typeArea");
const startItBtn = document.querySelector("#start");
const startBtnArea = document.querySelector(".start-area");
const body = document.querySelector(".wrapper");
const correctLetter = document.getElementById("correct");
const wrongLetter = document.getElementById("error");
const nextQuote = document.getElementById("next");
const outTimer = document.getElementById("timer");
const totalChars = document.getElementById("total");
const wordPerMin = document.getElementById("wpm");
const moveInDiv = document.querySelectorAll(".desc")
const popupNav = document.getElementById("popnav-nav")
const inputNav = document.getElementById("pop-nav")
const sepiaScreen = document.getElementById('sepia-btn')
body.classList.add("hidden");
let count , correctLetterCount , wrongLetterCount , totalCharCount , timeStop , timerCount , data , index;
const getRandomQuotes = (randomQuotes) => {
  const randomIndex = Math.floor(Math.random() * randomQuotes.length);
  return randomIndex;
};
const functionStart = () => {
  count=0;
  correctLetterCount = 0;
  wrongLetterCount = 0;
  totalCharCount = 0;
  timeStop = 0;
  wordPerMin.innerText=0;
  timer("stop")
  index = getRandomQuotes(randomQuotes);
  data = randomQuotes[index];
  let outQuote = data.split("");
  startBtnArea.classList.add("hidden");
  body.classList.remove("hidden");
  typingArea.focus();
  quoteArea.innerHTML = "";
  outQuote.forEach((e) => {
    let eachElement = document.createElement("span");
    eachElement.setAttribute("class", "inactive");
    eachElement.classList.add('input');
    eachElement.innerText = e;
    quoteArea.appendChild(eachElement);
  });
  correctLetter.innerText = correctLetterCount;
  wrongLetter.innerText = wrongLetterCount;
  totalChars.innerText = totalCharCount;
  outTimer.innerText = timeStop;
  moveInDiv.forEach(e=>{
    e.classList.add('animate')
  })
  
};
startItBtn.addEventListener("click", functionStart);
nextQuote.addEventListener("click", functionStart);
quoteArea.addEventListener("click", () => {
  typingArea.focus();
});
typingArea.addEventListener("input", (e) => {

  let letters = e.target.value.split("");
  let spanElements = document.querySelectorAll(".input");
  let [last] = getLastLetter(letters);

  if (e.inputType === "deleteContentBackward") {
    --count;
    spanElements[count].classList.contains("right-color")
      ? correctLetterCount--
      : null;
    spanElements[count].classList.add("inactive");
    spanElements[count].classList.remove("wrong-color");
    spanElements[count].classList.remove("right-color")
    correctLetter.innerText = correctLetterCount;
    return;
  }
  if (spanElements[count].innerText === last) {
    spanElements[count].classList.remove("inactive");
    spanElements[count].classList.add("right-color");
    correctLetterCount++;
  } else {
    spanElements[count].classList.remove("inactive");
    spanElements[count].classList.add("wrong-color");
    wrongLetterCount++;
  }
  if (count === 0) {
    timer("start");
  }
  if (count === data.length-1) {
    timer("stop");
    typingArea.blur();
    getWpm (data)
   
  }
  totalCharCount++;
  correctLetter.innerText=correctLetterCount;
  wrongLetter.innerText = wrongLetterCount;
  totalChars.innerText = totalCharCount;
  count++;
  
});
const getLastLetter = (e) => {
  return e.splice(-1);
};
const timer = (type) => {
  if (type === "start") {
    timerCount = setInterval(() => {
      timeStop++;
      outTimer.innerText = timeStop;
    }, 1000);
  }
  if (type === "stop") {
    clearInterval(timerCount);
  }
};
const getWpm = (dataCount)=>{
  let wordCount=dataCount.split(" ");
  console.log(wordCount)
  console.log(wordCount.length)
  console.log(parseInt(outTimer.innerText))
  let wpm = (wordCount.length/(parseFloat(outTimer.innerText)/60)).toFixed(2)
  wordPerMin.innerText=wpm
}
let popupbtns = document.querySelectorAll('.popups');
popupbtns.forEach(e=>{
  e.addEventListener('click',()=>{
    e.firstChild.classList.toggle('active-btn')
  })
})
sepiaScreen.addEventListener('click',()=>{
  const addsepia = document.querySelectorAll('.add-sepia')
  addsepia.forEach(e=>{
    e.classList.toggle('sepia')
  })
}
)
