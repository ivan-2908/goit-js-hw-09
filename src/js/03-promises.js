import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelayMs = document.querySelector('[name="delay"]');
const delayStepMs = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

form.addEventListener('submit', submitCreatePromises);

function submitCreatePromises(e) {

  e.preventDefault();

  let delay = firstDelayMs.valueAsNumber;
  const delayStepMsVal = delayStepMs.valueAsNumber;
  const amountVal = amount.valueAsNumber;

  let step = delayStepMsVal;

  if (step < 0 || delay < 0 || amountVal <= 0) {
    Notiflix.Notify.failure('Step, delay or amount is not valid');
    return;
  }

  for (let i = 1; i <= amountVal; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${i} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${i} in ${delay}ms`
        );
      });
    delay += delayStepMsVal;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}