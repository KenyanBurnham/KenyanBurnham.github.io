/*==============================================================================
"Hello-week" solution provided by:
      Mauro Reis Vieira, "maurovieirareis": https://github.com/maurovieirareis
      Samuel Fontebasso, "fontebasso": https://github.com/fontebasso
      Source: https://github.com/maurovieirareis/hello-week
      Integrated into site: 06/12/2018
==============================================================================
------------------------------------------------------------------------------
Resources:
    1. To check epoch time: https://www.epochconverter.com/
------------------------------------------------------------------------------*/
// TODO: ask database for any APPROVED reservations made on that Date
        // path = "requests/reservations/approved/"
// TODO: asks database how much time is still reservable by this group/user
        // start with group (# of members*5) and individuals 5
// TODO: builds table of selectable elements with all times
        // For disables days, displays "reserved" in text
// TODO: Adds onClickListener to all elements
        //Adds all currently selected times to a constant Array
        //When clicked and selected item exists, it removes
        //Checks to see if it is a time that's already approved, does not add to list
// TODO: disables all times that are APPROVED
// TODO: displays what times have been selected, user can remove times
// TODO: request gets sent to database on confirmation
        // Adds a time requested, will show to the lab manager what order requests were made in
// TODO: student is not longer allowed to select those times
// TODO: Need to also remove the times in time-select-table when the celendar changes
        //and delete data-timestamp value just for safety

//Just a simple message to the explorative user
console.log("%cHello {NAME}, I see you are interested in my code. If you have any feedback or issues you would like to discuss with me then email me at: kenyan.burnham@ttu.edu", "color: blue; font-size: x-large");

/*=============================================================================
// TODO: getReservations function:
1. Set's reservation time based on user input
2. puts reservation in "pending" reservations
===============================================================================*/
function setReservation(){
    console.log("setReservations");
}

/*=============================================================================
listener function:
1. Get's data-timestamp from day that is clicked..
2. For each td cell...
3. Create a new data-timestamp...
4. And save a copy for comparison later.
5. At each table data cell...
6. Add a data-timestamp that correlates to the date and time
7. Remove the "disabled" class
8. Add the "selectable" class
9. Add click listener that makes an object in a display below
................................................................................
A. Create unique path to check reservations in database
B. Calls database for anything at that path, if path doesn't exist noothing happens
C. Asks if data exists at this path
D. For each data point that exists, create a variable with that dataset
E. For however many reservations exist at "on that day" if they match the times variable...
F. Remove the selectable class
G. And add the diabled class
TODO: When submit button is pressed it needs to remove all objects and make a reservation request
TODO: remove ".time-select-disabled" class when "hello-week__prev" & "hello-week__next" are pushed
===============================================================================*/
function listener(){
    let times = [];
    let timeStamp = $('.is-selected').attr("data-timestamp"); // 1.
    for(let i = 0; i<18; i++){ // 2.
        let newTimeStamp = (Number(timeStamp) + (3600*8) + Number(1800*i)); // 3.
        times[i] = newTimeStamp; // 4.
        let tdID = 'td' + i; // 5.
        $("#" + tdID).attr('data-timestamp', newTimeStamp); // 6.
        $("#" + tdID).removeClass("time-select-disabled"); // 7.
        $("#" + tdID).addClass("time-select-td"); // 8.
        $("#" + tdID).click(function(){ // 9.
            console.log("clicked");
            console.log($("#" + tdID).attr('data-timestamp'));
        });
        // TODO: Add listener for "hello-week__prev" & "hello-week__next" to put the diabled css on
    }
    let path = "requests/reservation/approved/" + timeStamp; // A.
    firebase.database().ref(path).once('value').then(function(snapshot){ // B.
        if((snapshot.val() && snapshot.val())){ // C.
            snapshot.forEach(function(childSnapshot){
                let childData = childSnapshot.val(); // D.
                for(let j=0; j<times.length; j++){
                    if(childData == times[j]){ // E.
                        $("td[data-timestamp='" + times[j] + "']").removeClass("time-select-td"); // F.
                        $("td[data-timestamp='" + times[j] + "']").addClass("time-select-disabled"); // SG.
                    }
                }
            });
        }
    });
}

/*=============================================================================
cleanUpDate function:
1. primitive way of formating the date to be correct for the calendar
===============================================================================*/
function cleanUpDate(){
      let today = new Date().getDate();
      today = today + 1;
      let month = new Date().getMonth();
      month = month + 1;
      let year = new Date().getFullYear();
      if(month <= 9){
          month = "0" + month;
      }
      if(today <= 9){
          today = "0" + today;
      }
      let todayDateDefault = year + "-" + month + "-" + today;
      return todayDateDefault;
}

/*=============================================================================
required header for hello-week:
1. sets the options for the calendar
Source: https://maurovieirareis.github.io/hello-week/demos/documentation.html
Notes: All epoch times for days start at 12:00 AM
===============================================================================*/
    new HelloWeek({
        langFolder: 'hello-week-master/dist/langs/',
        lang: 'en',
        format: 'DD-MM-YYYY',
        defaultDate: cleanUpDate(), // Only format YYYY-MM-DD
        multiplePick: false,
        daysHighlight: []
        /*[
          {
          days: [
            ['2018-05-16', '2018-05-24'],
            ['2018-06-08', '2018-06-14']
          ],
          backgroundColor: '#6495ed',
          color: '#fff',
          title: 'Summer Holidays'
          },
          {
          days: ['2018-07-24'],
          backgroundColor: '#f08080',
          title: 'John Doe Birthday'
          }
        ]*/,
        todayHighlight: true,
        disableDates: false,
        disablePastDays: true,
        disabledDaysOfWeek: [0,6],
        weekStart: 0,
        range: false,
        onLoad: () => { /** callback function */ },
        onChange: () => { /** callback function */ },
        onSelect: () => { listener(); },
        onClear: () => { /** callback function */ },
    });
