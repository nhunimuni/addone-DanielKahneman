document.addEventListener("DOMContentLoaded", () => {
  let counter = 0;

  const h2 = document.getElementsByTagName("h2")[0],
    input = document.getElementsByTagName("input")[0],
    button = document.getElementsByTagName("button")[0];
  input.focus();
  input.select();

  let twoMinutes = 14,
    display = document.getElementsByTagName("p");
  startTimer(twoMinutes, display, function announceResult(interval) {
    if (display[0].innerHTML == "00:00") {
      console.log("cleared?");
      clearInterval(interval);

      h2.innerHTML = `You got ${counter.toString()} ! Good job.`;
      input.classList.add("display--none");
      button.classList.remove("display--none");
    }
  });

  //h2, Random Number
  let rndOrigin = getRandomInt(1000, 9999);
  h2.innerHTML = rndOrigin.toString();

  //Input, Enter Event Listener
  input.addEventListener("keyup", function (event) {
    const originSplited = rndOrigin.toString().split("");
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      if (compare(calculateSolution(originSplited), input.value)) {
        counter++;
        display[1].innerHTML = display[1].innerHTML + "&#9679";
        input.value = "";
        rndOrigin = getRandomInt(1000, 9999).toString();
        h2.innerHTML = rndOrigin.toString();
      } else {
        input.classList.add("input--false");
        setTimeout(() => {
          input.value = "";
          input.classList.remove("input--false");
        }, 500);
      }
    }
  });

  button.addEventListener("click", () => {
    location.reload();
  });
});

const startTimer = (duration, display, callback) => {
  var timer = duration,
    minutes,
    seconds;
  let interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display[0].textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }

    if (typeof callback == "function") callback(interval);
    else console.log("not a callback");
  }, 1000);
};

/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const calculateSolution = (originArr) => {
  const solution = originArr.map((num) =>
    parseInt(num) !== 9 ? (parseInt(num) + 1).toString() : "0"
  );

  return solution.join("");
};

const compare = (solution, playerSolution) => {
  return solution === playerSolution ? true : false;
};
