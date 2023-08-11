let str = '2023-08-11';
let parts = str.split('-');
let year = parseInt(parts[0]);
let month = parseInt(parts[1], 10) - 1;
let day = parseInt(parts[2], 10)

const date= new Date('2023-08-14');

console.log(date.getDay());