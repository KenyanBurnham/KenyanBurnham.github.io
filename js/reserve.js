
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
        disablePastDays: false,
        disabledDaysOfWeek: [0],
        weekStart: 0,
        range: false,
        onLoad: () => { /** callback function */ },
        onChange: () => { /** callback function */ },
        onSelect: () => { /** callback function */ },
        onClear: () => { /** callback function */ },
    });
