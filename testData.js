var test = {
    '0': {
        id: 0,
        name: 'Rastlina 1',
        type: null,
        relationships: {
            '1': 1,
            '2': -1
        }
      },
    '1': {
        id: 1,
        name: 'Rastlina 2',
        type: null,
        relationships: {
            '0': 1
        }
      },
    '3':  {
        id: 3,
        name: 'Rastlina 3',
        type: null,
        relationships: {
            '0': -1,
        }
      },    
    };

module.exports.test = test;