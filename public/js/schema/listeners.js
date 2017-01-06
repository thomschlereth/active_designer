function destroyTable(){
  $('.fa-trash').unbind('click')
  $('.fa-trash').click(function() {
    if (openEditChecker()) { return }
    $(this).popover('dispose');
    $(this).parents('.card')[0].outerHTML = ""
  });
}

function addColumn() {
  $('.fa-plus-square').unbind('click')
  $('.fa-plus-square').click(function() {
    if (openEditChecker()) { return }
    let card = $(this).parents('.card')
    columnHTML(card, "column", "type")
  });
}

function addReference(){
  $('.fa-magic').unbind('click')
  $('.fa-magic').click(function() {
    $('.fa-magic').unbind('click')
    if (openEditChecker()) { return }
    let connectingLink = $($(this).parents('.card-header').children()[0])
    connectingLink.parents('.card').addClass('active-card')
    $('.jsPlumbBoundary').css({cursor: 'not-allowed'})
    $('.card:not(.active-card)').css({cursor: 'crosshair'})
    $('.card:not(.active-card)').click(function() {
      let connecteeCard = $(this);
      let tableTitle = connectingLink.parents('.card-header').children('.card-title')[0].innerText
      let column = columnHTML(connecteeCard,`${tableTitle}_id`,'reference')
      $('.card:not(.active-card)').unbind('click')
      $('.card:not(.active-card)').css({cursor: 'auto'})
      $('.jsPlumbBoundary').css({cursor: 'auto'})
      j.connect({
        source:connectingLink,
        target:column,
        anchors:["Center", "Continuous" ],
        endpoint:["Dot", { radius: 1}],
        paintStyle: { strokeWidth:4, stroke:'darkred' },
        detachable: false,
        maxConnections:-1
      });
      connectingLink.parents('.card').removeClass('active-card')
      addReference()
    })
  });

}

function addListeners(){
  destroyTable()
  addReference()
  editTableName()
  addColumn()
  $('[data-toggle="popover"]').popover()
}
