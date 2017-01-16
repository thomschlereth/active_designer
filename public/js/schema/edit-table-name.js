function editTableName(){
  $('body').unbind('click');
  $('.table-title').on('click',null,null,setupTableNameForm);
}

function setupTableNameForm(event) {
  if (openEditChecker()) { return };
  let originalTitle = this.innerText;
  $(this).popover('hide');
  let cardID = $(this).parents('.card')[0].id;
  this.outerHTML = tableTitleFormHTML(this.innerText);
  addEditTableNameListeners(originalTitle, cardID);
}

function addEditTableNameListeners(originalTitle, cardID) {
  $('.table-form').on('keypress', null, { originalTitle: originalTitle,
      cardID: cardID
    }, titleKeypressListener);
  $('body').on('click', null, { originalTitle: originalTitle,
      cardID: cardID,
      count: 0
    }, titleBodyClickListener);
}

function titleKeypressListener(e) {
  var key = e.which;
  if(key == 13) {
    titleUpdate(e)
    return false;
  }
}

function titleBodyClickListener(e) {
  if(!$(event.target).is('.table-form') && e.data.count >= 1 ) {
    titleUpdate(e);
  }
  e.data.count++;
}

function titleUpdate(e) {
  let tableName = $('.table-form')[0].value;
  $('.table-form')[0].parentElement.outerHTML = tableTitleHTML(tableName);
  $('[data-toggle="popover"]').popover();
  if (e.data.originalTitle !== tableName) {
    let cardID = e.data.cardID;
    schema[cardID].name = tableName;
    checkTitleStatus(cardID);
  }
  editTableName();
}

function tableTitleHTML(tableName) {
  return "<h4 class='card-title table-title' data-toggle='popover' data-trigger='hover' data-content='Edit table name'>" +
    tableName +
  "</h4>";
}

function tableTitleFormHTML(priorText) {
  return `<form><input class='table-form' type='text' name='tableName' value='${priorText}'></form>`;
}
function checkTitleStatus(cardID) {
  if (schema[cardID].status.new === false) {
    updateTitleStatus(cardID);
  }
}

function updateTitleStatus(cardID) {
  if (schema[cardID].name === schema[cardID].original_name) {
    schema[cardID].status.modified = false;
  } else {
    schema[cardID].status.modified = true;
  }
}
