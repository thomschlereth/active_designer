$(document).ready(function() {
  class Errors {

  }


    // function warningAlert(msg) {
    //   $('.alert-bar').prepend(
    //     "<div class='alert alert-warning' role='alert'>" +
    //       "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
    //         "<span aria-hidden='true'>&times;</span>" +
    //       "</button>" +
    //       msg +
    //     "</div>"
    //   )
    // };
  Error.prototype.faliureAlert = function () {
    
  // };
    // function faliureAlert(msg) {
      $('.alert-bar').prepend(
        "<div class='alert alert-danger' role='alert'>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
            "<span aria-hidden='true'>&times;</span>" +
          "</button>" +
          msg +
        "</div>"
      )
    };

  module.exports = Errors;
});
