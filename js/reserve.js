function humanReadableTime(hour, minute){
    let timeWhole = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM","4:00 PM"];
    let timeHalf = ["9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM", "3:30 PM", "4:30 PM"];
    console.log(hour);
    console.log(minute);
    let toReturn ="";
    if(minute != 0){
      toReturn = timeHalf[Number(hour - 9)].toString();
    }else{
      toReturn = timeWhole[Number(hour - 9)].toString();
    }
    return toReturn;
}

function humanReadableDate(day, date, month){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let formattedDate = "";
    if((date == 1) || (date == 21) || (date == 31)){
        formattedDate = days[day] + ", " + months[month] + " " + date + "st";
    }else if((date == 2) || (date == 22)){
        formattedDate = days[day] + ", " + months[month] + " " + date + "nd";
    }else if((date == 3) || (date == 23)){
        formattedDate = days[day] + ", " + months[month] + " " + date + "rd";
    }else{
        formattedDate = days[day] + ", " + months[month] + " " + date + "th";
    }
    return formattedDate.toString();
}

function modalBuilder(timeStamp){
    //let now = 	Math.round(new Date().getTime()/1000);
    let grabNewDate = new Date(Number(timeStamp)*1000);
    let day = grabNewDate.getDay();
    let date = grabNewDate.getDate();
    let month = grabNewDate.getMonth() + 1;
    let hour = grabNewDate.getHours();
    let minute = grabNewDate.getMinutes();
    let dateToDisplay = humanReadableDate(day, date, month);
    let timeToDisplay = humanReadableTime(hour, minute);
    console.log(timeStamp);
    firebase.database().ref("reservation/" + timeStamp).once("value", function(snapshot){
        if(snapshot){
            //If it's already reserved
            //let snapData = snapshot.val();
            //let snapKey = snapshot.key();
            $("#takenAlert").text( dateToDisplay + " at " + timeToDisplay + " is already reserved.");
            $("#takenAlert").prop("hidden", false);
            $("#freeAlert").prop("hidden", true);
        }else{
            //If theres no reservation
            $("#freeAlert").text( dateToDisplay + " at " + timeToDisplay + " is available.");
            $("#freeAlert").prop("hidden", false);
            $("#takenAlert").prop("hidden", true);
        }
    });
    $("#reservationModal").modal("show");
}

function fillTable(selector){
    $("#tableToFill").empty();
    let times = ["9:00 AM", " ", "10:00 AM", " ", "11:00 AM", " ", "12:00 PM", " ", "1:00 PM", " ", "2:00 PM", " ", "3:00 PM", " ", "4:00 PM", " "];
    let timeStamp = $(selector.toString()).attr("data-timestamp");
    for(let i = 0; i<16; i++){
        /*Takes the date timestamp at 12 AM and adds 9 hours * 3600 seconds
        then adds the number of half hours (1800 seconds * i) to get the time*/
        let newTimeStamp = (Number(timeStamp) + (3600*9) + Number(1800*i));
        let tr =  "<tr id='tr" + i + "' data-timestamp='" + newTimeStamp + "' class='time-item'>" +
                      "<td>" + times[i] + "</td>" +
                      "<td id='td" + i + "'></td>" +
                  "</tr>";
        $("#tableToFill").append(tr);
        $("tr[data-timestamp='" + newTimeStamp + "']").click(function(){
            $("#freeAlert").prop("hidden", true);
            $("#takenAlert").prop("hidden", true);
            modalBuilder(newTimeStamp.toString());
        });
        //filterPending(newTimeStamp);
        //filterApproved(newTimeStamp);
    }
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
    daysHighlight: [],
    todayHighlight: true,
    disableDates: false,
    disablePastDays: true,
    disabledDaysOfWeek: [0,6],
    weekStart: 0,
    range: false,
    onLoad: () => { fillTable(".is-today") },
    onChange: () => { /** callback function */ },
    onSelect: () => { fillTable(".is-selected") },
    onClear: () => { /** callback function */ },
});

$( document ).ready(function() {

});
