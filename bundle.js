(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class TableCoordinates {

  constructor() {
    let tableHTML = $('.card');
    console.log(tableHTML.length)
    if (tableHTML.length > 0) {
      let prevX = this.findMaxCoord(tableHTML, "left");
      let prevY = this.findMaxCoord(tableHTML, "top");
      let newCoords = this.newCoordinates(prevX,prevY);
      this.x = newCoords.x;
      this.y = newCoords.y;
    } else {
      this.x = 10;
      this.y = 10;
    }
    console.log(this.x)
    console.log(this.y)
  }

  findMaxCoord(tableHTML,type) {
    let max = 0

    for(let i = 0; i < tableHTML.length; i++) {
      let num = parseInt($(tableHTML[i]).css(type).replace('px',''));
      if ( num > max)
      {
        max = num
      }
    }
    return max
  }


  newCoordinates(x,y) {
    if (x >= 650) {
      x = 10
      y = y + 300
    }
    else {
      x = x + 275
    }
    return {x: x, y: y}
  }

}

module.exports = TableCoordinates;

},{}],2:[function(require,module,exports){
const Coordinates = require('./table-coordinates.js');

class Table {

  constructor(options) {
    this.id         = options.id;
    this.name       = options.name;
    this.columns    = options.columns;
    this.references = options.references;
    this.status     = options.status;
    let coords      = new Coordinates();
    this.coords     = { x: coords.x, y: coords.y}
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
}

let opts1 = { id: 1, name: "trees", columns: {}, references: {}, status: {} }
let opts2 = { id: 1, name: "users", columns: {}, references: {}, status: {} }
let table1 = new Table(opts1);
$('body').append(table1.tableHTML())

let table2 = new Table(opts2);
$('body').append(table2.tableHTML())

},{"./table-coordinates.js":1}]},{},[2]);
