
  let name = 'Иван';

  // Измененное имя - это когда первая буква имени с Верхним регистром, а все кроме первой с Нижним регистром
  let modified_name = `${name[0].toUpperCase()}` + `${name.slice(1).toLowerCase()}`;

  let subname = 'Иванов';

  // Измененная фамилия - это когда первая буква фамилии с Верхним регистром, а все кроме первой с Нижним регистром
  let modified_subname = `${subname[0].toUpperCase()}` + `${subname.slice(1).toLowerCase()}`;

  ((modified_subname === subname)&&(modified_name === name))?alert('Имя осталось без изменений'):alert('Имя было изменено');
