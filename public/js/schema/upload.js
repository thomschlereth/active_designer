$(document).ready(function() {

  $('.fa-print').click(function() {
    if ( !errors() ) {
      let database = $('.navbar-brand')[0].innerText;
      let tableNames = $('.card-header')
      let tables = createTables();

      $('body').append(
        "<div class='jumbotron'>" +
          "<button type='button' class='close close-tron' data-dismiss='alert' aria-label='Close'>" +
            "<span aria-hidden='true'>&times;</span>" +
          "</button>" +
          "<p>CREATE DATEBASE " + database + "</p>" +
          tables + ";" +
        "</div>"
      )
      closeTron()
    }
  });

  function createTables() {
    let tables = "";
    let tableNames = $('.card-header')

    for (let i = 0; i < tableNames.length; i++) {
      let columns = tableNames[i].parentElement.children[1]

      tables = tables + "<p>CREATE TABLE " + tableNames[i].innerText + " (</p>"
      tables = addColumInfo(tables,columns)
      tables = tables + "<p>)</p>"
    }
    return tables
  }

  function addColumInfo(tables,columns) {
    let columnNames = $(columns).find('.column-title')
    let columnTypes = $(columns).find('.tag-pill')

    for (let i = 0; i < columnNames.length; i++) {
      if (i + 1 === columnNames.length){
        tables = tables + "<p class='column-print-out'>" + columnNames[i].innerText + "\t\t" + columnTypes[i].innerText + "</p>"
      } else {
        tables = tables + "<p class='column-print-out'>" + columnNames[i].innerText + "\t\t" + columnTypes[i].innerText + ",</p>"
      }
    }
    return tables;
  };

  function errors() {
    let fail = false
    let tablePluralizaztion = pluralizationChecker($(".card-title"));
    let columnPluralizaztion = pluralizationChecker($(".column-title"));

    if ($(".tag-pill:contains('type')").length > 0) {
      let msg = "All column types must be selected!"
      // error.faliureAlert(msg)
      failureAlert(msg)
      fail = true
    }
    if (tablePluralizaztion) {
      let msg = "Are you sure you want to pluralize that table name?"
      warningAlert(msg)
    }
    if (columnPluralizaztion) {
      let msg = "Are you sure you want to pluralize that column name?"
      warningAlert(msg)
    }
    return fail
  };

  function closeTron() {
    $('.close-tron').click(function() {
      $('.jumbotron')[0].outerHTML = ""
    });
  };

  function warningAlert(msg) {
    $('.alert-bar').prepend(
      "<div class='alert alert-warning' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
          "<span aria-hidden='true'>&times;</span>" +
        "</button>" +
        msg +
      "</div>"
    )
  };

  function failureAlert(msg) {
    $('.alert-bar').prepend(
      "<div class='alert alert-danger' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
          "<span aria-hidden='true'>&times;</span>" +
        "</button>" +
        msg +
      "</div>"
    )
  };

  function pluralizationChecker(things) {
    let pluralized = false;
    for (let i = 0; i < things.length; i++) {
      let thing = things[i].innerHTML;
      if ( thing[thing.length -1] === 's' ) {
        pluralized = true;
      }
    }
    return pluralized;
  };

})
