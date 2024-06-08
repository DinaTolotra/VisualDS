function createDialog() {
    $("#inputPopup").dialog({
        autoOpen: false,
        title: "Input",
        open: function() {
            let dialogInput = $("#inputPopup input");
            dialogInput.val("");
        },
        buttons: [
            {
                text: "Cancel",
                click: function() {
                    $(this).dialog( "close" );
                }
            },
            {
                text: "OK",
                click: function() {
                    let cell = getValueCellByIndex(selectedIndex);
                    let val = $("#inputPopup input").val();
                    val = parseInt(val.slice(0, 3));
                    val = val? val: 0;
                    value[selectedIndex] = val;
                    cell.html(val);


                    $(this).dialog( "close" );                    
                }
            }
        ]
    });
}


function getInputFromPopup() {
    $("#inputPopup").dialog("open");
}