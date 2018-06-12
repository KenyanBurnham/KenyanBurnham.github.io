
    //minDate I can set to yesterday
    //maxDate I can set to the end of the semester
    //Need to fix nav buttons
    //disable disabledDaysOfWeek on the weekends (0 & 6)?
    let today = new Date().getDate();
    today = today + 1;
    today.toISOString();
    let month = new Date().getMonth();
    month = month + 1;
    month.toISOString();
    let year = new Date().getFullYear();

    console.log(year + "-" + month + "-" + today);
    console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");

    new HelloWeek({
        langFolder: 'hello-week-master/dist/langs/',
        lang: 'en',
        format: 'DD-MM-YYYY',
        defaultDate: '2018-06-01', // Only format YYYY-MM-DD
        multiplePick: true,
        daysHighlight: [
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
        ],
        todayHighlight: true,
        disableDates: false,
        disablePastDays: true,
        disabledDaysOfWeek: [0,6],
        weekStart: 0,
        range: false,
        onLoad: () => { /** callback function */ },
        onChange: () => { /** callback function */ },
        onSelect: () => { /** callback function */ },
        onClear: () => { /** callback function */ },
    });
