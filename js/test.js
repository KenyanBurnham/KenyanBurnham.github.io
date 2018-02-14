//Whetever the current time is should be highlighted in the left column by changing the css of "the-hour siding" to highlight the cell
// Will have to add a reservation input form
// Will have to add to db

//Adds a background color to the selected time and day
function reserveCSS(){
    var daySelection = document.getElementById("getDays");
    var dayOption = daySelection.options[daySelection.selectedIndex].value;
    var timeSelection = document.getElementById("getTimes");
    var timeOption = timeSelection.options[timeSelection.selectedIndex].value;
    var tdToChange = document.getElementsByClassName('' + timeOption + ' ' + dayOption + '');
    var tdToChangeClasses = tdToChange.classList;
    console.log(tdToChangeClasses);
    //tdToChangeClasses.add("reserved");
}

function getCellByClick(){

}


//Auto-invoking function that adds a click listener to all td elements
(function(){
  element.addEventListener("click", function(){ alert("Hello World!"); });

})();
