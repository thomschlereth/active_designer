require('./table.js')

class Column {

  constructor(params) {
    Column.paramsValidator(params)
    let formattedParams = Column.formatParams(params);
    this.id = formattedParams.id;
    this.name = formattedParams.name;
    this.originalName = formattedParams.originalName;
    this.type = formattedParams.type;
    this.originalType = formattedParams.originalType;
    this.status = formattedParams.status;
    Column.collection[formattedParams.id] = this;
  }

  static all() {
    let columns = Object.keys(Column.collection).map(function(id) {
      return Column.collection[id];
    });
    return columns;
  }

  static find(id) {
    if (Column.collection[id]) {
      return Column.collection[id];
    } else {
      return false;
    }
  }

  static findBy(param,value) {
    if (value === false || param === "status") return false;
    let keys = Object.keys(Column.collection);
    let collection = [];
    for (var i = 0; i < keys.length; i++) {
      if (Column.collection[keys[i]][param] === value) {
        collection.push(Column.collection[keys[i]]);
      }
    }
    return collection;
  }

  static findByFullStatus(value) {
    let ids = Object.keys(Column.collection);
    let collection = [];
    if (typeof(value) === "object") value = JSON.stringify(value);
    for (var i = 0; i < ids.length; i++) {
      if (JSON.stringify(Column.collection[ids[i]].status) === value) {
        collection.push(Column.collection[ids[i]]);
      }
    }
    return collection;
  }

  static findByStatus(statusType, boolean) {
    if (boolean !== true && boolean !== false) return false;
    if (statusType !== "original" && statusType !== "new" && statusType !== "modified" && statusType !== "delete") return false;
    let ids = Object.keys(Column.collection);
    let collection = [];
    for (var i = 0; i < ids.length; i++) {
      if (Column.collection[ids[i]].status[statusType] === boolean) {
        collection.push(Column.collection[ids[i]]);
      }
    }
    return collection;
  }

  static update(id,params) {
    let column = Column.find(id);
    if (!column) return false;
    let keys = Object.keys(params);
    for (var i = 0; i < keys.length; i++) {
      if (typeof(column[keys[i]]) !== "undefined") {
        column[keys[i]] = params[keys[i]];
      }
    }
    if (column.status.original) {
      if (column.originalName === column.name && column.originalType === column.type) {
        column.status.modified = false;
      } else {
        column.status.modified = true;
      }
    }
    return column
  }

  static updateBy(param,value,params) {
    let column = Column.findBy(param,value);
    if (!column) return false;
    let keys = Object.keys(params);
    for (var i = 0; i < keys.length; i++) {
      if (typeof(column[keys[i]]) !== "undefined") {
        column[keys[i]] = params[keys[i]];
      }
    }
    return column
  }

  static delete(id) {
    let column = Column.find(id);
    if (!column) return false;
    column.status.deleted = true;
    return column;
  }

  static tableColumns(tableID) {
    let table = Table.find(tableID);
    return table.columns;
  }

  static paramsValidator(params) {
    if (Column.find(params.id)) {
      throw Error('"id" must be unique');
    } else if (typeof(params.id) === "undefined") {
      throw Error('ParamsError: "id" is required');
    } else {
      return true
    }
  }

  static formatParams(params) {

    if (typeof(params.name) === "undefined") {
      params.name = "column_name";
    }
    if (typeof(params.original_name) === "undefined") {
      params.originalName = false;
    } else {
      params.originalName = params.original_name
    }
    if (typeof(params.type) === "undefined") {
      params.type = "integer";
    }
    if (typeof(params.original_type) === "undefined") {
      params.originalType = false;
    } else {
      params.originalType = params.original_type
    }
    if (typeof(params.original_type) === "undefined") {
      params.original_type = false;
    }
    if (typeof(params.status) === "undefined") {
      params.status = { orignal: false, new: true, modified: false, deleted: false};
    }
    return params
  }

}

Column.collection = {};
// let options1 = {id: 1, original_name: "username", name: "name", type: "integer", original_type: "integer", status: { new: false, original: true, modified: true, deleted: false } };
// let options2 = {id: 2, original_name: "password", name: "password", type: "string", status: { new: false, original: true, modified: false, deleted: false } };
// let column1 = new Column(options1);
// let column2 = new Column(options2);


module.exports = Column;
