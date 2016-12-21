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

  // function linedraw(ax,ay,bx,by) {
  //   if(ay>by) {
  //     bx=ax+bx;
  //     ax=bx-ax;
  //     bx=bx-ax;
  //     by=ay+by;
  //     ay=by-ay;
  //     by=by-ay;
  //   }
  //
  //   var calc=Math.atan((ay-by)/(bx-ax));
  //   calc=calc*180/Math.PI;
  //   var length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
  //   document.body.innerHTML += "<div id='line' style='height:" + length + "px;width:1px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc  + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>"
  //
  // }
  //
  // linedraw(0,0,100,100)

});
