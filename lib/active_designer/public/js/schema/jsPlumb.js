let zoom = .7;

let connections = {}

let j = jsPlumb.getInstance({
  Container:"foo"
});

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
      $('.slider').css({left: position});
      zoom = zoom + .05;
      window.setZoom(zoom,null,null,$('#foo')[0]);
    }
  })
});

function setCardDraggable(card) {
  jsPlumb.draggable(card, {filter:':not(.fa-arrows)'});
}

function createConnector(source,target,tableID) {
  let conn = jsPlumb.connect({
    source:source,
    target:target,
    anchors:[["Continuous", { faces: ["left", "right"] }],["Continuous", { faces: ["left", "right"] }]],
    endpoint:["Dot", { radius: 2}],
    paintStyle: { strokeWidth:5, stroke:'#D9D9DA' },
    detachable: false,
    maxConnections:-1
  });
  if (connections[tableID]) {
    connections[tableID].push(conn)
  } else {
    connections[tableID] = [conn]
  }
}
