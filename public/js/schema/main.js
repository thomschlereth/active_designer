$(document).ready(function() {

  j = jsPlumb.getInstance({
    Container:"foo"
  });


  let tableCoordinates = {
    x: 100,
    y: 10
  };

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
      updateTableCoordinates()
      createStartColumns(table,tableName)
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
    $('.container-fluid').append(tableHTML(tableName,tableCoordinates.x,tableCoordinates.y))
    let index = $('.card').length
    jsPlumb.draggable($('.card')[index - 1])
    addListeners()
  }

  function addTableByClick(tableName) {
    if (openEditChecker()) { return }
    zoom = 1
    window.setZoom(zoom,null,null,$('#foo')[0])
    $('.slider').css({left: 5})
    $('.navbar').css({cursor: 'not-allowed'})
    $('body').css({cursor: 'not-allowed'})
    $('.btn').css({cursor: 'not-allowed'})
    $('.fa').css({cursor: 'not-allowed'})
    $('.jsPlumbBoundary').css({cursor: 'crosshair'})
    $('.canvasBorder').click(function(event) {
      $('.jsPlumbBoundary').css({cursor: 'auto'})
      $('.navbar').css({cursor: 'auto'})
      $('body').css({cursor: 'auto'})
      $('.btn').css({cursor: 'auto'})
      $('.fa').css({cursor: 'auto'})
      let target = $(event.target)
      let offset = target.position()
      var x = event.clientX - offset.left;
      var y = event.clientY - offset.top;
      $('.jsPlumbBoundary').append(tableHTML(tableName,x,y))
      let index = $('.card').length
      let card = $('.card')[index-1]
      setCardDraggable(j,card)
      addListeners()
      $('.canvasBorder').unbind('click')
    })
  }

  $('.fa-plus-square-o').click(function(){
    addTableByClick("table_name")
  })

  function destroyTable(){
    $('.fa-trash').unbind('click')
    $('.fa-trash').click(function() {
      if ($('input').length === 0) {
        $(this).popover('dispose');
        $(this).parents('.card')[0].outerHTML = ""
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

  function addReference(){
    $('.fa-magic').unbind('click')
    $('.fa-magic').click(function() {
      $('.fa-magic').unbind('click')
      if ($('input').length === 0) {
        let connectingLink = $($(this).parents('.card-header').children()[0])
        connectingLink.parents('.card').addClass('active-card')
        $('.jsPlumbBoundary').css({cursor: 'not-allowed'})
        $('.card:not(.active-card)').css({cursor: 'crosshair'})
        $('.card:not(.active-card)').click(function() {
          let connecteeCard = $(this);
          let tableTitle = connectingLink.parents('.card-header').children('.card-title')[0].innerText
          let column = columnHTML(connecteeCard,`${tableTitle}_id`,'reference')
          $('.card:not(.active-card)').unbind('click')
          $('.card:not(.active-card)').css({cursor: 'auto'})
          $('.jsPlumbBoundary').css({cursor: 'auto'})
          j.connect({
            source:connectingLink,
            target:column,
            anchors:["Center", "Continuous" ],
            endpoint:["Dot", { cssClass: 'hidden-anchor' }],
            paintStyle: { strokeWidth:4, stroke:'darkred' },
            detachable: false,
            maxConnections:-1
          });
          connectingLink.parents('.card').removeClass('active-card')
          addReference()
        })
      }
    });

  }

  function addListeners(){
    destroyTable()
    addReference()
    editTableName()
    addColumn()
    $('[data-toggle="popover"]').popover()
  }

  createTablesFromParams()
});
