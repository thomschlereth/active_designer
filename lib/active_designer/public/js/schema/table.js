// const Coordinates = require('./table-coordinates.js');

class Table {

  constructor(options) {
    let id = Table.idTracker
    this.id           = id;
    this.name         = options.name;
    this.originalName = options.originalName;
    this.columns      = options.columns;
    this.references   = options.references;
    this.status       = options.status;
    // let coords      = new Coordinates();
    // this.coords     = { x: coords.x, y: coords.y}
    Table.collection[id] = this;
    Table.idTracker++;
  }

  tableHTML() {
    return `<div class='card' id='tbl-${this.id}' style='top:${this.coords.y}px;left:${this.coords.x}px;'>` +
      "<div class='card-header'>" +
        '<i class="fa fa-arrows" aria-hidden="true"></i>' +
        "<h4 class='card-title table-title' data-toggle='popover' data-trigger='hover' data-content='Edit table name'>" +
          `${this.name}` +
        "</h4>" +
        "<div class='table-nav-buttons'>" +
          "<i class='fa fa-plus-square' data-toggle='popover' data-trigger='hover' data-content='Add column'></i>" +
          "<i class='fa fa-trash' data-toggle='popover' data-trigger='hover' data-content='Destroy table'></i>" +
        "</div>" +
      "</div>" +
      "<div class='card-block'>" +
        "<ul class='list-group'>" +
          `<li class='list-group-item' id='tbl-${this.id}-id-column' >` +
            "<span class='tag tag-default float-xs-left type-span'>integer</span>" +
            "<div class='column-title-outer' >" +
              "<span class='column-title' >id</span>" +
            "</div>" +
          "</li>" +
        "</ul>" +
      "</div>" +
    "</div>"
  }

  static all() {
    let tableIDs = Object.keys(Table.collection)
    let tables = []
    for (let i = 0; i < tableIDs.length; i++) {
      let table = Table.find(tableIDs[i])
      if (table) {
        tables.push(table);
      }
    }
    return tables;
  }

  static find(id) {
    if (Table.collection[id] && !Table.collection[id].status.deleted) {
      return Table.collection[id];
    } else {
      return false;
    }
  }

  static findBy(param,value) {
    if (value === false || param === "status") return false;
    let tables = Table.all();
    let collection = [];
    for (let i = 0; i < tables.length; i++) {
      if (tables[i][param] === value) {
        collection.push(tables[i]);
      }
    }
    return collection;
  }

}

Table.collection = {};
Table.idTracker = 101;

module.exports = Table;
// let opts1 = { id: 1, name: "trees", columns: {}, references: {}, status: {} }
// let opts2 = { id: 1, name: "users", columns: {}, references: {}, status: {} }
// let table1 = new Table(opts1);
// $('body').append(table1.tableHTML())
//
// let table2 = new Table(opts2);
// $('body').append(table2.tableHTML())
