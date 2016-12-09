$(document).ready(function() {

  $('.fa-print').click(function() {
    if ( !errors() ) {
      let database = $('.navbar-brand')[0].innerText;
      let tableNames = $('.card-header')
      let tables = "";

      for (let i = 0; i < tableNames.length; i++) {
        tables = tables + "<p>CREATE TABLE " + tableNames[i].innerText + " (</p>"
        let columns = tableNames[i].parentElement.children[1]
        columnNames = $(columns).find('.column-title')
        columnTypes = $(columns).find('.tag-pill')
        for (let i = 0; i < columnNames.length; i++) {
          if (i + 1 === columnNames.length){
            tables = tables + "<p class='column-print-out'>" + columnNames[i].innerText + "\t\t" + columnTypes[i].innerText + "</p>"
          } else {
            tables = tables + "<p class='column-print-out'>" + columnNames[i].innerText + "\t\t" + columnTypes[i].innerText + ",</p>"
          }
        }
        tables = tables + "<p>)</p>"
      }

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

  function errors() {
    let titles = $(".card-title")
    let columns = $(".column-title")
    let goodTablePluralizaztion = true;
    let goodColumnPluralizaztion = true;

    for (let i = 0; i < titles.length; i++) {
      let title = titles[i].innerHTML
      if ( title[title.length -1] === 's' ) {
        goodTablePluralizaztion = false;
      }
    }

    for (let i = 0; i < columns.length; i++) {
      let column = columns[i].innerHTML
      if ( column[column.length -1] === 's' ) {
        goodColumnPluralizaztion = false;
      }
    }

    if ($(".tag-pill:contains('type')").length > 0) {

      $('.container-fluid').prepend(
        "<div class='alert alert-danger' role='alert'>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
            "<span aria-hidden='true'>&times;</span>" +
          "</button>" +
          "All column types must be selected!" +
        "</div>"
      )
      // return true
    }
    if (!goodTablePluralizaztion) {
      $('.container-fluid').prepend(
        "<div class='alert alert-warning' role='alert'>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
            "<span aria-hidden='true'>&times;</span>" +
          "</button>" +
          "Are you sure you want to pluralize that table name?" +
        "</div>"
      )
      // return false
    }
    if (!goodColumnPluralizaztion) {
      $('.container-fluid').prepend(
        "<div class='alert alert-warning' role='alert'>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
            "<span aria-hidden='true'>&times;</span>" +
          "</button>" +
          "Are you sure you want to pluralize that column name?" +
        "</div>"
      )
      // return false
    }
    return false
  };

  function closeTron() {
    $('.close-tron').click(function() {
      $('.jumbotron')[0].outerHTML = ""
    });
  }
})
