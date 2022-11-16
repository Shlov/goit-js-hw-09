import throttle from 'lodash.throttle';

const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let tId = null;
stopBtnEl.setAttribute('disabled', 'disabled');

startBtnEl.addEventListener('click', throttle(startChangeColor, 1000));
stopBtnEl.addEventListener('click', stopChangeColor);

function startChangeColor() {
    tId = setInterval(changeBackgroundColor, 100);
    startBtnEl.setAttribute('disabled', 'disabled');
    stopBtnEl.removeAttribute('disabled');
}

function stopChangeColor() {
    clearInterval(tId);
    startBtnEl.removeAttribute('disabled');
    stopBtnEl.setAttribute('disabled', 'disabled');
}

function changeBackgroundColor() {
    bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}