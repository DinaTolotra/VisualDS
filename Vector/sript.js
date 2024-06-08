let value = [];

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
    return $(`#value > .cell[index=${index}]`);
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


function setValueChangeEvent(cell) {
    cell.on("click", ()=>{
        let input = getValue();
        let index = cell.attr("index");
        cell.html(input);
        value[index] = input;
    });
}


function setColorChangeEvent(cell) {
    $(cell).on("dblclick", function () {
        console.log("changing color");
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

    setColorChangeEvent(cell);
    setValueChangeEvent(cell);
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
    "Strict mode";

    setAddEvent();
});