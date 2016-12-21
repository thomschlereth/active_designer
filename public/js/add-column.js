function editColumnName(){
  $('body').unbind('click')
  $('.column-title').click(function() {
    if ($('input').length === 0) {
      $(this).popover('hide');
      this.outerHTML = "<form><input class='column-form' type='text' name='tableName' value='" + this.innerText + "'></form>";

      $('.column-form').keypress(function (e) {
        var key = e.which;
        if(key == 13) {
          let columnName = $('.column-form')[0].value;
          this.parentElement.outerHTML =
          "<span class='column-title' data-toggle='popover' data-trigger='hover' data-content='Edit column name'>" + columnName + "</span>"
          $('[data-toggle="popover"]').popover()
          count = 0
          editColumnName()
          return false;
        }
      });

      let count = 0
      $('body').click(function() {
        if(!$(event.target).is('.column-form') && count >= 1 ) {
          let columnName = $('.column-form')[0].value;

          $('.column-form')[0].parentElement.outerHTML =
          "<span class='column-title' data-toggle='popover' data-trigger='hover' data-content='Edit column name'>" + columnName.toLowerCase() + "</span>"
          $('[data-toggle="popover"]').popover()
          count = 0
          editColumnName()
        }
        count++

      });
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
      "<div class='dropdown open float-xs-right'>" +
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
        "<span class='tag tag-default tag-pill float-xs-right' data-toggle='popover' data-trigger='hover' data-content='Edit type'>" + typeName + "</span>"
        $('[data-toggle="popover"]').popover()
        $('input')[0].outerHTML = ""
        editTypeName(columnType)
      });
    }
  });
}

function addColumn(card, columnName, columnType) {
  card.find('.list-group').append(
    "<li class='list-group-item'>" +
    columnTypeHTML(columnType) +
    `<span class='column-title' data-toggle='popover' data-trigger='hover' data-content='Edit column name'>${columnName}</span>` +
    "</li>"
  );
  $('[data-toggle="popover"]').popover()
  editColumnName()
  editTypeName(columnType)
}

function columnTypeHTML(columnType) {
  if (columnType === "type") {
    return `<span class='tag tag-danger tag-pill float-xs-right' data-toggle='popover' data-trigger='hover' data-content='Edit type'>${columnType}</span>`
  } else {
    return `<span class='tag tag-default tag-pill float-xs-right' data-toggle='popover' data-trigger='hover' data-content='Edit type'>${columnType}</span>`
  }
}
