$(document).ready(function() {

  $('.submit').click(function() {
    let text = $('textarea#schema-text').val()
    postParams = {
      string: text
    }

    $.ajax({
      url: "/schema.json",
      method: "POST",
      dataType: "json",
      data: postParams,
      success: function(data) {
        console.log(data)
        schema = JSON.stringify(data)
        window.location.replace(`/new?schema=${schema}`)
      },
      error: function(data) {
        alert("couldn't create that link")
      },
    })

  });
});
