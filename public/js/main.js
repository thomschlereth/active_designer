$(document).ready(function() {

  function createTablesFromParams() {
    if (location.href.includes("?schema=")) {
      let encodedParams = location.href.split('?')[1]
      let decodedParams = decodeURIComponent(encodedParams)
      let schema = JSON.parse(decodedParams.split('=')[1])
      createStartTables(schema)
    }
  }

  function createStartTables(schema) {
    let tableNames = Object.keys(schema.tables)
    for(let i = 0;i < tableNames.length;i++) {
      let tableName = tableNames[i]
      let table = schema.tables[tableName]
      addTable(tableName)
      createStartColumns(table,tableName)
    }
  }

  function createStartColumns(table,tableName) {

    let columns = Object.keys(table.columns)

    let tableHTML = $('.table-title').filter(function() {
      return $(this).text() === tableName
    })
    let card = tableHTML.parents('.card')

    for(let i = 0;i < columns.length;i++) {
      let columnName = columns[i]
      let columnType = table.columns[columnName]
      columnHTML(card, columnName, columnType)
    }
  }

  function addTable(tableName) {
    if (openEditChecker()) { return }
    let rows = $('.container-fluid').children()
    for (let i = 0;i < rows.length; i++) {
      if (rows[i] === rows[rows.length -1] && rows[rows.length -1].children.length === 4) {
        $('.container-fluid').append('<div class="row"></div>')
        $($('.container-fluid').children().last()).append(tableHTML(tableName))
        break;
      } else if (rows[i].children.length < 4) {
        $(rows[i]).append(tableHTML(tableName))
        break;
      }
    }
    addListeners()
  }

  $('.fa-plus-square-o').click(function(){
    addTable("table_name")
  })

  function destroyTable(){
    $('.fa-trash').unbind('click')
    $('.fa-trash').click(function() {
      if ($('input').length === 0) {
        $(this).popover('dispose');
        $(this).parents('.col-sm-3')[0].outerHTML = ""
      }
    });
  }

  function addColumn() {
    $('.fa-plus-square').unbind('click')
    $('.fa-plus-square').click(function() {
      if (openEditChecker()) { return }
      let card = $(this).parents('.card')
      columnHTML(card, "column", "type")
    });
  }

  function addListeners(){
    destroyTable()
    editTableName()
    addColumn()
    $('[data-toggle="popover"]').popover()
  }

  createTablesFromParams()
});
