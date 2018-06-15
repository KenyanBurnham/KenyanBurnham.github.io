/*==============================================================================
"Hello-week" solution provided by:
      Mauro Reis Vieira, "maurovieirareis": https://github.com/maurovieirareis
      Samuel Fontebasso, "fontebasso": https://github.com/fontebasso
Source: https://github.com/maurovieirareis/hello-week
Integrated into site: 06/12/2018
==============================================================================*/
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
1. calendar object is clicked
2. TODO: Clears currently disabled reservations
3. Grabs the "is-selected" custom "timestamp" data
4. Gives a custom "data-timestamp" data type to the time cells
5. FIXME: Asks server for any reservations on that day
6. TODO: if any, applies disabled class to times reserved
===============================================================================*/
function listener(){
    let times = [];
    let timeStamp = $('.is-selected').attr("data-timestamp");
    for(let i = 0; i<18; i++){
        let newTimeStamp = (Number(timeStamp) + (3600*8) + Number(1800*i));
        //Makes a list of data-timestamps displayed in time-select-table
        times[i] = newTimeStamp;
        let tdID = 'td' + i;
        $("#" + tdID).attr('data-timestamp', newTimeStamp);
        /*Adds the epoch time onto the epoch date
        and assigns it to the time table*/
    }
    let path = "requests/reservation/approved/" + timeStamp;
    firebase.database().ref(path).once('value').then(function(snapshot){
        if((snapshot.val() && snapshot.val())){
            console.log("snapshot value exists");
            snapshot.forEach(function(childSnapshot){
                let childData = childSnapshot.val();
                for(let j=0; j<times.length; j++){
                    if(childData == times[j]){
                        console.log("childData: " + childData + " is equal to times[j]: " + times[j]);
                    }else{
                        console.log("there is no reservation for: " + times[j]);
                    }
                }
            });
        }else{
            console.log("No data to display");
        }

        //let displayReservation = (snapshot.val() && snapshot.val());
        /*Asks database if there are any reservations on that day*/
        //if(displayReservation){
            /*If there are then disable the sections on the table*/
            //console.log("Reservation: " + displayReservation);
        //}else{
            //console.log("No reservations.");
            /*if there aren't any then do nothing*/
        //}
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
