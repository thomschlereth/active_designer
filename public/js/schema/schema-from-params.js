let tableCoordinates = {
  x: 100,
  y: 10
};

function createStartTablesFromSchema(schema) {
  for(let i = 0;i < schema.length;i++) {
    let tableName = schema[i].table_name
    let table = schema[i]
    addTableToDOM(tableName)
    updateTableCoordinates()
    createStartColumnsFromSchema(table,tableName)
  }
}

function updateTableCoordinates() {
  if (tableCoordinates.x >= 850) {
    tableCoordinates.x = 100;
    tableCoordinates.y = tableCoordinates.y + 300;
  }
  else {
    tableCoordinates.x = tableCoordinates.x + 275;
  }
}

function createStartColumnsFromSchema(table,tableName) {
  let columns = Object.keys(table.columns)

  let card = $('.card').filter(function() {
    return $(this).find('.table-title').text() === tableName
  })

  for(let i = 0;i < columns.length;i++) {
    let columnName = columns[i]
    let columnType = table.columns[columnName]
    columnHTML(card, columnName, columnType)
  }
}

function addTableToDOM(tableName) {
  if (openEditChecker()) { return }
  $('.container-fluid').append(tableHTML(tableName,tableCoordinates.x,tableCoordinates.y))
  let index = $('.card').length
  jsPlumb.draggable($('.card')[index - 1])
  addListeners()
}
