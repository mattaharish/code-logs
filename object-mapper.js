const om = require('object-mapper');

const event = {
  gender: null,
  dob: null
};

const mapTo = {
  gender: 'profile.gender',
  dob: 'profile.dob'
};

console.log(om(event, mapTo));

// const input = [
//   {
//     a: 1,
//     b: 2,
//   },
//   {
//     a: 5,
//     b: 7,
//   },
// ];

// const outputMapper = {
//   'data.userName.lastName1': 'x',
//   'data.userName.lastName2': 'y',
//   a: 'z',
// };

// const output = om(input, outputMapper);

// // console.log(output);

// const arr = {
//   users: [
//     {
//       name: 'Matta',
//       age: 24,
//     },
//     {
//       name: 'Harish',
//       age: 24,
//     },
//   ],
//   logs: [{nam: 'lg1'}, {name: 'lg2'}],
// };

// const arrMapper = {
//   'users[]': {
//     key: 'names[]+',
//     transform: (val) => {
//       // console.log(val);
//       return val.map((v) => v.name);
//     },
//   },
//   logs: {
//     key: 'logs[]',
//     transform: (val) => {
//       console.log(val);
//       return {name: val.name};
//     },
//   },
// };

// console.log(om(arr, arrMapper));

// const customInfo = {
//   acceptTermsConditions: true,
//   brandNewsLetter: 1,
//   offerSms: 1,
//   receiptHomeDelivery: 1,
// };

// const mapDomainToCorePreferences = {
//   'customInfo.offerSms': {
//     key: 'preferences[]+',
//     transform: (val) => {
//       return {
//         name: 'offerSms',
//         values: [val],
//         description: 'to receive messages with offers and news on cell phone.',
//         group: 'subscriptions',
//         type: 'boolean',
//       };
//     },
//   },
//   'customInfo.receiptHomeDelivery': {
//     key: 'preferences[]+',
//     transform: (val) => {
//       return {
//         name: 'receiptHomeDelivery',
//         values: [val],
//         type: 'boolean',
//       };
//     },
//   },
//   'customInfo.brandNewsLetter': {
//     key: 'preferences[]+',
//     transform: (val) => {
//       return {
//         name: 'brandNewsLetter',
//         values: [val],
//         type: 'boolean',
//         description:
//           'to receive news and opportunities from Falabella brands and companies related to Holding.',
//         group: 'subscriptions',
//       };
//     },
//   },
//   'customInfo.addCMR': {
//     key: 'preferences[]+',
//     transform: (val) => {
//       return {
//         name: 'addCMR',
//         values: [val],
//         type: 'boolean',
//       };
//     },
//   },
// };

// console.log(om({customInfo}, mapDomainToCorePreferences));
