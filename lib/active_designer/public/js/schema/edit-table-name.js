function editTableName(){
  $('body').unbind('click');
  $('.table-title').on('dblclick',null,null,setupTableNameForm);
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
  let schema = getSchema();
  let newTableName = $('.table-form')[0].value;
  let cards = $('.card');
  for (var i = 0; i < cards.length; i++) {
    if ($(cards[i]).find('form').length === 0) {
      let tableName = $(cards[i]).find('h4.table-title').text().trim()
      if (tableName === newTableName) {
        $('.table-form')[0].parentElement.outerHTML = tableTitleHTML(e.data.originalTitle);
        editTableName();
        setSchema(schema);
        return
        // Should produce an error here
      }
    }
  }
  $('.table-form')[0].parentElement.outerHTML = tableTitleHTML(newTableName);
  $('[data-toggle="popover"]').popover();
  let tableID = e.data.cardID;
  updateRefs(schema[tableID],schema,newTableName)
  if (e.data.originalTitle !== newTableName) {
    schema[tableID].name = newTableName;
    checkTitleStatus(tableID,schema);
  }
  editTableName();
  setSchema(schema);
}

function updateRefs(table,schema,newTableName) {
  let refs = $("li[id^='ref-']");
  for (var i = 0; i < refs.length; i++) {
    let refName = $(refs[i]).find('span.column-title').text().split('_');
    refName.pop();
    refName = refName.join('_');
    if (refName === table.name) {
      $(refs[i]).find('span.column-title').text(`${newTableName}_id`);
      let refID = refs[i].id;
      let tableID = `tbl-${refID.split('-')[1]}`;
      let refObj = schema[tableID].references[refID];
      refObj.foreign_table_name = newTableName;
      if (!refObj.status.new) {
        refObj.status.modified = true;
      }
    }
  }
}

function tableTitleHTML(tableName) {
  return "<h4 class='card-title table-title' data-toggle='popover' data-trigger='hover' data-content='Edit table name'>" +
    tableName +
  "</h4>";
}

function tableTitleFormHTML(priorText) {
  return `<form><input class='table-form' type='text' name='tableName' value='${priorText}'></form>`;
}

function checkTitleStatus(cardID,schema) {
  if (schema[cardID].status.new === false) {
    updateTitleStatus(cardID,schema);
  }
}

function updateTitleStatus(cardID,schema) {
  if (schema[cardID].name === schema[cardID].original_name) {
    schema[cardID].status.modified = false;
  } else {
    schema[cardID].status.modified = true;
  }
}
