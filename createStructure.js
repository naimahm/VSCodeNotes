const fs = require('fs');
const util = require('util');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const mkdir = util.promisify(fs.mkdir);
const copyFile = util.promisify(fs.copyFile);

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
    try{
      await mkdir(folderPath, { recursive: true });
      for(let week of getWeeksInMonth(i, currentYear)){
        let filename = `${folderPath}/${week.start}_${week.end}.txt`;
        try{
          await copyFile('./templateFile.txt', filename, fs.constants.COPYFILE_EXCL);
        }catch(e){
          console.log('Unable to create file ' + filename, e.message);
        }
      }
    }catch(e){
      console.log('Unable to create directory ' + folderPath, e.message);
    }
  }

})();
