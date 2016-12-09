$(document).ready(function() {
  $('.fa-plus-square-o').click(function(){
    if ($('input').length > 0) {
      return
    }
    let rows = $('.container-fluid').children()
    for (let i = 0;i < rows.length; i++) {
      if (rows[i] === rows[rows.length -1] && rows[rows.length -1].children.length === 4) {
        $('.container-fluid').append('<div class="row"></div>')
        doStuff($('.container-fluid').children().last())
        return
      } else if (rows[i].children.length < 4) {
        doStuff(rows[i])
        return
      }
    }
    function doStuff(ple) {
      $(ple).append(

        "<div class='col-sm-3'>" +
          "<div class='card'>" +
            "<div class='card-header'>" +
              "<h4 class='card-title table-title' data-toggle='popover' data-trigger='hover' data-content='Edit table name'>" +
                "table name" +
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

      );
      destroyTable()
      addColumn()
      editTableName()
      $('[data-toggle="popover"]').popover()
    }
  })

  function destroyTable(){
    $('.fa-trash').unbind('click')
    $('.fa-trash').click(function() {
      if ($('input').length === 0) {
        $(this).popover('dispose');
        $(this).parents('.col-sm-3')[0].outerHTML = ""
      }
    });
  }

  function editTableName(){
    $('body').unbind('click')
    $('.table-title').click(function() {
      if ($('input').length === 0) {
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
      }
    });

  }

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

  function editTypeName(){
    $('.tag-pill').click(function() {
      if ($('input').length === 0) {
        $(this).popover('hide');
        $('body').append(
          "<form><input class='type-form' type='hidden' value='placeholder'></form>"
        )

        this.outerHTML =
        "<div class='dropdown open float-xs-right'>" +
          "<div class='btn btn-default btn-xs dropdown-toggle' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
            "type" +
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
          editTypeName()
        });
      }
    });
  }

  function addColumn(){
    $('.fa-plus-square').unbind('click')
    $('.fa-plus-square').click(function() {
      if ($('input').length === 0) {
        $(this).parents('.card').find('.list-group').append(
          "<li class='list-group-item'>" +
          "<span class='tag tag-danger tag-pill float-xs-right' data-toggle='popover' data-trigger='hover' data-content='Edit type'>Type</span>" +
          "<span class='column-title' data-toggle='popover' data-trigger='hover' data-content='Edit column name'>column</span>" +
          "</li>"
        );
        $('[data-toggle="popover"]').popover()
        editColumnName()
        editTypeName()
      }
    });
  }

  $(function () {
    $('[data-toggle="popover"]').popover()
  })

});
