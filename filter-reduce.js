const data = [
  {
    status: 'fulfilled',
    value: {
      data: null,
      error: {
        _code: 502,
        _errorName: 'DOWNSTREAM_SERVICE_NETWORK_ERROR',
        _errors: [
          {
            message:
              'API service encountered a Network Error while transacting with a Downstream system',
            code: 'DOWNSTREAM_SERVICE_NETWORK_ERROR'
          }
        ]
      }
    }
  },
  {
    status: 'fulfilled',
    value: {
      data: null,
      error: {
        _code: 502,
        _errorName: 'DOWNSTREAM_SERVICE_NETWORK_ERROR',
        _errors: [
          {
            message:
              'API service encountered a Network Error while transacting with a Downstream system',
            code: 'DOWNSTREAM_SERVICE_NETWORK_ERROR'
          }
        ]
      }
    }
  },
  {
    status: 'fulfilled',
    value: {
      data: null,
      error: {
        _code: 502,
        _errorName: 'DOWNSTREAM_SERVICE_NETWORK_ERROR',
        _errors: [
          {
            message:
              'API service encountered a Network Error while transacting with a Downstream system',
            code: 'DOWNSTREAM_SERVICE_NETWORK_ERROR'
          }
        ]
      }
    }
  },
  {
    status: 'fulfilled',
    value: {
      data: null,
      error: {
        _code: 502,
        _errorName: 'DOWNSTREAM_SERVICE_NETWORK_ERROR',
        _errors: [
          {
            message:
              'API service encountered a Network Error while transacting with a Downstream system',
            code: 'DOWNSTREAM_SERVICE_NETWORK_ERROR'
          }
        ]
      }
    }
  },
  {
    status: 'fulfilled',
    value: {
      data: null,
      error: null
    }
  }
];

const reduced = data
  .filter((p) => p.value.error)
  .reduce((acc, p) => {
    if (p.value.error) return acc.concat({ ...p, name: 'Matta' });
  }, []);

console.log(reduced);
