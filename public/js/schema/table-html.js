function tableHTML(tableName,tableX,tableY) {
  return "" +
  `<div class='card' style='top:${tableY}px;left:${tableX}px;'>` +
    "<div class='card-header'>" +
      '<i class="fa fa-link" aria-hidden="true"></i>' +
      "<h4 class='card-title table-title' data-toggle='popover' data-trigger='hover' data-content='Edit table name'>" +
        `${tableName}` +
      "</h4>" +
      "<div class='trashcan'>" +
        "<i class='fa fa-trash' data-toggle='popover' data-trigger='hover' data-content='Destroy table'></i>" +
      "</div>" +
      '<i class="fa fa-magic" aria-hidden="true"></i>' +
    "</div>" +
    "<div class='card-block'>" +
      "<ul class='list-group'>" +
      "</ul>" +
    "</div>" +
    "<div class='card-footer'>" +
      '<i class="fa fa-arrows" aria-hidden="true"></i>' +
      "<i class='fa fa-plus-square' data-toggle='popover' data-trigger='hover' data-content='Add column'></i>" +
    "</div>" +
  "</div>"
};
