const {Machine, interpret, assign} = require('xstate');

const states = {
  pending: {
    on: {
      resolve: 'atgLoginSuccessful',
    },
  },
  atgLoginSuccessful: {
    on: {
      resolve: 'getUserFromCore',
    },
  },
  getUserFromCore: {
    invoke: {
      id: 'InvokeGetUserFromCore',
      src: (context, event) => getUserFromCore(context.userId),
      onDone: {
        target: 'createUserInCIAM',
        actions: [
          assign({
            coreUser: (context, event) => {
              console.log('promise-event: ', event);
              return event.data;
            },
          }),
        ],
      },
      onError: {
        target: 'returnATGLoginResponse',
        actions: assign({error: (context, event) => event.data}),
      },
    },
  },
  createUserInCIAM: {
    invoke: {
      id: 'InvokeCreateUserInCIAM',
      src: (context, event) => getUserFromCore(context.userId),
      onDone: {
        target: 'updateUserInCore',
        actions: [
          assign({
            ciamUser: (context, event) => {
              console.log('promise-event: ', event);
              return event.data;
            },
          }),
        ],
      },
      onError: {
        target: 'returnATGLoginResponse',
        actions: assign({error: (context, event) => event.data}),
      },
    },
  },
  updateUserInCore: {
    invoke: {
      id: 'InvokeUpdateUserInCore',
      src: (context, event) => getUserFromCore(context.userId),
      onDone: {
        target: 'getTokensFromCIAM',
        actions: [
          assign({
            updatedUser: (context, event) => {
              console.log('promise-event: ', event);
              return event.data;
            },
          }),
        ],
      },
      onError: {
        target: 'returnATGLoginResponse',
        actions: assign({error: (context, event) => event.data}),
      },
    },
  },
  getTokensFromCIAM: {
    invoke: {
      id: 'InvokeGetTokensFromCIAM',
      src: (context, event) => getUserFromCore(context.userId),
      onDone: {
        target: 'createSession',
        actions: [
          assign({
            createdSession: (context, event) => {
              console.log('promise-event: ', event);
              return event.data;
            },
          }),
        ],
      },
      onError: {
        target: 'returnATGLoginResponse',
        actions: assign({error: (context, event) => event.data}),
      },
    },
  },
  createSession: {
    invoke: {
      id: 'InvokeCreateSession',
      src: (context, event) => getUserFromCore(context.userId),
      onDone: {
        target: 'getTokensFromCIAM',
        actions: [
          assign({
            updatedUser: (context, event) => {
              console.log('promise-event: ', event);
              return event.data;
            },
          }),
        ],
      },
      onError: {
        target: 'returnATGLoginResponse',
        actions: assign({error: (context, event) => event.data}),
      },
    },
  },

  returnCiamResponse: {
    type: 'final',
  },
  returnLegacyLoginResponse: {
    type: 'final',
  },
};

const machine = Machine({
  id: 'migration',
  initial: 'pending',
  context: {
    fastify: 'fastify',
    request: 'request',
    reply: 'reply',
  },
  states,
});

const service = interpret(machine).onTransition((state) => {
  console.log('Transition -->', state.value);
});

service.start();

// console.log(service.initialState.actions);

service.send('resolve');

service.send('resolve');

// service.send('resolve', {name: 'Matta Harish Kumar'});

// service.send('resolve');

// service.send('resolve');

// console.log(service.context);
