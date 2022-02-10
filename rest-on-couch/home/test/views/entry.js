'use strict';

module.exports = {
  entryByIdWithOwner: {
    map: function (doc) {
      if (doc.$type !== 'entry') return;
      emitWithOwner(doc.$id, null);
    },
    withOwner: true,
  },
  entryByOwnersAndKind: {
    map: function (doc) {
      if (doc.$type === 'entry') {
        emitWithOwner(doc.$kind);
      }
    },
    reduce: '_count',
    withOwner: true,
  },
};
