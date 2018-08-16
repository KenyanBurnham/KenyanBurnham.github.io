let reservation = Math.round(new Date().getTime()/1000);
let database = firebase.database();
let benchChoice = "bench1";
let otherChoice = "bench2";
let errorFunction = function(error){
    if(error){
          console.log("Error setting reservation to database.");
          console.log(error.code);
          console.log(error.message);
    }
}
let times = ["9:00 AM", "&nbsp;", "10:00 AM", "&nbsp;", "11:00 AM", "&nbsp;", "12:00 PM", "&nbsp;", "1:00 PM", "&nbsp;", "2:00 PM", "&nbsp;", "3:00 PM", "&nbsp;", "4:00 PM", "&nbsp;"];
let chosen = [];
//------------GLOBALS-----------------------------------------------------

//filters individual timeStamps
function filter(timeStamp){
    //needs to now which bench, starts with benchChoice as one
    database.ref("" + benchChoice + "").once("value").then(function(benchChoiceSnapshot){
        database.ref("" + otherChoice + "").once("value").then(function(otherChoiceSnapshot){
              benchChoiceSnapshot.forEach(function(benchChoiceReservation){
                  otherChoiceSnapshot.forEach(function(otherChoiceReservation){
                      let benchChoiceValue = benchChoiceSnapshot.val();
                      let otherChoiceValue = otherChoiceSnapshot.val();

                      //If both benches are reserved at this time
                      if((timeStamp == benchChoiceValue) && (timeStamp == otherChoiceValue)){
                          $("#td" + timeStamp).text("Reserved");
                          $("#td" + timeStamp).addClass("reserved-text");
                          $("tr[data-timestamp='" + timeStamp + "']").prop("disabled", true);
                          $("tr[data-timestamp='" + timeStamp + "']").removeClass("time-item");
                      }

                      //If the other bench is reserved at this time, then it can be reserved
                      if((timeStamp != benchChoiceValue) && (timeStamp == otherChoiceValue)){
                          $("#td" + timeStamp).text("Reserved");
                          $("#td" + timeStamp).addClass("reserved-text");
                          $("tr[data-timestamp='" + timeStamp + "']").prop("disabled", true);
                          $("tr[data-timestamp='" + timeStamp + "']").removeClass("time-item");
                      }

                      //If the other bench is reserved at this time, then it can be reserved
                      if((timeStamp == benchChoiceValue) && (timeStamp != otherChoiceValue)){

                      }

                      //If neither bench are reserved at this time than it shoul be available
                      if((timeStamp != benchChoiceValue) && (timeStamp != otherChoiceValue)){

                      }

                      //---------------
                  });
              });
        });
    });
}

//Creates table and adds a listener that allows selection
function fillTable(selector){
    $("#tableToFill").empty();

    let timeStamp = $(selector.toString()).attr("data-timestamp");
    for(let i = 0; i<16; i++){
          //Takes the date timestamp at 12 AM and adds 9 hours * 3600 seconds
          //then adds the number of half hours (1800 seconds * i) to get the time
          let newTimeStamp = (Number(timeStamp) + (3600*9) + Number(1800*i));
          //Build row
          let tr =  "<tr id='tr" + i + "' data-timestamp='" + newTimeStamp + "' class='time-item'>" +
                        "<td>" + times[i] + "</td>" +
                        "<td id='td" + newTimeStamp + "'></td>" +
                        "<td id='tdEquipment" + newTimeStamp + "'><span id='span" + newTimeStamp + "' data-badgeTimeStamp='" + newTimeStamp + "' class='badge badge-dark' hidden>16</span></td>" +
                    "</tr>";
          //Append Row
          $("#tableToFill").append(tr);

          //Add a listener to the row
          //This handles filtering the elements
          $("tr[data-timestamp='" + newTimeStamp + "']").click(function(){
                let has = $("tr[data-timestamp='" + newTimeStamp + "']").hasClass("chosen");
                console.log(has);
                if(has == true){
                    //then remove this class
                    //https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
                    chosen.splice((chosen.indexOf(newTimeStamp)), 1);
                    $("tr[data-timestamp='" + newTimeStamp + "']").removeClass("chosen");
                }
                if(has == false){
                    //then add the class
                    chosen.push(newTimeStamp);
                    $("tr[data-timestamp='" + newTimeStamp + "']").addClass("chosen");
                }
          });
          //This will handle filtering via the database
          filter(newTimeStamp);
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
    onChange: () => { fillTable(".is-selected") },
    onSelect: () => { fillTable(".is-selected") },
    onClear: () => { /** callback function */ },
});

$( document ).ready(function() {
      //https://codepen.io/kwsim/pen/xqNpLQ
      //Kenneth Sim
        $('#btnGroup').click(function() {
            $('#b1').toggleClass('active');
            $('#b2').toggleClass('active');
            //Updates the global variable
            let b1 = $("#b1").hasClass("active");
            let b2 = $("#b2").hasClass("active");
            if (b1 == true && b2 == false){
                benchChoice = "bench1";
                otherChoice = "bench2";
            }if (b2 == true && b1 == false){
                benchChoice = "bench2";
                otherChoice = "bench1";
            }

            //re-calls fill table, shouldn't matter if it is "is today"
            fillTable(".is-selected");
      });

      $("#addEquipmentButton").click(function(){
          $("#chosenMessage").prop("hidden", false);
          $("#addEquipmentModal").modal("show");
      });

});
