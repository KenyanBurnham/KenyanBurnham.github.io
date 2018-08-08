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
                  $("#option" + equipment.key).addClass("submission");
                  let selected = "<a href='#' id='" + equipment.key + "' class='list-group-item list-group-item-action flex-column align-items-start'>" +
                  "<small id='xButton" + equipment.key + "' style='float:right'>X</small>" +
                  "<p class='mb-1'><b>" + equipmentData.manufacturer + " " + equipmentData.model + "</b></p>" +
                  "<small>" + equipmentData.type + "</small>" + "</a>";
                  $("#equipmentChosen").append(selected);
                  $("#xButton" + equipment.key).click(function(){
                      let editIndex = equipmentToSend.indexOf(equipment.key);
                      equipmentToSend.splice(editIndex, 1);
                      $("#" + equipment.key).detach();
                  });
              });
          });
      });
}

function humanReadableTime(hour, minute){
    let timeWhole = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM","4:00 PM"];
    let timeHalf = ["9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM", "3:30 PM", "4:30 PM"];
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
    $("#freeAlert").text( dateToDisplay + " at " + timeToDisplay + " is available.");
    $("#freeAlert").prop("hidden", false);
    $("#modalTitle").prop("data-reservation", timeStamp);
    equipmentList();
    $("#reservationModal").modal("show");
}

function filter(timeStamp){
    let b1 = $("#b1").hasClass("active");
    let b2 = $("#b2").hasClass("active");
    if (b1 == true && b2 == false){
      //then Bench one is the one that needs to be filtered
        firebase.database().ref("reservation/bench1/pending/" + timeStamp).once("value").then(function(pendingBench1Snap){
            firebase.database().ref("reservation/bench1/approved/" + timeStamp).once("value").then(function(approveBench1Snap){
                  let bench1PendingStatus = pendingBench1Snap.exists();
                  let bench1ApproveStatus = approveBench1Snap.exists();
                  if ((bench1PendingStatus == false) && (bench1ApproveStatus == false)){
                        $("tr[data-timestamp='" + timeStamp + "']").click(function(){
                            $("#freeAlert").prop("hidden", true);
                            modalBuilder(timeStamp);
                        });
                  } else if ((bench1PendingStatus == true) || (bench1ApproveStatus == false)){
                        $("#td" + timeStamp).text("Pending Reservation");
                        $("#td" + timeStamp).addClass("pending-text");
                        $("tr[data-timestamp='" + timeStamp + "']").prop("disabled", true);
                  } else if ((bench1PendingStatus == false) || (bench1ApproveStatus == true)){
                        $("#td" + timeStamp).text("Reserved");
                        $("#td" + timeStamp).addClass("reserved-text");
                        $("tr[data-timestamp='" + timeStamp + "']").prop("disabled", true);
                  }
            });
        });
    } else if(b2 == true && b1 == false){
      //then Bench 2 is the one that needs to be filtered through
        firebase.database().ref("reservation/bench2/pending/" + timeStamp).once("value").then(function(pendingBench2Snap){
            firebase.database().ref("reservation/bench2/approved/" + timeStamp).once("value").then(function(approveBench2Snap){
                  let bench2PendingStatus = pendingBench2Snap.exists();
                  let bench2ApproveStatus = approveBench2Snap.exists();
                  if ((bench2PendingStatus == false) && (bench2ApproveStatus == false)){
                        $("tr[data-timestamp='" + timeStamp + "']").click(function(){
                            $("#freeAlert").prop("hidden", true);
                            modalBuilder(timeStamp);
                        });
                  } else if ((bench2PendingStatus == true) || (bench2ApproveStatus == false)){
                        $("#td" + timeStamp).text("Pending Reservation");
                        $("#td" + timeStamp).addClass("pending-text");
                        $("tr[data-timestamp='" + timeStamp + "']").prop("disabled", true);
                  } else if ((bench2PendingStatus == false) || (bench2ApproveStatus == true)){
                        $("#td" + timeStamp).text("Reserved");
                        $("#td" + timeStamp).addClass("reserved-text");
                        $("tr[data-timestamp='" + timeStamp + "']").prop("disabled", true);
                  }
            });
        });
    } else{
        //There is an error somewhere
        console.log("Error: #b1 and #b2 may have the same identifier.");
    }
}

function fillTable(selector){
    // This is to correct the fillTable() called at the Bench 1 and Bench 2 button presses
    //If there is anything other than ".is-selected" it will default to "is-today"
    if((selector == null) || (selector != ".is-selected") || (selector == undefined)){
        selector = ".is-today";
    }
    $("#tableToFill").empty();
    let times = ["9:00 AM", " ", "10:00 AM", " ", "11:00 AM", " ", "12:00 PM", " ", "1:00 PM", " ", "2:00 PM", " ", "3:00 PM", " ", "4:00 PM", " "];
    let timeStamp = $(selector.toString()).attr("data-timestamp");
    for(let i = 0; i<16; i++){
        /*Takes the date timestamp at 12 AM and adds 9 hours * 3600 seconds
        then adds the number of half hours (1800 seconds * i) to get the time*/
        let newTimeStamp = (Number(timeStamp) + (3600*9) + Number(1800*i));
        let tr =  "<tr id='tr" + i + "' data-timestamp='" + newTimeStamp + "' class='time-item'>" +
                      "<td>" + times[i] + "</td>" +
                      "<td id='td" + newTimeStamp + "'></td>" +
                  "</tr>";
        $("#tableToFill").append(tr);
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
          $(this).find('.btn').toggleClass('active');

          if ($(this).find('.btn-primary').length>0) {
              $(this).find('.btn').toggleClass('btn-primary');
          }
          if ($(this).find('.btn-danger').length>0) {
              $(this).find('.btn').toggleClass('btn-danger');
          }
          if ($(this).find('.btn-success').length>0) {
              $(this).find('.btn').toggleClass('btn-success');
          }
          if ($(this).find('.btn-info').length>0) {
              $(this).find('.btn').toggleClass('btn-info');
          }
          $(this).find('.btn').toggleClass('btn-default');
          //Calls after css change to make sure table gets updated
          fillTable(".is-selected");
    });
});
