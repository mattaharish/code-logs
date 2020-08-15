const {Machine, interpret, assign} = require('xstate');

const timer = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({name: 'Harish Matta'}), 2000);
  });
};

const getUserFromNewSystem = async () => {
  const name = await timer();
  return name;
};

const actions = {
  getUserFromNewSystem: assign((context, event) => {
    console.log('Event...', event);
    console.log('Context...', context);
    return {...context, name: 'Context Assignment'};
  }),
};

const states = {
  pending: {
    on: {
      resolve: 'legacyLoginSuccessful',
    },
  },
  legacyLoginSuccessful: {
    on: {
      resolve: {
        target: 'getUserFromNewSystem',
        actions: ['getUserFromNewSystem'],
      },
      reject: 'returnLegacyLoginResponse',
    },
  },
  getUserFromNewSystem: {
    invoke: {
      id: 'InvokeGetUserFromNewSystem',
      src: (context, event) => getUserFromNewSystem(context.userId),
      onDone: {
        target: 'createUserInIAM',
        actions: [
          assign({
            user: (context, event) => {
              console.log('promise-event: ', event);
              return event.data;
            },
          }),
          'getUserFromNewSystem',
        ],
      },
      onError: {
        target: 'returnLegacyLoginResponse',
        // actions: assign({error: (context, event) => event.data}),
        actions: [
          (context, event) => {
            console.log('errrr', event.data);
            throw event.data;
          },
        ],
      },
    },
    // entry: 'getUserFromNewSystem',
    /**
     * * Important
     */
    // on: {
    //   resolve: {
    //     target: 'createUserInIAM',
    //     actions: ['getUserFromNewSystem'],
    //   },
    //   reject: 'returnLegacyLoginResponse',
    // },
  },
  createUserInIAM: {
    // entry: 'getUserFromNewSystem',
    on: {
      resolve: {
        target: 'updateUserInNewSystem',
        actions: ['getUserFromNewSystem'],
      },
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

const machine = Machine(
  {
    id: 'migration',
    initial: 'pending',
    context: {
      fastify: 'fastify',
      request: 'request',
      reply: 'reply',
    },
    states,
  },
  {actions}
);

const service = interpret(machine)
  .onTransition((state) => {
    console.log('Transition -->', state.value);
  })
  .onDone(() => console.log('Done!'))
  .start();

// console.log(service.initialState.actions);

service.send('resolve');

service.send('resolve');

// service.send('resolve', {name: 'Matta Harish Kumar'});

// service.send('resolve');

// service.send('resolve');

// console.log(service.context);

setTimeout(() => {
  // console.log(service.machine);
  service.send('resolve');
  service.send('resolve');
  service.send('resolve');
  service.send('resolve');
  service.send('resolve');
  service.stop();
  // console.log(service);
}, 3000);
