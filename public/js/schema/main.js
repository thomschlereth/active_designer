$(document).ready(function() {
  j = jsPlumb.getInstance({
    Container:"foo"
  });

  function createSchemaFromParams() {
    if (location.href.includes("?schema=")) {
      let encodedParams = location.href.split('?')[1]
      let decodedParams = decodeURIComponent(encodedParams)
      if (decodedParams[decodedParams.length -1] === "#") {
        decodedParams = decodedParams.substr(0,decodedParams.length -1)
      }
      schema = JSON.parse(decodedParams.split('=')[1])
      createStartTablesFromSchema(schema)
    }
  }

  function addTableByClick(tableName) {
    zoom = 1
    window.setZoom(zoom,null,null,$('#foo')[0])
    $('.slider').css({left: 5})
    $('.canvasBorder').click(function(event) {
      setCursorAfterBoundaryClick()
      let target = $(event.target)
      let offset = target.position()
      var x = event.clientX - offset.left;
      var y = event.clientY - offset.top;
      $('.jsPlumbBoundary').append(tableHTML(tableName,x,y))
      let card = $('.card')[$('.card').length-1]
      setCardDraggable(j,card)
      addListeners()
      $('.canvasBorder').unbind('click')
    })
  }

  $('.fa-plus-square-o').click(function(){
    if (openEditChecker()) { return }
    setCursorBeforeBoundaryClick()
    addTableByClick("table_name")
    addEmptyTableToSchema()
  })

  function addEmptyTableToSchema() {
    schema.push({
      table_name: "table_name",
      columns: {},
      references: [],
      status: "new"
    })
  }

  createSchemaFromParams()
});
