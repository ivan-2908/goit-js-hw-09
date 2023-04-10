import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const dateChosen = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let timer = null;

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDate) {

    if (selectedDate[0] <= new Date()) {
        startBtn.disabled = true;
        Notiflix.Notify.failure('Please choose a date in the future');
    } else {
    startBtn.disabled = false;
    startBtn.addEventListener('click', countdownTime);

    function countdownTime() {
        timer = setInterval(() => {
        startBtn.disabled = true;

        const dateChoosenMs = new Date(dateChosen.value.replace(/-/g, '/')).getTime();
        const now = new Date().getTime();
        const timeLeft = dateChoosenMs - now;
        const { days, hours, minutes, seconds } = convertMs(timeLeft);

        dataDays.innerHTML = days < 10 ? addLeadingZero(days) : days;
        dataHours.innerHTML = hours < 10 ? addLeadingZero(hours) : hours;
        dataMinutes.innerHTML = minutes < 10 ? addLeadingZero(minutes) : minutes;
        dataSeconds.innerHTML = seconds < 10 ? addLeadingZero(seconds) : seconds;

        if (timeLeft < 1000) {
            clearInterval(timer);
            startBtn.disabled = false; 
        }
        }, 1000);
    }

    function addLeadingZero(value) {
        const stringValue = String(value);
        return stringValue.padStart(2, '0');
    }

    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
    }
    }
},
};

flatpickr(dateChosen, options);
