(() => {

  // Массив для добавления выбранных карт
  let resultArray = [];
  // С самого начала игры ни одна карта не раскрыта
  let showCard = false;
  // Создаем переменные для хранения перевернутых первой и второй карт
  let firstCard, secondCard;
  // Переменная для блокировки страницы
  let boardLocked = false;

  // Создаем поле для игры
  const createDom = () => {
    // Создаем блок-секцию на странице
    const section = document.createElement('section');
    section.className = "game";
    document.body.append(section);

    // Добавляем в нее заголовок
    const title = document.createElement('h2');
    title.className = "game__title";
    title.textContent = "Игра в пары";
    section.append(title);

    // Контейнер для игрового поля
    const container = document.createElement('div');
    container.className = "container";
    section.append(container);

    // Старотовое сообщение
    const message = document.createElement('div');
    message.className = "message";
    container.append(message);

    const messageTitle = document.createElement('div');
    messageTitle.className = "message__text";
    messageTitle.textContent = "Ты готов к игре?";
    message.append(messageTitle);

    const messageSubTitle = document.createElement('div');
    messageSubTitle.className = "message__subtext";
    messageSubTitle.textContent = "Кол-во карточек по вертикали/горизонтали:";
    message.append(messageSubTitle);

    const inputCard = document.createElement('input');
    inputCard.className = "message__input";
    inputCard.setAttribute('placeholder', "Введите четное число от 4 до 10");
    inputCard.setAttribute('type', "number");
    message.append(inputCard);

    const messageButtonWrapper = document.createElement('div');
    messageButtonWrapper.className = "message__btn-wrapper";
    message.append(messageButtonWrapper);

    // Кнопку, ознаменующую начало игры
    const messageButton = document.createElement('button');
    messageButton.className = "message__btn";
    messageButton.textContent = "Нажми, чтобы начать";
    messageButtonWrapper.append(messageButton);
  }

  // Реализуем момент перехода к самой игре
  const startGame = () => {
    const button = document.querySelector('.message__btn');
    // После клика на кнопку "Начать" создать игровое поле с карточками
    button.addEventListener('click', createGame);
  }

  // Функция, которая создает карточное поле по параметрам пользователя
  const createGame = () => {
    const input = document.querySelector('.message__input');
    const message = document.querySelector('.message');
    const container = document.querySelector('.container');

    const DEFOLT_WIDTH = 4;
    let width;
    const DEFOLT_SIZE = DEFOLT_WIDTH * DEFOLT_WIDTH;
    let size;

    let arrayNums = [];
    // Сообщение исчезает
    message.classList.add('message--block');

    let value = input.value;

    // Проверяем введённое число
    if (value % 2 == 0 && value <= 10 && value >= 4) {
      width = value;
      size = width * width;
    } else {
      width = DEFOLT_WIDTH;
      size = DEFOLT_SIZE;
      input.value = 4;
    }

    for (let i = 0; i < size; i++) {
      arrayNums[i] = Math.trunc(i / 2) + 1;
    }

    // Добавляем на поле игры контейнер для карт
    const gameCards = document.createElement('div');
    gameCards.className = "game__container";
    gameCards.style.width = (width * 130) + 'px';
    container.append(gameCards);

    // И сами карточки
    gameCards.innerHTML = Array(arrayNums.length).fill('<div class="game__card"><span class="pattern"></span><span class="number"></span></div>').join('');

    checkCard(arrayNums, gameCards);
  }

  // Функция, которая показывает содержимое карточки
  const checkCard = (arrayNums, gameCards) => {
    const cards = document.querySelectorAll('.game__card');
    generateNumber(arrayNums, cards);

    // При клике на карту срабатывает функция clickCard
    cards.forEach(card => {
      card.addEventListener('click', clickCard)
    })
  }

  // Функция, снимающая с карточки событие клика
  function clickCard() {
    if (boardLocked) return;
    clearCard(firstCard, secondCard);

    this.classList.add('game__card--show');

    // Если выбраная карта равна первой карте, то выходим из функции (предотвращаем "залипание" игры при повторном нажатии на одну и ту же карту)
    if (this === firstCard) return;

    // Если на карточку ещё не кликали, то это наша первая вскрытая карта
    // присваиваем ей значение номера и меняем showCard на true, ведь одна карта уже открыта
    if (!showCard) {
      firstCard = this;
      showCard = true;
      resultArray.push(firstCard);
    } else {
      // Если по одной из карт уже кликали, то данная карта вторая, присваиваем ей номер
      // меняем showCard на false, чтобы сбросить игровое поле
      secondCard = this;
      resultArray.push(secondCard);
      // Проверяем числа на карточках
      checkNumbers();
      checkResult(arrayNums, gameCards);
    }
  }

  // Функция, проверяющая содержимое карточек
  const checkNumbers = () => {
    // Проверяем содержимое карточек
    if (firstCard.textContent === secondCard.textContent) {
      // Если числа на карточках совпадают, то снимаем с этих карточек событие cliсk
      firstCard.removeEventListener('click', clickCard);
      secondCard.removeEventListener('click', clickCard);
      resultArray.length = 0;
      resetBoard();
    } else {
      showCard === false;
    }
  }

  // Функция, которая рисует цифры на карточках в случайном порядке
  const generateNumber = (array, cards) => {
    // Перемешивание чисел с помощью алгоритма Фишера-Йетса
    let shufle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        let tmp = array[i];
        let rnd = Math.floor(Math.random() * (i + 1));
        array[i] = array[rnd];
        array[rnd] = tmp;
      }
      return array;
    }

    // Добавляем на карточки цифры из массива
    let addText = (array, cards) => {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < cards.length; j++) {
          cards[j].textContent = array[j];
        }
      }
    }

    let shufleArray = shufle(array);
    let numbers = document.querySelectorAll('.number');

    addText(shufleArray, numbers);
  }

  // Функция "сброса" игрового поля. По умолчанию:
  // ни одна карта не раскрыта, игровое поле не заблокировано, первая и вторая карты не присвоены
  function resetBoard() {
    [showCard, boardLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  // Функция, переворачивающая первые две карты рубашкой вверх в случае нажатия третьей карты
  const clearCard = (firstCard, secondCard) => {
    if (resultArray.length === 2) {
      resultArray.length = 0;
      resetBoard();
      firstCard.classList.remove('game__card--show');
      secondCard.classList.remove('game__card--show');
    }
  }

  // Функция, которая проверяет не закончилась ли игра
  const checkResult = (arrayNums, gameCards) => {
    const openCard = document.querySelectorAll('.game__card--show');
    console.log(openCard.length);
    if (openCard.length === arrayNums.length) {

      const messageButtonWrapper = document.createElement('div');
      messageButtonWrapper.className = "message__btn-wrapper message__btn-wrapper--reset";
      gameCards.append(messageButtonWrapper);

      // Кнопку, ознаменующую начало игры
      const messageButton = document.createElement('a');
      messageButton.setAttribute('href', "");
      messageButton.className = "message__btn message__btn--reset";
      messageButton.textContent = "Перезапустить!";
      messageButtonWrapper.append(messageButton);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    createDom();
    startGame();
  })

})();
