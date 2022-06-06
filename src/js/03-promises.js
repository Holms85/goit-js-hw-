import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name=delay]');
const inputStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');

form.addEventListener('submit', submitForm);
let waitStep = Number(inputStep.value);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promice = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(position, delay);
      } else {
        reject(position, delay);
      }
    }, delay);
  });
  return promice;
}

function submitForm(e) {
  e.preventDefault();
  console.log(inputDelay.value);
  setTimeout(() => {
    for (let i = 0; i < inputAmount.value; i += 1) {
      const position = i;
      waitStep = +inputDelay.value + +inputStep.value * i;
      createPromise(position, waitStep)
        .then(({ position, delay }) => {
          Notiflix.Notify.failure(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }, inputStep.value);
}
