(function () {

  // Создаем и возвращаем заголовок приложения
  function craeteAppTitle(title) {
    let appTitle = document.createElement('h1');
    appTitle.innerHTML = title;

    // В ретурн помещается то, что в конечном счете должно отразиться на странице
    return appTitle;
  }

  // Создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('disabled', 'true');
    button.textContent = 'Добавить дело';

    // Если поле инпута пустое, то кнопка не активна
    input.addEventListener('input', function () {
      if (input.value === '') {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    })

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  // Создаем контейнер для списка элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  };

  // Создание элемента для одной задачи
  function createTodoItem(task, id) {
    let item = document.createElement('li');

    item.textContent = task.name;

    // Если добавленный объект имеет true в ключе done, то красим его в зелёный
    if (task.done === true) {
      item.classList.toggle('list-group-item-success');
    }

    // Создаём кнопки
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // окрасить объект в зеленый цвет при клике на кнопку "готово"
    doneButton.addEventListener('click', function () {
      // По клику дело окрашивается в зеленый цвет, как выполненное
      item.classList.toggle('list-group-item-success');
      // По клику дело назначается выполненным, записываем true в ключ done
      task.done = true;

      // вызываем данные из локальной памяти
      let localStorageArray = JSON.parse(localStorage.getItem(`${id}`));
      let array = localStorageArray;

      // Идём по списку данных массива памяти
      for (let i = 0; i < array.length; i++) {
        // Если дело с нужным нам именем, взятое из локальной памяти
        if (array[i].name === task.name) {
          // уже выполнено, то при повторном клике меняем его значение на невыполненное - false
          if (array[i].done === true) {
            task.done = false;
          };

          // Если дело с нужным нам именем из
          if (array[i].name === task.name) {
            // отмечено пользователем как выполненное
            if (task.done === true) {
              // то записываем это в архив с памятью
              array[i].done = true;
              localStorageArray = localStorage.setItem(`${id}`, JSON.stringify(array));
            } else {
              // если не выполнено
              array[i].done = false;
              // то записываем это в архив с памятью
              localStorageArray = localStorage.setItem(`${id}`, JSON.stringify(array));
            }
          }

        }
      }
    });

    // // удалить объект при клике на кнопку удалить
    deleteButton.addEventListener('click', function () {
      if (confirm('Вы уверены?')) {
        item.remove();
        let localStorageArray = JSON.parse(localStorage.getItem(`${id}`));
        let array = localStorageArray;
        // Если имя элемента в массиве из локальной памяти совпадает с именем элемента,
        // по которому мы сейчас кликаем, то удаляем его из массива
        function checkElem() {
          for (let i = 0; i < array.length; i++) {
            if (array[i].name === task.name) {
              array.splice(i, 1);
            }
          }
        }
        array.map(checkElem);
        localStorageArray = localStorage.setItem(`${id}`, JSON.stringify(array));
      }
    });

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // Возвращаем дело и кнопки
    return {
      item,
      doneButton,
      deleteButton,
    };
  };

  // Функция, которая проверяет есть ли данные в локальной памяти и выдает массив с данными
  function getLocalStorage(id) {
    if (localStorage.getItem(`${id}`)) {
      storageList = JSON.parse(localStorage.getItem(`${id}`));
    } else {
      storageList = [];
    }

    return storageList;
  }

  // Функция, которая добавляет дело в локальную память
  function createLocalStorage(task, id) {
    // Создается объект, куда помещается наименование дела и его превоначальное состояние (не выполнено)
    let localStorageItem = {
      name: task,
      done: false,
    }

    // Проверка, существует ли на данный момент записи в памяти
    storageList = getLocalStorage(id);
    // Добавить новый элемент в массив с данными
    storageList.unshift(localStorageItem);
    // Записать измененный массив в локальную память
    localStorage.setItem(`${id}`, JSON.stringify(storageList));
  }

  function createTodoApp(id, title = 'Список дел', tasks) {
    let container = document.getElementById(id)
    let todoAppTitle = craeteAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    // Сначала в контейнер помещаем заголовок, форму для создания списка и контейнер для списка
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    // Функция создания восстановления дел из памяти
    let todoStorageItem;

    // Вызываем память
    let storageList = getLocalStorage(id);

    // Если в LocalStorag ничего нет, то выводим список дел по дефолту
    if (!storageList.length) {
        // Функция создания дел по дефолту
        let todoDefoltItem;

        // Создание дел по дефолту
        for (let i = 0; i < tasks.length; i++) {
          let task = tasks[i];
          todoDefoltItem = createTodoItem(task);
          todoList.append(todoDefoltItem.item);
        }
    }

    // Заполнение списка дел из localStorage
    for (let j = 0; j < storageList.length; j++) {
      let task = storageList[j];
      todoStorageItem = createTodoItem(task, id);
      todoList.append(todoStorageItem.item);
    }

    // При событии submit  мы не отправляем функцию привычным для нее способом
    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Назначить добавленный элемент объектом, имеющим состояния

      let taskObject = {
        name: todoItemForm.input.value,
        done: false,
      }

      // Создаем элемент списка - передавая туда значение в поле инпут
      let todoItem = createTodoItem(taskObject, id);

      // Добавить созданный элемент к списку
      todoList.append(todoItem.item);

      // Добавить созданный элемент в localStorage
      createLocalStorage(todoItemForm.input.value, id);

      // Обнуление значения в инпуте
      todoItemForm.input.value = '';
      todoItemForm.button.setAttribute('disabled', 'disabled');
    });
  }

  window.createTodoApp = createTodoApp;
})();


