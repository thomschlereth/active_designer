let zoom = .7;
let j = null;
// let j = jsPlumb.getInstance({
//   Container:"foo"
  // Detachable
// });

jsPlumb.ready(function() {
  let canvasLeft = 0
  let canvasTop = 0

  window.setZoom = function(zoom, instance, transformOrigin, el) {
    transformOrigin = transformOrigin || [ 0.5, 0.5 ];
    instance = instance || jsPlumb;
    el = el || instance.getContainer();
    var p = [ "webkit", "moz", "ms", "o" ],
        s = "scale(" + zoom + ")",
        oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

    for (var i = 0; i < p.length; i++) {
      el.style[p[i] + "Transform"] = s;
      el.style[p[i] + "TransformOrigin"] = oString;
    }

    el.style["transform"] = s;
    el.style["transformOrigin"] = oString;

    instance.setZoom(zoom);
  };

  window.setZoom(zoom,null,null,$('#foo')[0])

  $('#zoom-in').click(function() {
    if (zoom > .4) {
      let position = $('.slider').position().left + 10
      $('.slider').css({left: position})
      zoom = zoom - .05
      window.setZoom(zoom,null,null,$('#foo')[0])
    }
  })
  $('#zoom-out').click(function() {
    if (zoom < 1) {

      let position = $('.slider').position().left - 10;
      console.log(position)
      $('.slider').css({left: position});
      zoom = zoom + .05;
      window.setZoom(zoom,null,null,$('#foo')[0]);
    }
  })

});

// function addSourceToTable(j,card) {
//
//   j.addEndpoint(card, {
//     isSource:true,
//     anchor:"Center",
//     endpoint:["Dot", { radius:9, cssClass: 'hidden-anchor' }],
//     connectorStyle: { strokeWidth:4, stroke:'#4B5B75' },
//     connectorOverlays:[
//         [ "PlainArrow", { width:12, length:18, location:1 } ],
//       ],
//     maxConnections:3
//
//   });
// }
//
//
// function addReferenceReciever(j,card) {
//   j.addEndpoint(card, {
//     isTarget:true,
//     anchor:"Center",
//     endpoint:["Rectangle", { width: 100, height: 100 }],
//     maxConnections:3,
//   });
//
//   j.bind("beforeDrop", function(params) {
//     let currentCard = $(params.dropEndpoint.element)
//     let tableTitle = currentCard.children('.card-header').children('.card-title')[0].innerText
//     columnHTML(currentCard,`${tableTitle}_id`,'reference')
//     return true
//   });
// }
//
//
//
function setCardDraggable(j,card) {
  j.draggable(card, {filter:':not(.fa-arrows)'});
}
