class TableCoordinates {

  constructor() {
    let tableHTML = $('.card');
    if (tableHTML.length > 0) {
      let prevX = this.findMaxCoord(tableHTML, "left");
      let prevY = this.findMaxCoord(tableHTML, "top");
      let newCoords = this.newCoordinates(prevX,prevY);
      this.x = newCoords.x;
      this.y = newCoords.y;
    } else {
      this.x = 10;
      this.y = 10;
    }
  }

  findMaxCoord(tableHTML,type) {
    let max = 0

    for(let i = 0; i < tableHTML.length; i++) {
      let num = parseInt($(tableHTML[i]).css(type).replace('px',''));
      if ( num > max)
      {
        max = num
      }
    }
    return max
  }


  newCoordinates(x,y) {
    if (x >= 650) {
      x = 10
      y = y + 300
    }
    else {
      x = x + 275
    }
    return {x: x, y: y}
  }

}

// TableCoordinates.coords = { x: 10, y: 10 }


module.exports = TableCoordinates;
