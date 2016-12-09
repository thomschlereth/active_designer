$(document).ready(function() {

  $('.fa-print').click(function() {
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
        "<p>CREATE DATEBASE " + database + "</p>" +
        tables + ";" +
      "</div>"
    )
  });
})
