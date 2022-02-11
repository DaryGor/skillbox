// Задача №2

let feildHeader = document.querySelector('.section__input--title');
let header = document.querySelector('.section__header');
let delayWriter;

// Создаем на странице элемент, где будет находиться наш заголовок
let div = document.createElement('div');
div.classList.toggle('section__header');
document.body.append(div);

// Создаём функцию передачи написанного в поле текста в заголовок
function setHeader () {
  div.textContent = feildHeader.value;
}

// Создаем событие на ввод текста в поле
feildHeader.addEventListener('input', function () {
  // Обнуляем отложенный вызов после каждого ввёденого символа
  clearTimeout(delayWriter);
  // Создаём отложенный вызов функции
  delayWriter = setTimeout(setHeader, 300);
});
