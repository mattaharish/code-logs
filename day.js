const dayjs = require('dayjs');

const date1 = dayjs();
const date2 = dayjs('2020-05-30T16:13:06.251Z');

console.log(`ISO Formatted -> ${date1.toISOString()}`);
console.log(`Year -> ${date1.get('year')}`);
console.log(`Month -> ${date1.get('month')}`);
console.log(`Date -> 4{date1.get('date')}`);
console.log(`Hour -> ${date1.get('hour')}`);
console.log(`Minute -> ${date1.get('minute')}`);
console.log(`Second -> ${date1.get('second')}`);

console.log(`Adding 1 Day -> ${date1.add(1, 'day').toISOString()}`);
console.log(`Subtracting 1 Day -> ${date1.subtract(1, 'day').toISOString()}`);
console.log(`EOD -> ${date1.endOf('d').toISOString()}`);

console.log(date2.isBefore(date1));
console.log(date2.isAfter(date1));
