/*------------------------------------------------------------------------------
Developed by Kenyan Burnham
For: the Program for Semiconductor Product Engineering Testing Laboratory
Dependancies: JQuery
Description:
-----------------------------------------------------------------------------*/

// Development Notes:
// Whetever the current time is should be highlighted in the left column by changing the css of "the-hour siding" to highlight the cell
// Will have to add a reservation input form
// Will have to add to db

//-----------------------------------------------------------------------------
//Global variables
var reservation = [];
//-----------------------------------------------------------------------------

// Gets all td elements with the class "selectable"
// Returns an onclick listener that adds class "reserved"
// Logs 1st and 2nd class names
$(function(){
    //find all td elements with class "selectable"
    //remove class "reserved"
    //empty reservation[]
    $(".clear-reservations").click(function(){
        //removes class "reserved" from all td
        $(".reserved").each(function(){
          $(this).removeClass("reserved");
        });
        //empty reservation array
        while(reservation.length) {
            reservation.pop();
        }
    });

    $(".selectable").click(function(){
        // Adds background color to selected cells by changing class
        $(this).addClass("reserved");

        // Gets class of object and logs the first and second class
        var classList = $(this).attr('class').split(/\s+/);
        reservation[reservation.length] = classList[1] + " " + classList[2];
    });
});//end of auto-invoking function
