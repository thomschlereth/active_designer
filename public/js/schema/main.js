$(document).ready(function() {

  function createSchemaFromParams() {
    setCardDraggable($('.card'))
    schema = JSON.parse($('schema').text())
    addListeners()
  }

  function addTableByClick(tableName) {
    zoom = 1;
    window.setZoom(zoom,null,null,$('#foo')[0]);
    $('.slider').css({left: 5});
    $('.canvasBorder').click(function(event) {
      $('.canvasBorder').unbind('click');
      let coords = findTargetCoord();
      let card = $(`#tbl-${newTableID}`);
      $('.jsPlumbBoundary').append(tableHTML(tableName,coords.x,coords.y));
      setCursorAfterBoundaryClick();
      setCardDraggable(card);
      addListeners();
      addEmptyTableToSchema();
      newTableID += 1;
    });
  }

  function findTargetCoord() {
    let target = $(event.target)
    let offset = target.position()
    return { x: event.clientX - offset.left,
             y: event.clientY - offset.top}
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
  }

  createSchemaFromParams()

});
