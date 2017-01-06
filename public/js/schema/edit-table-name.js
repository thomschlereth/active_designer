
function editTableName(){
  $('body').unbind('click')
  $('.table-title').on('click',null,null,setupTableNameForm)
}

function setupTableNameForm(event) {
  if (openEditChecker()) { return }
  let originalTitle = this.innerText
  $(this).popover('hide');
  this.outerHTML = "<form><input class='table-form' type='text' name='tableName' value='" + this.innerText + "'></form>";
  addEditTableNameListeners(originalTitle)
  // addEditTableNameListeners(originalTitle)
}

function titleKeypressListener(e) {
  var key = e.which;
  if(key == 13) {
    let tableName = $('.table-form')[0].value;
    this.parentElement.outerHTML =
      "<h4 class='card-title table-title' data-toggle='popover' data-trigger='hover' data-content='Edit table name'>" +
        tableName +
      "</h4>"
    $('[data-toggle="popover"]').popover()
    if (e.data.originalTitle !== tableName) {
      for(i = 0;i < schema.length;i++) {
        if (schema[i].table_name === e.data.originalTitle) {
          schema[i].table_name = tableName
          schema[i].status = "modified"
        }
      }
    }

    editTableName()
    return false;
  }
}

function titleBodyClickListener(e) {
  if(!$(event.target).is('.table-form') && e.data.count >= 1 ) {
    let tableName = $('.table-form')[0].value;
    $('.table-form')[0].parentElement.outerHTML =
      "<h4 class='card-title table-title' data-toggle='popover' data-trigger='hover' data-content='Edit table name'>" +
        tableName +
      "</h4>"
    $('[data-toggle="popover"]').popover()
    if (e.data.originalTitle !== tableName) {
      for(i = 0;i < schema.length;i++) {
        if (schema[i].table_name === e.data.originalTitle) {
          schema[i].table_name = tableName
          schema[i].status = "modified"
        }
      }
    }
    editTableName()
  }
  e.data.count++
}

function addEditTableNameListeners(originalTitle) {
  $('.table-form').on('keypress', null, {originalTitle: originalTitle }, titleKeypressListener);
  $('body').on('click', null, {originalTitle: originalTitle,count: 0}, titleBodyClickListener);
}
