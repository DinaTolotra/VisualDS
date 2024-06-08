let value = [];
let selectedIndex = -1;


function getValueCellByIndex(index) {
    return $(`#value > .cell[index=${index}]`);
}


function indexOf(cell) {
    return cell.attr("index");
}


function setIteratorState(cell, state) {
    if (state) cell.attr("active", "true");
    else cell.attr("active", "false");
}


function getIteratorState(cell) {
    return cell.attr("active")=="true"? true: false;
}


function getPointedCell(pointer) {
    let index = indexOf(pointer);
    return getValueCellByIndex(index);
}


function toggleIteratorState(cell) {
    setIteratorState(
        cell, !getIteratorState(cell)
    );
}


function togglePointedColumnState(cell) {
    let pointedCell = getPointedCell(cell);
    pointedCell.toggleClass("pointed");
}    


function setIteratorEvent(cell) {
    cell.on("click", ()=>{
        let isActive = getIteratorState(cell);
        if (isActive) {
            cell.html("");
        } else {
            let pointer = $("<img>");
            pointer.attr("src", "../Res/arrow-up.svg");
            cell.html(pointer);
        }
        toggleIteratorState(cell);
        togglePointedColumnState(cell);
    });
}


function setOpenDialogEvent(cell) {
    cell.on("click", ()=>{
        let index = cell.attr("index");
        selectedIndex = index;
        getInputFromPopup();
    });
}


function addIndexCell() {
    let cell = $("<td></td>");
    let index = value.length-1;
    cell.addClass("cell");
    cell.text(index);

    cell.attr("index", value.length-1);

    cell.insertBefore("#index > .last");
}


function addValueCell() {
    let cell = $("<td></td>");
    cell.addClass("cell");
    cell.text(0);

    setOpenDialogEvent(cell);
    cell.attr("index", value.length-1);

    cell.insertBefore("#value > .last");
}


function addIteratorCell() {
    let cell = $("<td></td>");
    cell.addClass("cell");
    cell.attr("active", "false");

    setIteratorEvent(cell);
    cell.attr("index", value.length-1);

    cell.insertBefore("#iterator > .last");
}


function addCell() {
    addIndexCell();
    addValueCell();
    addIteratorCell();
}


function getValue() {
    let value = prompt("Entrez un nombre:");
    return parseInt(value)? parseInt(value): 0;
}


function setAddEvent() {
    $("#plus").click(function () {
        value.push(0);
        addCell();
    });
}


//  main function
$(document).ready(function () {
    createDialog();
    setAddEvent();
});