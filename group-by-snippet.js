const _ = require('lodash');

const data = [
  {
    status: 'fulfilled',
    value: {
      guid: '67484949-f04c-43f5-a1a0-16e430e7c70c',
    },
  },
  {
    status: 'fulfilled',
    value: {
      guid: '67484949-f04c-43f5-a1a0-16e430e7c70c',
    },
  },
  {
    status: 'rejected',
    value: {
      guid: '8d0c8439-05fa-478a-9ded-01c52d121f98',
    },
  },
];

const groupedByStatus = _.groupBy(data, 'status');

const settledGroups = _.mapValues(groupedByStatus, (group) =>
  group.map((settled) => settled.value.guid)
);

console.log(settledGroups);
