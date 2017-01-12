function editColumnName(){
  $('body').unbind('click')
  $('.column-title').click(function() {
    if (openEditChecker()) { return }
    $(this).popover('hide');
    this.outerHTML = "<form><input class='column-form' type='text' name='tableName' value='" + this.innerText + "'></form>";
    enterKeypressColumn()
    clickOutsideColumnKeypress()
  });
}

function enterKeypressColumn() {
  $('.column-form').keypress(function (e) {
    var key = e.which;
    if(key == 13) {
      updateColumnName()
      return false;
    }
  });
}

function updateColumnName() {
  let columnName = $('.column-form')[0].value;
  $('.column-form')[0].parentElement.outerHTML =
  "<span class='column-title' data-toggle='popover' data-trigger='hover' data-content='Edit column name'>" + columnName.toLowerCase() + "</span>"
  $('[data-toggle="popover"]').popover()
  editColumnName()
}

function clickOutsideColumnKeypress() {
  $('body').click(function() {
    if($(event.target).is('span.column-title')) { return }
    if(!$(event.target).is('.column-form')) {
      updateColumnName()
    }
  });
}

function editTypeName(columnType){
  $('.tag-pill').click(function() {
    if ($('input').length === 0) {
      $(this).popover('hide');
      $('body').append(
        "<form><input class='type-form' type='hidden' value='placeholder'></form>"
      )
      this.outerHTML =
      "<div class='dropdown open float-xs-left'>" +
        "<div class='btn btn-default btn-xs dropdown-toggle' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
          columnType +
        "</div>" +
        "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>" +
          "<div class='dropdown-item'>integer</div>" +
          "<div class='dropdown-item'>decimal</div>" +
          "<div class='dropdown-item'>text</div>" +
          "<div class='dropdown-item'>ref</div>" +
        "</div>" +
      "</div>"
      setTimeout(cont,10)
      function cont() {
        $("#dropdownMenuButton").dropdown("toggle")
      }
      $('.dropdown-item').click(function() {
        let typeName = this.innerText;
        this.parentElement.parentElement.outerHTML =
        // "<span class='tag active-type tag-default tag-pill float-xs-left' data-toggle='popover' data-trigger='hover' data-content='Edit type'>" + typeName + "</span>"
        "<span class='tag tag-default tag-pill float-xs-left' data-toggle='popover' data-trigger='hover' data-content='Edit type'>" + typeName + "</span>"
        $('[data-toggle="popover"]').popover()
        $('input')[0].outerHTML = ""
        editTypeName(columnType)
      });
    }
  });
}

function columnHTML(columnObj) {
  return "" +
    `<li class='list-group-item' id='${columnObj.id}'>` +
    "<div class='twe'>" +
      columnTypeHTML(columnObj.type) +
      `<span class='column-title' data-toggle='popover' data-trigger='hover' data-content='Edit column name'>${columnObj.name}</span>` +
    "<div>" +
    "</li>"
}

function columnTypeHTML(columnType) {
  if (columnType === "type") {
    return `<span class='tag tag-danger tag-pill float-xs-left' data-toggle='popover' data-trigger='hover' data-content='Edit type'>${columnType}</span>`
  } else {
    return `<span class='tag tag-default tag-pill float-xs-left' data-toggle='popover' data-trigger='hover' data-content='Edit type'>${columnType}</span>`
  }
}
