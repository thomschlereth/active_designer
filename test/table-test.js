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
    Table.collection = {};
    Column.collection = {};
    Column.idTracker = 101;
    Table.idTracker = 101;
  });

  describe('all()', function() {

    it('should return all Tables', function() {
      let tableOpts1 = { originalName: "users", name: "users", columns: [], references: [], status: { new: false, original: true, modified: false, deleted: false } }
      let tableOpts2 = { originalName: "messages", name: "messages", columns: [], references: [], status: { new: false, original: true, modified: false, deleted: false } }
      let table1 = new Table(tableOpts1)
      let table2 = new Table(tableOpts2)

      assert.deepEqual([table1,table2],Table.all());
    });

    it('should not include Tables that status.deleted equal true', function() {
      let tableOpts1 = { originalName: "users", name: "users", columns: [], references: [], status: { new: false, original: true, modified: false, deleted: false } }
      let tableOpts2 = { originalName: "messages", name: "messages", columns: [], references: [], status: { new: false, original: true, modified: false, deleted: false } }
      let tableOpts3 = { originalName: "table", name: "table", columns: [], references: [], status: { new: false, original: true, modified: false, deleted: true } }
      let table1 = new Table(tableOpts1)
      let table2 = new Table(tableOpts2)
      let table3 = new Table(tableOpts3)

      assert.deepEqual([table1,table2],Table.all());
    });

    it('should return empty array if no Tables', function() {
      assert.deepEqual([],Table.all());
    });


  });

  describe("find()", function() {
    it("should find and return correct column by it's id", function() {
      let tableOpts1 = { originalName: "users", name: "users", columns: [], references: [], status: { new: false, original: true, modified: false, deleted: false } }
      let tableOpts2 = { originalName: "messages", name: "messages", columns: [], references: [], status: { new: false, original: true, modified: false, deleted: false } }
      let table1 = new Table(tableOpts1)
      let table2 = new Table(tableOpts2)
      assert.deepEqual(table2, Table.find(102));
    });

    it("should not be able to find column that is deleted", function() {
      let tableOpts1 = { originalName: "users", name: "users", columns: [], references: [], status: { new: false, original: true, modified: false, deleted: true } }
      let table1 = new Table(tableOpts1)
      // Table.delete(101)
      assert.deepEqual(false, Table.find(101));
    });

    it("should return false if column can't be found", function() {
      assert.deepEqual(false, Table.find(101));
    });

  });

});
