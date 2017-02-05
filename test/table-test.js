const assert = require('assert');
const jsdom = require('jsdom');
const Column = require('../lib/active_designer/public/js/schema/column.js');
const Table = require('../lib/active_designer/public/js/schema/table.js');
let window = jsdom.jsdom().defaultView;
$ = require("jquery")(window);

describe("Table", function() {

  beforeEach(function() {
  });

  afterEach(function() {
    Table.collection = {};
    Column.collection = {};
    Column.idTracker = 101;
    Table.idTracker = 101;
    $('body').text('')
  });

  it('should create a Table with all the correct attributes and an original status', function() {
    let tableOpts1 = { original_name: "users", name: "users", original_status: true }
    let table = new Table(tableOpts1)

    assert.equal(101,table.id);
    assert.equal("tbl-101",table.htmlID);
    assert.equal("users",table.name);
    assert.equal("users",table.originalName);
    assert.deepEqual([],table.columns);
    assert.deepEqual([],table.references);
    assert.equal(true,table.originalStatus);
    assert.equal(false,table.modified);
    assert.equal(false,table.deleted);
    assert.deepEqual({x: 10, y: 10},table.coords);
  });

  it('should create Tables with incrementing ids and coordinates', function() {
    let tableOpts1 = { original_name: "users", name: "users", original_status: true }
    let tableOpts2 = { original_name: "user", name: "user", original_status: true }
    let table1 = new Table(tableOpts1)
    $('body').append(table1.html())
    let table2 = new Table(tableOpts2)

    assert.equal(101,table1.id);
    assert.equal("tbl-101",table1.htmlID);
    assert.deepEqual({x: 10, y: 10},table1.coords);
    assert.equal(102,table2.id);
    assert.equal("tbl-102",table2.htmlID);
    assert.deepEqual({x: 285, y: 10},table2.coords);
  });

  it('should not create Tables with the same name or original_name', function() {
    let tableOpts1 = { original_name: "users", name: "users", original_status: true };
    let tableOpts2 = { original_name: "users", name: "user", original_status: true };
    let tableOpts3 = { original_name: "user", name: "users", original_status: true };
    let table = new Table(tableOpts1);

    assert.deepEqual({},new Table(tableOpts2));
    assert.deepEqual({},new Table(tableOpts3));
    assert.deepEqual([table],Table.all());
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
      let tableOpts1 = { original_name: "users", name: "users", original_status: true };
      let tableOpts2 = { original_name: "messages", name: "messages", original_status: true };
      let tableOpts3 = { original_name: "fields", name: "fields", original_status: true };
      let table1 = new Table(tableOpts1)
      let table2 = new Table(tableOpts2)
      let table3 = new Table(tableOpts3)
      Table.delete(103)

      assert.deepEqual([table1,table2],Table.all());
    });

    it('should return empty array if no Tables', function() {
      assert.deepEqual([],Table.all());
    });

  });

  describe("find()", function() {
    it("should find and return correct table by it's id", function() {
      let tableOpts1 = { original_name: "users", name: "users", original_status: true };
      let tableOpts2 = { original_name: "messages", name: "messages", original_status: true };
      let table1 = new Table(tableOpts1)
      let table2 = new Table(tableOpts2)

      assert.deepEqual(table2, Table.find(102));
    });

    it("should not be able to find table that is deleted", function() {
      let tableOpts1 = { original_name: "users", name: "users", original_status: true };
      let table1 = new Table(tableOpts1)
      Table.delete(101)

      assert.deepEqual(false, Table.find(101));
    });

    it("should return false if table can't be found", function() {
      assert.deepEqual(false, Table.find(101));
    });

  });

  describe("findBy()", function() {

    it("should find and return correct table when passed param, name, and it's value", function() {
      let tableOpts1 = { original_name: "users", name: "users", original_status: true };
      let table1 = new Table(tableOpts1)

      assert.deepEqual([table1], Table.findBy("name", "users"));
    });

    it("should find and return correct table when passed param, originalName, and it's value", function() {
      let tableOpts1 = { original_name: "users", name: "users", original_status: true };
      let table1 = new Table(tableOpts1)

      assert.deepEqual([table1], Table.findBy("originalName", "users"));
    });

    it("shouldn't find correct table when passed param, 'originalName' if all columns, 'originalName' are set to false", function() {
      let tableOpts1 = { original_name: "users", name: "users", original_status: true };
      let table = new Table(tableOpts1);

      assert.deepEqual(false, Table.findBy("originalName", false));
    });

    it("should find and return correct table when passed param, 'id' and it's value", function() {
      let tableOpts1 = { original_name: "users", name: "users", original_status: true };
      let table1 = new Table(tableOpts1);

      assert.deepEqual([table1], Table.findBy("id", table1.id));
    });

    it("should return false if param is 'status'", function() {
      let tableOpts1 = { original_name: "users", name: "users", original_status: true };
      let table = new Table(tableOpts1);

      assert.deepEqual(false, Table.findBy("status", table.status));
    });

    it("should return false if table can't be found", function() {
      assert.deepEqual([], Table.findBy("name","name"));
    });

    it("should return false if param is invalid", function() {
      let tableOpts1 = { original_name: "users", name: "users", original_status: true };
      let table1 = new Table(tableOpts1);

      assert.deepEqual([], Table.findBy("goop","name"));
    });

  });

  describe("delete()", function() {
    it("should find table and set status.deleted to true", function() {
      let tableOpts1 = { original_name: "users", name: "users", original_status: true };
      let table1 = new Table(tableOpts1);

      assert.equal(false, table1.deleted);
      Table.delete(101)
      assert.equal(true, table1.deleted);
    });

    it("should return false if it can't find table by id", function() {
      assert.equal(false,Table.delete(101))
    });
  });


});
