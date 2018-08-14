
/*
let reservation = new Object();
let equipIndex = 0;
let equipmentToSend = [];

function submitRequest(){
    reservation.equipment = equipmentToSend;

    let email = $("#emailAddressInput").val();
    reservation.email = email;

    let name = $("#nameInput").val();
    reservation.reserver = name;

    let group = $("#groupMemberInput").val();
    if((group == "") || (group == null) || (group == undefined)){
        group = "None";
    }
    reservation.group = group;

    let inClass = $("#classInput").val();
    reservation.inClass = inClass;

    let additional = $("#requestsInput").val();
    if((additional == "") || (additional == null) || (additional == undefined)){
        additional = "None";
    }
    reservation.additional = additional;
    let bench = 1;
    let b1 = $("#b1").hasClass("active");
    let b2 = $("#b2").hasClass("active");
    if ((b1 == false) && (b2 == true)){
        bench = "bench2";
    } else if ((b1 == true) && (b2 == false)){
        bench = "bench1";
    }
    reservation.bench = bench;
    let reservationName = $("#modalTitle").prop("data-reservation");
    firebase.database().ref("reservation/" + bench + "/pending/" + reservationName).set(reservation, function(error){
        if(!error){
              //Need to say it was sent
              console.log("successful reservation");
              $("#successAlert").prop("hidden", false);
              setTimeout(function(){
                  window.location.reload(true); //eventually change
              }, 3000);
        }
        if(error){
              console.log("Error setting reservation to database.");
              console.log(error.code);
              console.log(error.message);
        }
    });
}

function equipmentList(){
      $("#equipInput").empty();
      firebase.database().ref("equipment").once("value").then(function(inventory){
          inventory.forEach(function(equipment){
              let equipmentData = equipment.val();
              let newEquipment = "<option id='option" + equipment.key + "' value='" + equipment.key + "'>" + equipmentData.manufacturer + " " + equipmentData.model + "</option>";
              //if this optgroup does not exist
              //https://www.sitepoint.com/jquery-check-element-exists/
              if ($("#optgroup" + equipmentData.sku).length == 0) {
                    let newOptGroup = "<optgroup id='optgroup" + equipmentData.sku + "' label ='" + equipmentData.type + "'></optgroup>";
                    $("#equipInput").append(newOptGroup);
                    $("#optgroup" + equipmentData.sku).append(newEquipment);
              } else {
                  $("#optgroup" + equipmentData.sku).append(newEquipment);
              }
              $("#option" + equipment.key).click(function(){
                  equipmentToSend.push(equipment.key);
                  $("#option" + equipment.key).prop("disabled", true);
                  let selected = "<a href='#' id='" + equipment.key + "' class='list-group-item list-group-item-action flex-column align-items-start'>" +
                  "<small id='xButton" + equipment.key + "' style='float:right'>X</small>" +
                  "<p class='mb-1'><b>" + equipmentData.manufacturer + " " + equipmentData.model + "</b></p>" +
                  "<small>" + equipmentData.type + "</small>" + "</a>";
                  $("#equipmentChosen").append(selected);
                  $("#xButton" + equipment.key).click(function(){
                      $("#option" + equipment.key).prop("disabled", false);
                      let editIndex = equipmentToSend.indexOf(equipment.key);
                      equipmentToSend.splice(editIndex, 1);
                      $("#" + equipment.key).detach();
                  });
              });
          });
      });
}


function humanReadableTime(hour, minute){
    let time = new Object();
    let timeWhole = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM","4:00 PM"];
    let timeHalf = ["9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM", "3:30 PM", "4:30 PM"];
    let toReturn ="";
    if(minute != 0){
        time.beginning = timeHalf[Number(hour - 9)];
        time.ending = timeHalf[Number(hour - 8)];
    }else{
        time.beginning = timeWhole[Number(hour - 9)];
        time.ending = timeWhole[Number(hour - 8)];
    }
    return time;
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
    return formattedDate;
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
    let timeObject = humanReadableTime(hour, minute);
    $("#freeAlert").text( dateToDisplay + " at " + timeObject.beggining + " to " + timeObject.ending + " is available.");
    $("#freeAlert").prop("hidden", false);
    //Add the next time unless it's 4:30
    $("#modalTitle").prop("data-reservation", timeStamp);
    equipmentList();
    $("#reservationModal").modal("show");
}
*/

function addEquipment(){
    $("#timeToSave").empty();
    firebase.database().ref("equipment").once("value").then(function(allEquipment){
        allEquipment.forEach(function(equipment){
            let equipmentData = equipment.val();
            let newEquipment = "<option id='option" + equipment.key + "' value='" + equipment.key + "'>" + equipmentData.manufacturer + " " + equipmentData.model + "</option>";
            //if this optgroup does not exist
            //https://www.sitepoint.com/jquery-check-element-exists/
            if ($("#optgroup" + equipmentData.sku).length == 0) {
                  let newOptGroup = "<optgroup id='optgroup" + equipmentData.sku + "' label ='" + equipmentData.type + "'></optgroup>";
                  $("#timeToSave").append(newOptGroup);
                  $("#optgroup" + equipmentData.sku).append(newEquipment);
            } else {
                $("#optgroup" + equipmentData.sku).append(newEquipment);
            }
        });
    });
    $("#chosenMessage").prop("hidden", false);
    $("#addEquipmentModal").modal("show");
}

function viewEquipment(timeStamp){
    $("#reservedEquipmentListGroup").empty();
    firebase.database().ref("equipment").once("value").then(function(allEquipment){
        allEquipment.forEach(function(eachEquipment){
            let equipmentData = eachEquipment.val();
            eachEquipment.forEach(function(eachValue){
                if(eachValue.key == timeStamp){
                    let li = "<li class='list-group-item'><a href='" + equipmentData.url + "'>" + equipmentData.manufacturer + " " + equipmentData.model + " " + equipmentData.type + "</a></li>";
                    $("#reservedEquipmentListGroup").append(li);
                }
            });
        });
    });
    $("#viewEquipmentAtThisTimeModal").modal("show");
}

function filter(timeStamp){
  let b1 = $("#b1").hasClass("active");
  let b2 = $("#b2").hasClass("active");
  let benchChoice = "";
  if (b1 == true && b2 == false){
      benchChoice = "bench1";
  }if (b2 == true && b1 == false){
      benchChoice = "bench2";
  }else{
      //Need an error handling scheme
      console.log("Error: #b1 and #b2 may have the same identifier.");
  }
    firebase.database().ref("reservation").once("value").then(function(allReservations){
        allReservations.forEach(function(individualReservation){
              let equipmentCounter = 0;
              individualReservation.forEach(function(individualValues){
                  if(individualValues.val() == "equipment"){
                      equipmentCounter = equipmentCounter + 1;
                  }
              });
              let individualKey = individualReservation.key;
              let individualChild = individualReservation.val();
              let reservationTime = individualChild.reservationTime;
              if(individualChild.bench == benchChoice){
                  if(reservationTime == timeStamp){
                      //then it is the right bench and right time
                      if((individualChild.approvedStatus == true) && (individualChild.pendingStatus == false) && (individualChild.completedStatus == false)){
                          // then there is an approved reservation here
                          $("#td" + timeStamp).text("Reserved");
                          $("#td" + timeStamp).addClass("reserved-text");
                          $("tr[data-timestamp='" + timeStamp + "']").prop("disabled", true);
                          $("tr[data-timestamp='" + timeStamp + "']").removeClass("time-item");
                          if(equipmentCounter > 0){
                              $("#span" + timeStamp).text("" + equipmentCounter + "");
                              $("#span" + timeStamp).prop("hidden", false);
                              $("tr[data-timestamp='" + timeStamp + "']").click(function(){
                                  viewEquipment(timeStamp);
                              });
                          }
                      }
                      if((individualChild.approvedStatus == false) && (individualChild.pendingStatus == true) && (individualChild.completedStatus == false)){
                          //then there is a penidng reservation here
                          $("#td" + timeStamp).text("Pending Reservation");
                          $("#td" + timeStamp).addClass("pending-text");
                          $("tr[data-timestamp='" + timeStamp + "']").prop("disabled", true);
                          $("tr[data-timestamp='" + timeStamp + "']").removeClass("time-item");
                          if(equipmentCounter > 0){
                              $("#span" + timeStamp).text("" + equipmentCounter + "");
                              $("#span" + timeStamp).prop("hidden", false);
                              $("tr[data-timestamp='" + timeStamp + "']").click(function(){
                                  viewEquipment(timeStamp);
                              });
                          }
                      }
                  }else{
                      //then bench is open for reservation
                      $("tr[data-timestamp='" + timeStamp + "']").click(function(){
                          if ($("tr[data-timestamp='" + timeStamp + "']").hasClass("chosen")){
                              $("tr[data-timestamp='" + timeStamp + "']").removeClass("chosen");
                          } else {
                              $("tr[data-timestamp='" + timeStamp + "']").addClass("chosen");
                          }
                        });
                  }
              }else if((individualChild.bench != benchChoice) && (reservationTime == timeStamp)){
                    //then equipment is reserved at this time on a different bench
                    if(equipmentCounter > 0){
                        $("#span" + timeStamp).text("" + equipmentCounter + "");
                        $("#span" + timeStamp).prop("hidden", false);
                        $("tr[data-timestamp='" + timeStamp + "']").click(function(){
                            viewEquipment(timeStamp);
                        });
                    }
              }
              //else it doesn't matter
        });
    });
}


function fillTable(selector){
    // This is to correct the fillTable() called at the Bench 1 and Bench 2 button presses
    //If there is anything other than ".is-selected" it will default to "is-today"
    //Need another case for the hello_week left and right buttons
    if((selector == null) || (selector != ".is-selected") || (selector == undefined)){
        selector = ".is-today";
    }
    $("#tableToFill").empty();
    let times = ["9:00 AM", "&nbsp;", "10:00 AM", "&nbsp;", "11:00 AM", "&nbsp;", "12:00 PM", "&nbsp;", "1:00 PM", "&nbsp;", "2:00 PM", "&nbsp;", "3:00 PM", "&nbsp;", "4:00 PM", "&nbsp;"];
    let timeStamp = $(selector.toString()).attr("data-timestamp");
    for(let i = 0; i<16; i++){
        //Takes the date timestamp at 12 AM and adds 9 hours * 3600 seconds
        //then adds the number of half hours (1800 seconds * i) to get the time
        let newTimeStamp = (Number(timeStamp) + (3600*9) + Number(1800*i));
        //Next timesStamp gives you the ending of the time selected by adding 1800 (a half hour)
        let nextTimeStamp = (Number(timeStamp) + (3600*9) + Number(1800*i) + Number(1800));

        let tr =  "<tr id='tr" + i + "' data-timestamp='" + newTimeStamp + "' data-nextstamp='" + nextTimeStamp + "' class='time-item'>" +
                      "<td>" + times[i] + "</td>" +
                      "<td id='td" + newTimeStamp + "'></td>" +
                      "<td id='tdEquipment" + newTimeStamp + "'><span id='span" + newTimeStamp + "' data-badgeTimeStamp='" + newTimeStamp + "' class='badge badge-dark' hidden>16</span></td>" +
                  "</tr>";
        $("#tableToFill").append(tr);
        //Fill table needs to know what equipment is in use at this time
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
    onChange: () => { /** callback function */ },
    onSelect: () => { fillTable(".is-selected") },
    onClear: () => { /** callback function */ },
});

$( document ).ready(function() {
      //https://codepen.io/kwsim/pen/xqNpLQ
      //Kenneth Sim
      $('.btn-toggle').click(function() {
          $(this).find('#btn1').toggleClass('active');
          $(this).find('#btn2').toggleClass('active');

          if($(".is-selected").hasClass("active")){
              fillTable(".is-selected");
          }
          if($(".is-today").hasClass("active")){
              fillTable(".is-today");
          }
    });
    $("#addEquipmentButton").click(function(){
        addEquipment();
    });

});
