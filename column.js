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
    if (value === false || param === "status") return false
    let keys = Object.keys(Column.collection);
    for (var i = 0; i < keys.length; i++) {
      if (Column.collection[keys[i]][param] === value) {
        return Column.collection[keys[i]];
      }
    }
    return false;
  }

  static update(id,params) {
    let column = Column.find(id);
    if (!column) return false;
    let keys = Object.keys(params);
    for (var i = 0; i < keys.length; i++) {
      if (typeof(column[keys[i]]) !== "undefined") {
        column[keys[i]] = params[keys[i]];
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
        column.status.modified = true
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
