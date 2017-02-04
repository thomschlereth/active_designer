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
    it("should find and return correct table by it's id", function() {
      let tableOpts1 = { originalName: "users", name: "users", columns: [], references: [], status: { new: false, original: true, modified: false, deleted: false } }
      let tableOpts2 = { originalName: "messages", name: "messages", columns: [], references: [], status: { new: false, original: true, modified: false, deleted: false } }
      let table1 = new Table(tableOpts1)
      let table2 = new Table(tableOpts2)
      assert.deepEqual(table2, Table.find(102));
    });

    it("should not be able to find table that is deleted", function() {
      let tableOpts1 = { originalName: "users", name: "users", columns: [], references: [], status: { new: false, original: true, modified: false, deleted: true } }
      let table1 = new Table(tableOpts1)
      // Table.delete(101)
      assert.deepEqual(false, Table.find(101));
    });

    it("should return false if table can't be found", function() {
      assert.deepEqual(false, Table.find(101));
    });

  });

  describe("findBy()", function() {

    it("should find and return correct table when passed param, name, and it's value", function() {
      let tableOpts1 = { originalName: "users", name: "users", columns: [], references: [], status: { new: false, original: true, modified: false, deleted: false } }
      let table1 = new Table(tableOpts1)

      assert.deepEqual([table1], Table.findBy("name", "users"));
    });

    it("should find and return correct table when passed param, originalName, and it's value", function() {
      let tableOpts1 = { originalName: "users", name: "users", columns: [], references: [], status: { new: false, original: true, modified: false, deleted: false } }
      let table1 = new Table(tableOpts1)

      assert.deepEqual([table1], Table.findBy("originalName", "users"));
    });

    it("shouldn't find correct table when passed param, 'originalName' if all columns, 'originalName' are set to false", function() {
      let options1 = {table_id: "101", name: "name", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let table = new Table(options1);
      assert.deepEqual(false, Table.findBy("originalName", false));
    });

    it("should find and return correct table when passed param, 'id' and it's value", function() {
      let options1 = {table_id: "101", name: "name", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let table1 = new Table(options1);

      assert.deepEqual([table1], Table.findBy("id", table1.id));
    });

    it("should return false if param is 'status'", function() {
      let options1 = {table_id: "101", name: "name", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let table = new Table(options1);
      assert.deepEqual(false, Table.findBy("status", table.status));
    });

    it("should return false if table can't be found", function() {
      assert.deepEqual([], Table.findBy("name","name"));
    });

    it("should return false if param is invalid", function() {
      let options1 = {table_id: "101", original_name: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let table1 = new Table(options1);
      assert.deepEqual([], Table.findBy("goop","name"));
    });

  });


});
