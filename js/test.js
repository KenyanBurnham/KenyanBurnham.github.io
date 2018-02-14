//Whetever the current time is should be highlighted in the left column by changing the css of "the-hour siding" to highlight the cell
// Will have to add a reservation input form
// Will have to add to db

$(function(){
    //Get's all of the td with the class "selectable" and adds an onclick listener that echoes
    //it's second and first class names and adds the class reserve
    $(".selectable").click(function(){
        //colors selected cells
        $(this).addClass("reserved");

        //gets class of object and logs the first and second class
        var classList = $(this).attr('class').split(/\s+/);
        console.log(classList);
    });
});
