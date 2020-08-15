const {Machine, interpret} = require('xstate');
const {getHeapStatistics} = require('v8');
const states = {
  pending: {
    on: {
      resolve: 'legacyLoginSuccessful',
    },
  },
  legacyLoginSuccessful: {
    on: {
      resolve: 'getUserFromNewSystem',
      reject: 'returnLegacyLoginResponse',
    },
  },
  getUserFromNewSystem: {
    entry: 'getUserFromNewSystem',
    on: {
      resolve: 'createUserInIAM',
      reject: 'returnLegacyLoginResponse',
    },
  },
  createUserInIAM: {
    on: {
      resolve: 'updateUserInNewSystem',
      reject: 'returnLegacyLoginResponse',
    },
  },
  updateUserInNewSystem: {
    on: {
      resolve: 'getTokensFromIAM',
      reject: 'returnLegacyLoginResponse',
    },
  },
  getTokensFromIAM: {
    on: {
      resolve: 'createSession',
      reject: 'returnLegacyLoginResponse',
    },
  },
  createSession: {
    on: {
      resolve: 'returnNewLoginResponse',
      reject: 'returnLegacyLoginResponse',
    },
  },
  returnNewLoginResponse: {
    type: 'final',
  },
  returnLegacyLoginResponse: {
    type: 'final',
  },
};

const actions = {
  getUserFromNewSystem: (context, event) => {
    // console.log('Came Here', event);
  },
};

const machine = Machine(
  {
    id: 'migration',
    initial: 'pending',
    states,
  },
  {actions}
);

const loop = 100;

const services = [];

for (let i = 0; i < loop; i++) {
  const service = interpret(machine).onTransition((state) => {
    // console.log(state.value);
    if (state.matches('returnNewLoginResponse')) {
      service.stop();
      // console.log('Stopping Service');
    }
  });
  service.start();
  services.push(service);
}

// service.start();

const heapUsed = [];
let timesRun = 0;
const interval = setInterval(() => {
  timesRun++;
  if (timesRun > 60) {
    console.log('Start : ', heapUsed[0]);
    console.log('End : ', heapUsed[heapUsed.length - 1]);
    console.log('Min : ', Math.min(...heapUsed));
    console.log('Max : ', Math.max(...heapUsed));
    clearInterval(interval);
  }
  console.log('Interval...');

  for (let i = 0; i < loop; i++) {
    // services[i].start();
    services[i].send('resolve');
  }
  // console.log(getHeapStatistics());
  // const used = process.memoryUsage().heapUsed / 1024 / 1024;
  const used = getHeapStatistics().used_heap_size / 1024 / 1024;
  // console.log(
  //   `The script uses approximately ${Math.round(used * 100) / 100} MB`
  // );
  heapUsed.push(used);
}, 1000);
