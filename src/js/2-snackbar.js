// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = parseInt(e.target.elements.delay.value, 10);
  const state = e.target.elements.state.value;

  delayFunction(delay, state)
    .then(result => {
      iziToast.success({
        message: `${result}`,
        position: 'topRight',
      });
    })
    .catch(err => {
      iziToast.error({
        message: `${err}`,
        position: 'topRight',
      });
    });
});

function delayFunction(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}