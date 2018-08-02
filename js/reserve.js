

function fillTable(select){
    let selector;
    switch (select) {
      case "today":
          selector = "today";
          break;
      case "select":
          selector = "selected";
          break;
    }
    let timeStamp = $('.is-' + selector).attr("data-timestamp");
    for(let i = 0; i<16; i++){
        /*Takes the date timestamp at 12 AM and adds 9 hours * 3600 seconds
        then adds the number of half hours (1800 seconds * i) to get the time*/
        $("#tr" + i).attr('data-timestamp', (Number(timeStamp) + (3600*9) + Number(1800*i)));
        $("#tr" + i).click(function(){
            console.log((Number(timeStamp) + (3600*9) + Number(1800*i)));
        });
    }
    //filter out unavailable times and allow the button to be interacted with
    //filterPending(user);
    //filterApproved();
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
    onLoad: () => { /** callback function */ },
    onChange: () => { /** callback function */ },
    onSelect: () => { fillTable("select") },
    onClear: () => { /** callback function */ },
});

$( document ).ready(function() {
    fillTable("today");
});
