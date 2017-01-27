function getSchema() {
  return JSON.parse(localStorage.getItem('schema'));
}

function setSchema(schema) {
  localStorage.setItem("schema",JSON.stringify(schema));
}

let newTableID = 301;

function openEditChecker() {
  if ($('input').length > 0) { return true };
  return false;
}
