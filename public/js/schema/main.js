$(document).ready(function() {

  function createSchemaFromParams() {
    setCardDraggable($('.card'))
    schema = JSON.parse($('schema').text())
    addListeners()
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
      setCardDraggable(card)
      addListeners()
      $('.canvasBorder').unbind('click')
      addEmptyTableToSchema()
    })
  }

  $('.fa-plus-square-o').click(function(){
    if (openEditChecker()) { return }
    setCursorBeforeBoundaryClick()
    addTableByClick("table_name")
  })

  function addEmptyTableToSchema() {
    tableID = `tbl-${newTableID}`;
    schema[tableID] = {
      name: "table_name",
      original_name: null,
      columns: {},
      references: [],
      status: "new",
      id: tableID
    };
    newTableID += 1;
  }

  createSchemaFromParams()

});
