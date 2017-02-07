function tableHTML(tableName,tableX,tableY) {
  return `<div class='card' id='tbl-${newTableID}' style='top:${tableY}px;left:${tableX}px;'>` +
    "<div class='card-header'>" +
      '<i class="fa fa-arrows" aria-hidden="true"></i>' +
      "<h4 class='card-title table-title' data-toggle='popover' data-trigger='hover' data-content='Edit table name'>" +
        `${tableName}` +
      "</h4>" +
      "<div class='table-nav-buttons'>" +
        "<i class='fa fa-plus-square' data-toggle='popover' data-trigger='hover' data-content='Add column'></i>" +
        "<i class='fa fa-trash delete-table' data-toggle='popover' data-trigger='hover' data-content='Destroy table'></i>" +
      "</div>" +
    "</div>" +
    "<div class='card-block'>" +
      "<ul class='list-group'>" +
        `<li class='list-group-item' id='tbl-${newTableID}-id-column' >` +
          "<span class='tag tag-default float-xs-left type-span'>integer</span>" +
          "<div class='column-title-outer' >" +
            "<span class='column-title' >id</span>" +
          "</div>" +
        "</li>" +
      "</ul>" +
    "</div>" +
  "</div>"
};
