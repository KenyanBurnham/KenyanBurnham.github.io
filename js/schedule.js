let times = ["9:00 AM", "&nbsp;", "10:00 AM", "&nbsp;", "11:00 AM", "&nbsp;", "12:00 PM", "&nbsp;", "1:00 PM", "&nbsp;", "2:00 PM", "&nbsp;", "3:00 PM", "&nbsp;", "4:00 PM", "&nbsp;"];
let chosen = [];
//------------GLOBALS-----------------------------------------------------

function filter(){
    chosen.forEach(function(value){
        console.log(value);
    });
}

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

          $("tr[data-timestamp='" + newTimeStamp + "']").click(function(){
                let has = $("tr[data-timestamp='" + newTimeStamp + "']").hasClass("chosen");
                if(has == true){
                    //then remove this class

                }
                if(has == false){
                    //then add the class
                    chosen.push(timeStamp);
                }

                chosen.forEach(function(value){
                    console.log(value);
                });
          });
          filter(newTimeStamp);
      }
}

function begin(){
    $("#addEquipmentButton").prop("disable", true);
    $("#beginFinalSubmisisonBtn").("disable", true);
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
            //re-calls fill table
            if($(".is-today").hasClass("is-selected")){
                fillTable(".is-today");
            }else{
                fillTable(".is-selected");
            }
      });

      $("#addEquipmentButton").click(function(){
          $("#chosenMessage").prop("hidden", false);
          $("#addEquipmentModal").modal("show");
      });

    //creates reservation that can be updated everytime the user logs onto the schedule page
    begin();

});
