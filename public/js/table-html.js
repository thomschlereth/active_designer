function tableHTML(tableName) {
  return "" +
  "<div class='col-sm-3'>" +
    "<div class='card'>" +
      "<div class='card-header'>" +
        "<h4 class='card-title table-title' data-toggle='popover' data-trigger='hover' data-content='Edit table name'>" +
          `${tableName}` +
        "</h4>" +
        "<div class='trashcan'>" +
          "<i class='fa fa-trash fa-2x' data-toggle='popover' data-trigger='hover' data-content='Destroy table'></i>" +
        "</div>" +
      "</div>" +
      "<div class='card-block'>" +
        "<ul class='list-group list-group-flush'>" +
        "</ul>" +
      "</div>" +
      "<div class='card-footer'>" +
        "<i class='fa fa-plus-square' data-toggle='popover' data-trigger='hover' data-content='Add column'></i>" +
      "</div>" +
    "</div>" +
  "</div>"
};
