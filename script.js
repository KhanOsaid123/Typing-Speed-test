const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

//set value
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
  const paragraph = [
    "As the sun dipped below the horizon, painting the sky in hues of orange and pink, she sat on the porch sipping her tea, reflecting on the day's events and how the simplest moments often brought the greatest joy.",
    "The old bookstore, with its creaky wooden floors and shelves filled to the brim with dusty, well-worn books, was a treasure trove of stories waiting to be discovered, each book holding the potential to transport its reader to another world.",
    "He meticulously planned the surprise party for weeks, making sure every detail was perfect—from the decorations that matched her favorite color to the playlist filled with songs that brought back fond memories, all to make her feel truly special.",
    "Walking through the forest, he marveled at the towering trees that had stood for centuries, their leaves rustling softly in the breeze, creating a serene melody that blended with the distant sound of a flowing stream.",
    "She spent the afternoon in the kitchen, baking her grandmother's famous apple pie, the aroma of cinnamon and sugar filling the house, reminding her of the countless weekends spent learning the recipe at her grandmother's side.",
  ];

  const random = Math.floor(Math.random() * paragraph.length);
  typingText.innerHTML = "";
  for (const char of paragraph[random]) {
    console.log(char);

    typingText.innerHTML += `<span>${char}</span>`;
  }
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => input.focus());
  typingText.addEventListener("click", () => input.focus());
}

//Handle user input
function initTyping() {
  const char = document.querySelectorAll("span");
  const typedChar = input.value.charAt(charIndex);
  if (charIndex < char.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTime, 1000);
      isTyping = true;
    }

    if (char[charIndex].innerText === typedChar) {
      char[charIndex].classList.add("correct");
    } else {
      mistake++;
      char[charIndex].classList.add("incorrect");
    }
    char[charIndex].classList.remove("active");
    charIndex++;

    if (charIndex < char.length) {
      char[charIndex].classList.add("active");
    }
    mistakes.innerText = mistake;
    cpm.innerText = charIndex - mistake;
  } else {
    clearInterval(timer);
    input.value = "";
  }
}

function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;
    let wpmValue = Math.round(
      ((charIndex - mistake) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm.innerText = wpmValue;
  } else {
    clearInterval(timer);
  }
}

function reset() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  time.innerText = timeLeft;
  input.value = "";
  charIndex = 0;
  mistake = 0;
  isTyping = false;
  wpm.innerText = 0;
  cpm.innerText = 0;
  mistakes.innerText = 0;
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);

loadParagraph();
