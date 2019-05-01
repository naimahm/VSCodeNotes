const fs = require('fs');
const path = require('path');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const fileTemplate = 
`===================================
Sunday
===================================


To do:
  -


Notes:
  -

===================================
Monday
===================================


To do:
  -


Notes:
  -
  
===================================
Tuesday
===================================


To do:
  -


Notes:
  -
===================================
Wednesday
===================================


To do:
  -


Notes:
  -
===================================
Thursday
===================================


To do:
  -


Notes:
  -
===================================
Friday
===================================


To do:
  -


Notes:
  -

Notes:
  -
===================================
Saturday
===================================


To do:
  -


Notes:
  -

`;

const getWeeksInMonth = (month, year) => {
  var date = new Date(year, month, 1);
  var weeks = [];
  let week = {
    start: null,
    end: null,
  }
  while (date.getMonth() === month) {
    let newDate = new Date(date),
      newDateDate = newDate.getDate();
    if(newDateDate === 1){
      week.start = newDateDate;
    }else{
      if(newDate.getDay() === 0){
        week.start = newDateDate;
      }
      if(newDate.getDay() === 6){
        week.end = newDateDate;
      }
    }
    if(week.start !== null && week.end !== null){
      weeks.push(week);
      week = {
        start: null,
        end: null,
      };
    }
    date.setDate(date.getDate() + 1);
  }
  return weeks;
}
(async ()=>{
  let today = new Date(),
    currentYear = today.getFullYear(),
    currentZeroIdxMonth = today.getMonth();

  let monthsLeft = 11 - currentZeroIdxMonth;

  for(let i = currentZeroIdxMonth; i < (monthsLeft + currentZeroIdxMonth + 1); i++){
    let monthName = months[i];
    let folderPath = `./${currentYear}/${i+1}_${monthName}`;
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) throw err;
    });
    for(let week of getWeeksInMonth(i, currentYear)){
      let filename = `${folderPath}/${week.start}_${week.end}.txt`;
      try{
        fs.closeSync(fs.openSync(filename, 'w'));
      }catch(e){

      }
      fs.writeFile(filename, fileTemplate, { flag: 'wx' }, (err) => {
        // if (err) throw err;
      });
    }
  }

})();
