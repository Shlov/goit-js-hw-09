import flatpickr from "flatpickr";
import { Report } from 'notiflix/build/notiflix-report-aio';
// import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";

const inputEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const startBtnEl = document.querySelector('[data-start]');

startBtnEl.setAttribute('disabled', 'disabled');
let timeToTheEnd = null;
let tId = null;

startBtnEl.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      // alert('Please choose a date in the future');
      Report.failure(
        'Timer fail',
        'Please choose a date in the future',
        'Okay',
        );
      return
    }
    startBtnEl.removeAttribute('disabled');
    timeToTheEnd = selectedDates[0].getTime() - Date.now();
  },
};

flatpickr(inputEl, options);

function startTimer() {
  tId = setInterval(timer, 1000);
}

function timer() {
  if (timeToTheEnd <= 0) {
    clearInterval(tId);
    return
  }
  const {days, hours, minutes, seconds} = convertMs(timeToTheEnd);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
  timeToTheEnd -= 1000;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}



