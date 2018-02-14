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

$(function(){

    // Finds all elements with the class "reserved" and removes the classList
    // Clears all strings stored in reservation array
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

    // Adds class "reserved" to selected td elements
    // Adds the 2nd and 3rd classNames to the reservation array
    $(".selectable").click(function(){
        // Adds background color to selected cells by changing class
        $(this).addClass("reserved");

        // Gets class of object and logs the first and second class
        var classList = $(this).attr('class').split(/\s+/);
        reservation[reservation.length] = classList[1] + " " + classList[2];
    });
});//end of auto-invoking function
