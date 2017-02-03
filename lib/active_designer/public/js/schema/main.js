$(document).ready(function() {

  function createSchemaFromParams() {
    setCardDraggable($('.card'));
    window.setZoom(zoom,null,null,$('#foo')[0]);
    addReferences();
    addListeners();
  }

  function addReferences() {
    let schema = getSchema();
    let refs = $("li[id^='ref-']");
    for(let i = 0; i < refs.length; i++) {
      let referenceID = refs[i].id;
      let tableIDNum = referenceID.split('-')[1];
      let tableID = `tbl-${tableIDNum}`;
      let tableObj = schema[tableID];
      let refObj = tableObj.references[referenceID];
      let foreignTableID = refObj.foreign_table_id;
      let foreignTableIDEl = $(`#${foreignTableID}-id-column`)[0];
      let refEl = refs[i];
      createConnector(refEl,foreignTableIDEl,tableID);
    }
    setSchema(schema);
  }

  function addTableByClick(tableName) {
    zoom = 1;
    window.setZoom(zoom,null,null,$('#foo')[0]);
    $('.slider').css({left: 5});
    $('.canvasBorder').click(function(event) {
      $('.canvasBorder').unbind('click');
      let coords = findTargetCoord();
      $('.jsPlumbBoundary').append(tableHTML(tableName,coords.x,coords.y));
      setCursorAfterBoundaryClick();
      setCardDraggable($(`#tbl-${newTableID}`));
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

  createSchemaFromParams()

});
