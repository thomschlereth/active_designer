const assert = require('assert');
const Column = require('../lib/active_designer/public/js/schema/column.js')
const Table = require('../lib/active_designer/public/js/schema/table.js')

describe("Table", function() {

  before(() => {
    let $ = jQuery = require('jquery');
    global.$ = $;
  });

  beforeEach(function() {
  });

  afterEach(function() {
    Column.collection = {};
    Column.idTracker = 101;
    Table.idTracker = 101;
  });

  describe('all()', function() {

    it('should return all Tables', function() {
      let tableOpts1 = {name: "messages", columns: {}, references: {}, status: {} }
      let tableOpts2 = {name: "users", columns: {}, references: {}, status: {} }
      new Table(tableOpts1)
      new Table(tableOpts2)

    });
  });
});
