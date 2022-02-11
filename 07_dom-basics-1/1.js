// Задача №1

let textField = document.querySelector('.section__input');
let button = document.querySelector('.section__btn');
let timer = document.querySelector('.section__time');

let timerInterval;

// Функция, которая передаёт текст, который вводит пользователь, в счётчик
textField.addEventListener('input', function takeText() {
    timer.textContent = textField.value;
});

// Функция таймера, которая берёт значение из ввода, делает из этой строки число, уменьшает
// количество секунд на одну и перезаписывает новое число в таймер. Когда количество секунд равно нулю, обнуляет интервал.
function countdown () {
    let seconds = parseInt(timer.textContent);
    seconds--;
    timer.textContent = seconds;

    if (seconds === 0) {
      clearInterval(timerInterval);
    }
}

// По клику на кнопку
button.addEventListener('click', function  () {
  // Сначала очищается функция с интервалом, чтобы пользователь мог по клику на кнопку каждый раз очищать и перезаполнять значение
  clearInterval(timerInterval);
  // Запись нового значения
  timer.textContent = textField.value;
  // Повторять функцию таймера каждую секунду
  timerInterval = setInterval (countdown, 1000);
});


