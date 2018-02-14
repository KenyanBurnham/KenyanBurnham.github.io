//Whetever the current time is should be highlighted in the left column by changing the css of "the-hour siding" to highlight the cell
// Will have to add a reservation input form
// Will have to add to db

function reserveCSS(){
    var daySelection = document.getElementById("getDays");
    console.log(daySelection);
    var dayOption = daySelection.options[daySelection.selectedIndex].value;
    console.log(dayOption);
}
