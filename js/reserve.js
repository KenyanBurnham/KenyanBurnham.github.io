/*==============================================================================
"Hello-week" solution provided by:
      Mauro Reis Vieira, "maurovieirareis": https://github.com/maurovieirareis
      Samuel Fontebasso, "fontebasso": https://github.com/fontebasso
Source: https://github.com/maurovieirareis/hello-week
Integrated into site: 06/12/2018
==============================================================================*/

function listener(){
    let selected = document.getElementsByClassName('is-selected');
    if (selected.hasAttributes()) {
       let attrs = selected.attributes;
       var output = "";
       for(let i = attrs.length - 1; i >= 0; i--) {
         output += attrs[i].name + "->" + attrs[i].value;
       }
       result.value = output;
     } else {
       result.value = "No attributes to show";
     }
    //selected = selected.getAttribute("data-timestamp");
    console.log(selected);
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

//Just a simple message to the explorative user
console.log("%cHello {NAME}, I see you are interested in my code. If you have any feedback or issues you would like to discuss with me then email me at: kenyan.burnham@ttu.edu", "color: blue; font-size: x-large");

/*=============================================================================
required header for hello-week:
1. sets the options for the calendar
Source: https://maurovieirareis.github.io/hello-week/demos/documentation.html
===============================================================================*/
    new HelloWeek({
        langFolder: 'hello-week-master/dist/langs/',
        lang: 'en',
        format: 'DD-MM-YYYY',
        defaultDate: cleanUpDate(), // Only format YYYY-MM-DD
        multiplePick: true,
        daysHighlight: []/*[
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
