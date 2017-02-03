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
    let columnIDs = Object.keys(Column.collection)
    let columns = []
    for (var i = 0; i < columnIDs.length; i++) {
      let column = Column.find(columnIDs[i])
      if (column) {
        columns.push(column);
      }
    }
    return columns;
  }

  static find(id) {
    if (Column.collection[id] && !Column.collection[id].status.deleted) {
      return Column.collection[id];
    } else {
      return false;
    }
  }

  static findBy(param,value) {
    if (value === false || param === "status") return false;
    let columns = Column.all();
    let collection = [];
    for (var i = 0; i < columns.length; i++) {
      if (columns[i][param] === value) {
        collection.push(columns[i]);
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
    Column.statusUpdate(column)
    return column
  }

  static updateBy(param,value,params) {
    let columns = Column.findBy(param,value);
    if (columns.length < 1) return false;
    let keys = Object.keys(params);
    for (let index = 0; index < columns.length; index++) {
      for (let i = 0; i < keys.length; i++) {
        if (typeof(columns[index][keys[i]]) !== "undefined") {
          columns[index][keys[i]] = params[keys[i]];
          Column.statusUpdate(columns[index])
        }
      }
    }

    return columns
  }

  static delete(id) {
    let column = Column.find(id);
    if (!column) return false;
    column.status.deleted = true;
    return column;
  }

  static statusUpdate(column) {
    if (column.status.original) {
      if (column.originalName === column.name && column.originalType === column.type) {
        column.status.modified = false;
      } else {
        column.status.modified = true;
      }
      return column.status
    }
    return false
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

module.exports = Column;
