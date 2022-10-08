//DOM elements accessed
const timerNumber = document.querySelector("h1#counter");
const buttonContainer = document.querySelector("#button-container");
const likesUL = document.querySelector("ul.likes");
const commentForm = document.querySelector("#comment-form");
const commentList = document.querySelector("#list");

// Initialisation
let currentNumber = 0;
let counterTicking = true;
let likedNumberList = {};

// Submit button click Event
commentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const p = document.createElement("p");
  const newComment = document.querySelector("#comment-input");
  p.textContent = newComment.value;
  commentList.append(p);
  event.target.reset();
});

buttonContainer.addEventListener("click", (event) => {
  // alert(`Button which was clicked was ${event.target.id}`);
    if (event.target.id === "plus") {
    changeTicker(1);
  } else if (event.target.id === "minus") {
    changeTicker(-1);
  } else if (event.target.id === "pause") {
    togglePaused();
  } else if (event.target.id === "heart") {
    addLike();
  }
});

function addLike() {
  // alert('Now in addLike function.');
  if (likedNumberList[currentNumber]) {
    const li = document.querySelector(`[data-number="${currentNumber}"]`);
    likedNumberList[currentNumber] += 1;
    li.textContent = `The number ${currentNumber} has been liked ${likedNumberList[currentNumber]} times`;
  } else {
    likedNumberList[currentNumber] = 1;
    const li = document.createElement("li");
    li.dataset.number = currentNumber;
    li.textContent = `The number ${currentNumber} has been liked 1 time`;
    likesUL.append(li);
  }
}

function togglePaused() {
  // alert('Now in togglePaused function.');
  counterTicking = !counterTicking;
  // diasable all other buttons when ticker paused
  document.querySelectorAll("button").forEach((button) => {
    if (button.id !== "pause") {
      button.disabled = !counterTicking;
    } else {
      if (counterTicking) {
        button.textContent = "pause";
      } else {
        button.textContent = "resume";
      }
    }
  });
}

function changeTicker(amount) {
  // alert('Now in changeTicker function.');
  currentNumber = currentNumber + amount;
  timerNumber.textContent = currentNumber;
}

// setInterval run code every 1000 milliseconds
setInterval(() => {
  if (counterTicking) {
    changeTicker(1);
  }
}, 1000);