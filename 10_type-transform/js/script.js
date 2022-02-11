
(() => {

  // Функция, создающая интерфейс панели управления
  const createDOM = () => {

    // Сосздание секции
    const section = document.createElement('section');
    section.className = 'container-fluid';
    document.body.append(section);

    // Создание заголовка
    const title = document.createElement('h1');
    title.className = 'display-4 text-center';
    title.style.margin = '30px 0';
    title.textContent = 'Панель управления студентами';
    section.append(title);

    const row = document.createElement('div');
    row.className = 'row';
    section.append(row);

    const left = document.createElement('div');
    left.className = 'col-lg-6';
    row.append(left);

    const right = document.createElement('div');
    right.className = 'col-lg-4 offset-lg-1';
    row.append(right);

    // Создание таблицы в левой части секции
    const tableWrapper = document.createElement('table');
    tableWrapper.className = 'table';
    left.append(tableWrapper);

    const thead = document.createElement('thead');
    tableWrapper.append(thead);

    const trHead = document.createElement('tr');
    trHead.className = 'table-primary';
    thead.append(trHead);

    const tableList = ['ФИО', 'Факультет', 'Дата рождения (Возраст)', 'Год обучения (Номер курса)'];

    tableList.forEach(function (tableList) {
      const items = document.createElement('th');
      items.setAttribute('scope', 'col');
      items.className = 'column-head';
      items.style.cursor = 'pointer';
      items.textContent = `${tableList}`;
      trHead.append(items);
    });

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody');
    tableWrapper.append(tbody);

    const trBody = document.createElement('tr');
    tbody.append(trBody);

    // Создание полей для осуществления поиска

    const searchList = [
      {type: "text" , id: "searchName"},
      {type: "text" , id: "searchFaculty"},
      {type: "date" , id: "searchBirthDate"},
      {type: "number" , id: "searchStartYear"}
    ]

    searchList.forEach(function (searchList) {
      const searchInputContainer = document.createElement('td');
      thead.append(searchInputContainer);

      const inputSearch = document.createElement('input');
      inputSearch.setAttribute('type', searchList.type);
      inputSearch.setAttribute('id', searchList.id);
      inputSearch.setAttribute('placeholder', 'Поиск...');
      inputSearch.className = 'form-control';
      searchInputContainer.append(inputSearch);
    });

    // Создание формы в правой части секции
    const form = document.createElement('form');
    form.setAttribute('id', 'form');
    right.append(form);

    const formItems = [
      { title: 'Имя', type: "text", id: "name", },
      { title: 'Фамилия', type: "text", id: "surname", },
      { title: 'Отчество', type: "text", id: "patronymic", },
      { title: 'Дата рождения', type: "date", id: "birthDate", },
      { title: 'Год начала обучения', type: "number", id: "startYear", },
      { title: 'Факультет', type: "text", id: "faculty", },
    ];

    formItems.forEach(function (formItems) {
      const container = document.createElement('div');
      container.className = 'mb-3';
      container.style.position = 'relative';
      form.append(container);

      const label = document.createElement('label');
      label.setAttribute('for', formItems.id);
      label.className = 'form-label';
      label.textContent = formItems.title;
      container.append(label);

      const input = document.createElement('input');
      input.setAttribute('type', formItems.type);
      input.setAttribute('id', formItems.id);
      input.className = 'form-control input';
      container.append(input);

      const error = document.createElement('span');
      error.className = 'error-label';
      container.append(error);
    });

    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.setAttribute('id', 'submit');
    button.className = 'btn btn-primary';
    button.textContent = 'Добавить'
    form.append(button);
  }

  // Функция, добавляющая студента в таблицу
  const addToTable = (allStudents = JSON.parse(localStorage.getItem('students'))) => {
    const container = document.getElementById('tbody');
    container.innerHTML = '';

    for (let i = 0; i < allStudents.length; i++) {
      const tableList = Object.values(allStudents[i]);
      const string = document.createElement('tr');
      container.append(string);

      tableList.forEach(function (tableList) {
        const items = document.createElement('td');
        items.setAttribute('scope', 'col');
        items.textContent = `${tableList}`;
        string.append(items);
      });
    }
  }

  // Функция, заполняющая таблицу
  const formSubmit = () => {
    const form = document.getElementById('form');
    const inputName = document.getElementById('name');
    const inputSurname = document.getElementById('surname');
    const inputPatronymic = document.getElementById('patronymic');
    const inputFaculty = document.getElementById('faculty');
    const inputBirthDate = document.getElementById('birthDate');
    const inputStartYear = document.getElementById('startYear');

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      let error = formFavidate();

      // Функция, которая получает данные о студенте из полей ввода
      if (error === 0) {

        let student = {
          name: '',
          surname: '',
          patronymic: '',
          birthDate: '',
          startYear: '',
          faculty: '',
        }

        let categoryTable = {
          fullName: '',
          faculty: '',
          age: '',
          duration: '',
        }

        student.name = inputName.value.trim();
        student.surname = inputSurname.value.trim();
        student.patronymic = inputPatronymic.value.trim();
        student.birthDate = inputBirthDate.value;
        student.startYear = inputStartYear.value.trim();
        student.faculty = inputFaculty.value.trim();

        // Полное имя
        categoryTable.fullName = `${student.surname + ' ' + student.name + ' ' + student.patronymic}`;
        categoryTable.faculty = `${student.faculty}`;

        // Преобразование даты рождения в нужный формат
        const birthYear = `${student.birthDate.slice(0, 4)}`;
        const birthMonth = `${student.birthDate.slice(5, 7)}`;
        const birthDay = `${student.birthDate.slice(8, 10)}`;

        // Текущая дата
        const actualDate = new Date().toISOString().slice(0, 10).replace("-", "").replace("-", "");
        // Дата рождения
        const birthData = student.birthDate;

        // День рождения студента в этом году
        const birthDataActual = `${actualDate.slice(0, 4)}` + `${student.birthDate.slice(5, 7)}` + `${student.birthDate.slice(8, 10)}`;
        let calculatedAge = actualDate.slice(0, 4) - birthData.slice(0, 4);

        // Если в новом году День рождения студента еще не наступил, то отнимаем из возраста 1 год
        if ( birthDataActual > actualDate ) {
          calculatedAge = calculatedAge - 1;
        }

        // Возраст студента
        categoryTable.age = `${birthDay}.` + `${birthMonth}.` + `${birthYear} ` + `(${calculatedAge} лет)`;

        // Подсчет продолжительности обучения
        const startYear = student.startYear;
        const endYear = Number(startYear) + 4;
        const endData = `${endYear}0901`;
        let numberCourse;

        if ( actualDate > endData) {
          numberCourse = 'Закончил';
        } else {
          numberCourse = `${actualDate.slice(0, 4) - startYear} курс`;
        }

        categoryTable.duration = `${startYear} - ${endYear} (${numberCourse})`;

        let allStudents = [];

        if ( JSON.parse(localStorage.getItem('students'))) {
          allStudents = JSON.parse(localStorage.getItem('students'));
        }

        allStudents.push(categoryTable);
        localStorage.setItem('students', JSON.stringify(allStudents));

        form.reset();

        addToTable();
      }
    });
  }

  // Функция, осуществляющая валидацию
  const formFavidate = () => {
    const inputs = document.querySelectorAll('.input');
    const inputDate = document.getElementById('birthDate');
    const limitDate = '1900-01-01';
    // Текущая дата
    const actualDate = new Date().toISOString().slice(0, 10);
    const inputYear = document.getElementById('startYear');
    const actualYear = actualDate.slice(0, 4);
    // Подсчет ошибок
    let error;

    // Проверка заполненности полей ввода
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value.trim()) {
        changeError(inputs[i], 'Пожалуйста, не оставляйте поле пустым');
        error++;
      } else {
        changeError(inputs[i], '');
        error = 0;
      }
    }

    // Проверка даты рождения
    if (inputDate.value < limitDate || inputDate.value > actualDate) {
      changeError(inputDate, 'Дата рождения должна находиться в диапазоне от 01.01.1900 до текущей даты', 'error-label--top');
      error++;
    } else {
      changeError(inputDate, '');
      error = 0;
    }

    // Проверка года поступления
    if (inputYear.value.length !== 4) {
      changeError(inputYear, 'Количество символов должно быть равно 4', 'emptyClass', 'error-label--top');
      error++;
    } else if (inputYear.value < 2000 || inputYear.value > actualYear) {
      changeError(inputYear, 'Год начала обучения должен находиться в диапазоне от 2000-го до текущего года', 'error-label--top', 'emptyClass');
      error++;
    } else {
      changeError(inputYear, '');
      error = 0;
    }

    return error;
  }

  // Функция, осуществляющая сортировку
  const sortName = () => {
    const columns = document.querySelectorAll('.column-head');
    let students = JSON.parse(localStorage.getItem('students'));

    // Сортировка по ФИО по возрастанию
    columns[0].addEventListener('click', function() {
      students.sort((prev, next) => {
        if (prev.fullName < next.fullName) return -1;
        if (prev.fullName > next.fullName) return 1;
      })
      addToTable(students);
    });

    // Сортировка по факультету по возрастанию
    columns[1].addEventListener('click', function() {
      students.sort((prev, next) => {
        if (prev.faculty < next.faculty) return -1;
        if (prev.faculty > next.faculty) return 1;
      })
      addToTable(students);
    });

    // Сортировка по дате рождения по возрастанию
    columns[2].addEventListener('click', function() {
      students.sort((next, prev) => prev.age.slice(0, 10).replace(".", "").replace(".", "").split('').reverse().join('') - next.age.slice(0, 10).replace(".", "").replace(".", "").split('').reverse().join(''));
      addToTable(students);
    });

    // Сортировка по году начала обучения
    columns[3].addEventListener('click', function() {
      students.sort((prev, next) => prev.duration.slice(0, 4) - next.duration.slice(0, 4));
      addToTable(students);
    });
  }

  // Функция, осуществляющая поиск по подстроке
  const search = () => {
    let students = JSON.parse(localStorage.getItem('students'));
    const searchName = document.getElementById('searchName');
    const searchFaculty = document.getElementById('searchFaculty');
    const searchBirthDate = document.getElementById('searchBirthDate');
    const searchStartYear = document.getElementById('searchStartYear');

    // Поиск по имени
    searchName.addEventListener('input', function() {
      let names = students.filter(function(student) {
        return student.fullName.toLowerCase().includes(searchName.value.toLowerCase());
      })
      addToTable(names);
    })

    // Поиск по факультету
    searchFaculty.addEventListener('input', function() {
      let names = students.filter(function(student) {
        return student.faculty.toLowerCase().includes(searchFaculty.value.toLowerCase());
      })
      addToTable(names);
    })

    // Поиск по дате рождения
    searchBirthDate.addEventListener('input', function() {
      let names = students.filter(function(student) {
        // Преобразование даты рождения в нужный формат
        const birthYear = `${searchBirthDate.value.slice(0, 4)}`;
        const birthMonth = `${searchBirthDate.value.slice(5, 7)}`;
        const birthDay = `${searchBirthDate.value.slice(8, 10)}`;
        const day = `${birthDay}.${birthMonth}.${birthYear}`;

        return student.age.slice(0, 10) === day;
      })
      addToTable(names);
    })

    // Поиск по дате поступления
    searchStartYear.addEventListener('input', function() {
      let names = students.filter(function(student) {
        return student.duration.slice(0, 4) === searchStartYear.value.slice(0, 4);
      })
      addToTable(names);
    })
  }

  // Функция, изменяющая информацию об ошибках
  const changeError = (input, text, addClass = 'emptyСlass', removeClass = 'emptyСlass') => {
    const label = input.parentNode.querySelector('.error-label');
    label.textContent = text;
    label.classList.add(addClass);
    label.classList.remove(removeClass);
  }

  document.addEventListener('DOMContentLoaded', function () {
    createDOM();
    formSubmit();
    addToTable();
    sortName();
    search();
  })

})();
