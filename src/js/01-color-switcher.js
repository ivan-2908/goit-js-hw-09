function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const bodyChangeColor = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

const INTERVAL_DURATION = 1_000;

let intervalId = null;

btnStop.disabled = true;

btnStart.addEventListener('click', event => {
  event.target.disabled = true;
  btnStop.disabled = false;

  intervalId = setInterval(() => {
    bodyChangeColor.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_DURATION);
});

btnStop.addEventListener('click', event => {
  event.target.disabled = true;
  btnStart.disabled = false;

  clearInterval(intervalId);
});
