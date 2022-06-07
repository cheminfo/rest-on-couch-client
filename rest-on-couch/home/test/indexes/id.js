'use strict';

module.exports = {
  id: {
    index: {
      fields: [
        {
          '\\$id': 'asc',
        },
      ],
    },
    type: 'json',
    ddoc: 'idIndex',
  },
};
