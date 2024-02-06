// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate = null;
const startButton = document.querySelector('[data-start]');
startButton.setAttribute('disabled', 'true');

const input = document.querySelector('#datetime-picker');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      userSelectedDate = selectedDates[0];
      startButton.removeAttribute('disabled');
      updateTimerDisplay();
    } else {
      startButton.setAttribute('disabled', 'true');
      iziToast.error({
        color: 'red',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
  },
  }

  startButton.addEventListener('click', () => {
    if (userSelectedDate) {
      startTimer();
    }
  });
  
  function startTimer() {
    timerInterval = setInterval(updateTimerDisplay, 1000);
    startButton.setAttribute('disabled', 'true');
    input.setAttribute('disabled', 'true');
  }

  function updateTimerDisplay() {
    const timeDifference = userSelectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
  
    if (timeDifference >= 0) {
      daysDisplay.textContent = addLeadingZero(days);
      hoursDisplay.textContent = addLeadingZero(hours);
      minutesDisplay.textContent = addLeadingZero(minutes);
      secondsDisplay.textContent = addLeadingZero(seconds);
    } else {
      stopTimer();
    }

    function addLeadingZero(value) {
      return String(value).padStart(2, '0');
    }
  }
  
  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      input.removeAttribute('disabled');
    }
  }
  
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days, hours, minutes, and seconds
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  flatpickr('#datetime-picker', options);