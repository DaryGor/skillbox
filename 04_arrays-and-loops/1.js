// Задание
// Напишите генератор массивов длиной count со случайными числами от n до m.
// Учтите, что n и m могут быть отрицательными, а также может быть n > m или n < m.
// Выведите результат с помощью console.log.

// В массиве должно быть count-элементов. Он должен содержать числа от n до m.

// Для начала берем генератор случайных чисел в заданном диапозоне.

let n = 2;
let m = 5;

let arr = [];

let count = 50;


// Требуется написать функцию, которая будет вычислять числа в заданном диапозоне и добавлять их в массив до тех пор
// пока его длина не доcтигнет count

for (let i = 0; i < count; i++) {
  let max = Math.max(m,n);
  let min = Math.min(m,n);

  let q = Math.trunc(Math.random()*(max-min+1)+min);

  arr.push(q);
}

console.log (arr);


// либо через цикл while

let n = 100;
let m = -5;
let arr = [];
let count = 70;
let i = 0;

while (i < count) {
  i++;
  let max = Math.max(m,n);
  let min = Math.min(m,n);
  let q = Math.trunc(Math.random()*(max-min+1)+min);
  arr.push(q);
}

console.log (arr);

// Другого решения не нашла, с циклом for мне показалось удобнее всего
