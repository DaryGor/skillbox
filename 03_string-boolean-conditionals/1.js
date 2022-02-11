// Что нужно сделать?
// Присвоить переменной строку
// Проверить сколько в строке символов.
// Проверить встречается ли в строке символ "-" либо "_".
// Вывести заключение о том, является ли пароль надёжным.

let password = "Пароль_";

if (password.length < 4) {
  // Проверка первого условия: длина строки с паролем должна быть длиннее четырех символов
  alert('Ваш пароль не надёжен. Пожалуйста, используйте большее количество символов.');
  // Если результат поиска внутри строки символа "_" равен "-1" (а именно такое значение выдает результат поиска через indexOf при отстутсивии совпадений), то
  // проверяем и второе условие - результат поиска внутри строки "-". Если ни одно из условий не выполняется - выводится ошибка.
  // Здесь если один из операторов внутри скобок вернёт false, а второй true, то результат сравнения внутри скобок вернет true, и результат сравнения вне скобок вернёт true - Символ найден, а значит пароль надёжный
  // Если же ни одно из условий не выполняется, то результат внутри скобок вернёт false, и результат вне скобок вернет false - условие не выполнено, пароль не надёжный
} else if ((password.indexOf('_') === -1 ) || (password.indexOf('-') === -1 ) === false ) {
  alert('В вашем пароле не хватает символов "_" либо "-"')
} else {
  alert('Отличный пароль!');
}
