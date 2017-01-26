function setCursorBeforeBoundaryClick() {
  $('.navbar').css({cursor: 'not-allowed'})
  $('body').css({cursor: 'not-allowed'})
  $('.btn').css({cursor: 'not-allowed'})
  $('.fa').css({cursor: 'not-allowed'})
  $('.jsPlumbBoundary').css({cursor: 'crosshair'})
}

function setCursorAfterBoundaryClick() {
  $('.navbar').css({cursor: 'auto'})
  $('body').css({cursor: 'auto'})
  $('.btn').css({cursor: 'auto'})
  $('.fa').css({cursor: 'auto'})
  $('.jsPlumbBoundary').css({cursor: 'auto'})
}
