const assert = require('assert');
const Column = require('../lib/active_designer/public/js/schema/column.js')

describe("Column", function() {

  before(() => {
    let $ = jQuery = require('jquery');
    global.$ = $;
  });

  afterEach(function() {
    Column.collection = {};
  });

  describe("#all()", function() {

    it("should return array containing all columns", function() {
      let options1 = {id: 1, originalName: "username", name: "name", type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, originalName: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);

      let expected = [column1,column2];
      assert.deepEqual(expected, Column.all());
    });

    it("should not contain columns that have deleted status", function() {
      let options1 = {id: 1, originalName: "username", name: "name", type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, originalName: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let options3 = {id: 3, originalName: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);
      let column3 = new Column(options3);
      Column.delete(3)
      let expected = [column1,column2];
      assert.deepEqual(expected, Column.all());
    });

    it("should return empty array when there are no columns", function() {
      assert.deepEqual([], Column.all());
    });

  });

  describe("find()", function() {
    it("should find and return correct column by it's id", function() {
      let options1 = {id: 1, originalName: "username", name: "name", type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, originalName: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);
      assert.deepEqual(column2, Column.find(2));
    });

    it("should not be able to find column that is deleted", function() {
      let options1 = {id: 1, originalName: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      Column.delete(1)
      assert.deepEqual(false, Column.find(1));
    });

    it("should return false if column can't be found", function() {
      assert.deepEqual(false, Column.find(1));
    });

  });

  describe("findBy()", function() {
    it("should find and return correct column when passed param, name, and it's value", function() {
      let options1 = {id: 1, originalName: "username", name: "name", type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, originalName: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);
      assert.deepEqual([column1], Column.findBy("name", "name"));
    });

    it("should find and return correct column when passed param, originalName, and it's value", function() {
      let options1 = {id: 1, original_name: "username", name: "name", type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, original_name: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);
      assert.deepEqual([column1], Column.findBy("originalName", "username"));
    });

    it("shouldn't find correct column when passed param, 'originalName' if all columns, 'originalName' are set to false", function() {
      let options1 = {id: 1, name: "name", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);
      assert.deepEqual(false, Column.findBy("originalName", false));
    });

    it("should find and return correct column when passed param, type, and it's value", function() {
      let options1 = {id: 1, original_name: "username", name: "name", type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, original_name: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);
      assert.deepEqual([column1], Column.findBy("type", "integer"));
    });

    it("should find and return correct column when passed param, originalType, and it's value", function() {
      let options1 = {id: 1, original_name: "username", name: "name", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, original_name: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);
      assert.deepEqual([column1], Column.findBy("originalType", "integer"));
    });

    it("shouldn't find correct column when passed param, 'originalType' if all columns, 'originalType' are set to false", function() {
      let options1 = {id: 1, original_name: "username", name: "name", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, original_name: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);
      assert.deepEqual(false, Column.findBy("originalType", false));
    });

    it("should find and return correct column when passed param, 'id' and it's value", function() {
      let options1 = {id: 1, original_name: "username", name: "name", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, original_name: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);
      assert.deepEqual([column1], Column.findBy("id", 1));
    });

    it("should return false if param is 'status'", function() {
      let options1 = {id: 1, original_name: "username", name: "name", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, original_name: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);
      assert.deepEqual(false, Column.findBy("status", options1.status));
    });

    it("should return false if column can't be found", function() {
      assert.deepEqual([], Column.findBy("name","name"));
    });

    it("should return false if param is invalid", function() {
      let options1 = {id: 1, original_name: "username", name: "name", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, original_name: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);
      assert.deepEqual([], Column.findBy("goop","name"));
    });

  });

  describe("findByFullStatus()", function() {
    it("should return collection of columns that matches complete 'status' object", function() {
      let options1 = {id: 1, original_name: "username", name: "name", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, original_name: "password", name: "password", type: "string", status: { new: false, original: true, modified: true, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);
      assert.deepEqual([column1,column2], Column.findByFullStatus(column1.status));
    });
  });

  describe("findByStatus()", function() {
    it("should return collection of columns that matches specific 'status' type", function() {
      let options1 = {id: 1, original_name: "username", name: "name", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, original_name: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let column1 = new Column(options1);
      let column2 = new Column(options2);
      assert.deepEqual([column2], Column.findByStatus("modified",column2.status.modified));
    });

    it("should return false if boolean isn't boolean", function() {
      assert.equal(false, Column.findByStatus("original","name"));
    });

    it("should return false if statusType isn't one of four types", function() {
      assert.equal(false, Column.findByStatus("original",true));
    });

  });

  describe("update()", function() {
    it("should find column by id and update it with given params", function() {
      let options1 = {id: 1, original_name: "usernam", name: "usernam", type: "integer", original_type: "integer", status: { new: false, original: true, modified: false, deleted: false } };
      let options2 = {name: "username", type: "integer" };
      new Column(options1);
      let column = Column.find(1)
      assert.deepEqual("usernam", column.name);
      assert.deepEqual("usernam", column.originalName);
      assert.deepEqual("integer", column.type);
      assert.deepEqual(true, column.status.original);
      assert.deepEqual(false, column.status.modified);

      Column.update(1,options2)

      assert.deepEqual("usernam", column.originalName);
      assert.deepEqual("username", column.name);
      assert.deepEqual("integer", column.type);
      assert.deepEqual("integer", column.originalType);
      assert.deepEqual(true, column.status.original);
      assert.deepEqual(true, column.status.modified);
    });

    it("should update modifed status to false if update reverts column to original", function() {
      let options1 = {id: 1, original_name: "username", name: "name", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {name: "username", type: "integer" };
      new Column(options1);
      let column = Column.find(1)
      assert.deepEqual("name", column.name);
      assert.deepEqual("integer", column.type);
      assert.deepEqual(true, column.status.original);
      assert.deepEqual(true, column.status.modified);

      Column.update(1,options2)

      assert.deepEqual("username", column.name);
      assert.deepEqual("username", column.originalName);
      assert.deepEqual("integer", column.type);
      assert.deepEqual("integer", column.originalType);
      assert.deepEqual(true, column.status.original);
      assert.deepEqual(false, column.status.modified);
    });

    it("should return false if it can't find column by id", function() {
      let options2 = {name: "username", type: "integer" };

      assert.equal(false,Column.update(2,options2))
    });

  });

  describe("updateBy()", function() {
    it("should find columns by param and update them and status.modified should equal true", function() {
      let options1 = {id: 1, original_name: "username", name: "username", type: "integer", original_type: "integer", status: { new: false, original: true, modified: false, deleted: false } };
      let options2 = {id: 2, original_name: "username", name: "username", type: "integer", original_type: "integer", status: { new: false, original: true, modified: false, deleted: false } };
      let options3 = {name: "name" };
      new Column(options1);
      new Column(options2);
      let column1 = Column.find(1)
      let column2 = Column.find(2)

      assert.equal("username", column1.name);
      assert.equal("username", column1.originalName);
      assert.equal(true, column1.status.original);
      assert.equal(false, column1.status.modified);

      assert.equal("username", column2.name);
      assert.equal("username", column2.originalName);
      assert.equal(true, column2.status.original);
      assert.equal(false, column2.status.modified);

      assert.deepEqual([column1,column2],Column.updateBy("name","username",options3));

      assert.equal("name", column1.name);
      assert.equal("username", column1.originalName);
      assert.equal(true, column1.status.original);
      assert.equal(true, column1.status.modified);

      assert.equal("name", column2.name);
      assert.equal("username", column2.originalName);
      assert.equal(true, column2.status.original);
      assert.equal(true, column2.status.modified);
    });

    it("should find columns by param and update them and status.modified should equal false", function() {
      let options1 = {id: 1, original_name: "username", name: "usernam", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options2 = {id: 2, original_name: "username", name: "usernam", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let options3 = { name: "username" };
      new Column(options1);
      new Column(options2);
      let column1 = Column.find(1);
      let column2 = Column.find(2);

      assert.equal("usernam", column1.name);
      assert.equal("username", column1.originalName);
      assert.equal(true, column1.status.original);
      assert.equal(true, column1.status.modified);

      assert.equal("usernam", column2.name);
      assert.equal("username", column2.originalName);
      assert.equal(true, column2.status.original);
      assert.equal(true, column2.status.modified);

      assert.deepEqual([column1,column2],Column.updateBy("name","usernam",options3));

      assert.equal("username", column1.name);
      assert.equal("username", column1.originalName);
      assert.equal(true, column1.status.original);
      assert.equal(false, column1.status.modified);

      assert.equal("username", column2.name);
      assert.equal("username", column2.originalName);
      assert.equal(true, column2.status.original);
      assert.equal(false, column2.status.modified);
    });

    it("should return false if it can't find columns by param and value", function() {
      let options2 = {name: "username", type: "integer" };

      assert.equal(false,Column.update(2,options2))
    });
  });

  describe("delete()", function() {
    it("should find column and set values status.deleted to true", function() {
      let options1 = {id: 1, original_name: "username", name: "usernam", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };

      new Column(options1);
      let column1 = Column.find(1)
      assert.equal(false, column1.status.deleted);
      Column.delete(1)
      assert.equal(true, column1.status.deleted);
    });

    it("should return false if it can't find column by id", function() {
      assert.equal(false,Column.delete(1))
    });

  });

  describe("statusUpdate()", function() {

    it("should update status.modifed to true if original when name or types differ from original", function() {
      let column1 = {id: 1, originalName: "username", name: "usernam", type: "integer", originalType: "integer", status: { new: false, original: true, modified: false, deleted: false } };
      let column2 = {id: 2, originalName: "username", name: "username", type: "integer", originalType: "string", status: { new: false, original: true, modified: false, deleted: false } };
      let status = { new: false, original: true, modified: true, deleted: false }

      assert.equal(false, column1.status.modified);
      assert.equal(false, column2.status.modified);
      assert.deepEqual(status, Column.statusUpdate(column1));
      assert.deepEqual(status, Column.statusUpdate(column2));
      assert.equal(true, column1.status.modified);
      assert.equal(true, column2.status.modified);

    });

    it("should update status.modifed to false if original when name or types are same as original", function() {
      let column1 = {id: 1, originalName: "username", name: "username", type: "integer", originalType: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      let status = { new: false, original: true, modified: false, deleted: false }

      assert.equal(true, column1.status.modified);
      assert.deepEqual(status, Column.statusUpdate(column1));
      assert.equal(false, column1.status.modified);
    });

    it("should return false if column.status.original is false", function() {
      let column1 = {id: 1, originalName: "username", name: "username", type: "integer", originalType: "integer", status: { new: true, original: false, modified: true, deleted: false } };
      assert.equal(false,Column.statusUpdate(column1))
    });

  });

  describe("statusUpdate()", function() {

    it("should update status.modifed to true if original when name or types differ from original", function() {
      let options1 = {id: 1, original_name: "username", name: "usernam", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
      new Column(options1);
      let column1 = Column.find(1)
      assert.deepEqual([], column1.table());
    });

  });

});
