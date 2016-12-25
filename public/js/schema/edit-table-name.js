function editTableName(){
  $('body').unbind('click')
  $('.table-title').click(function() {

    if (openEditChecker()) { return }
    $(this).popover('hide');
    this.outerHTML = "<form><input class='table-form' type='text' name='tableName' value='" + this.innerText + "'></form>";
    $('.table-form').keypress(function (e) {
      var key = e.which;
      if(key == 13) {
        let tableName = $('.table-form')[0].value;
        this.parentElement.outerHTML =
          "<h4 class='card-title table-title' data-toggle='popover' data-trigger='hover' data-content='Edit table name'>" +
            tableName +
          "</h4>"
        $('[data-toggle="popover"]').popover()
        count = 0
        editTableName()
        return false;
      }
    });
    let count = 0
    $('body').click(function() {
      if(!$(event.target).is('.table-form') && count >= 1 ) {
        let tableName = $('.table-form')[0].value;
        $('.table-form')[0].parentElement.outerHTML =
          "<h4 class='card-title table-title' data-toggle='popover' data-trigger='hover' data-content='Edit table name'>" +
            tableName +
          "</h4>"
        $('[data-toggle="popover"]').popover()
        count = 0
        editTableName()
      }
      count++
    });
  });

}
