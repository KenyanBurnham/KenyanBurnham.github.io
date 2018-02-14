//Whetever the current time is should be highlighted in the left column by changing the css of "the-hour siding" to highlight the cell
// Will have to add a reservation input form
// Will have to add to db

function reserveCSS(){
    var daySelection = document.getElementsByName("days").selectedIndex;
console.log(document.getElementsByTagName("option")[daySelection].value);
    var timeSelection = document.getElementsByName("times").selectedIndex;


  //var selectTableData = document.getElementsByClassName(timeOptions.value + " " + dayOptions.value + "");
  //selectTableData.className += " reserved";
}
