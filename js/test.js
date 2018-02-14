//Whetever the current time is should be highlighted in the left column by changing the css of "the-hour siding" to highlight the cell
// Will have to add a reservation input form
// Will have to add to db

function reserveCSS(){
    var daySelection = document.getElementById("getDays");
    var dayOption = daySelection.options[daySelection.selectedIndex].value;
    var timeSelection = document.getElementById("getTimes");
    var timeOption = timeSelection.options[timeSelection.selectedIndex].value;

    console.log(dayOption + " " + timeOption);
}
