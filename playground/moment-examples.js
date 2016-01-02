var moment = require('moment');
var now = moment();



// now.subtract(1, 'year');

// console.log(now.format());
// console.log(now.format('X'));
// console.log(now.valueOf());
// console.log(now.format('MMM Do YYYY, hh:mma'));

var timestamp = 1451741714233;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('h:mma'));