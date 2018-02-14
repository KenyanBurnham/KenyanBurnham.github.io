//Whetever the current time is should be highlighted in the left column by changing the css of "the-hour siding" to highlight the cell
// Will have to add a reservation input form
// Will have to add to db

var reservation = [];

// Gets all td elements with the class "selectable"
// Returns an onclick listener that adds class "reserved"
// Logs 1st and 2nd class names
$(function(){

    $(".selectable").click(function(){
        // Adds background color to selected cells by changing class
        $(this).addClass("reserved");

        // Gets class of object and logs the first and second class
        var classList = $(this).attr('class').split(/\s+/);
        var addReservation = classList[1] + " " + classList[2];
        reservation.push[addReservation];
        console.log(reservation);
    });

});//end of auto-invoking function
