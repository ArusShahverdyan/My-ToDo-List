export function formatDate(date) {
    if (date instanceof Date) {
        return date.toISOString().slice(0, 10);
    }
    if (typeof date === "string"){
        return date.slice(0, 10);
}
           return '';
  // throw new Error("Date must be string or Date object")
}


export function truncateText(text = '', maxLength = 30) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

 function currentDay() {

    const date = new Date();
       let month = date.getMonth();
    if (month < 10) {
        month = '0' + month;
    }
   
    let day = date.getDate();
    if (day < 10) {
        day = ('0' + day);
    }
   
    const year = date.getFullYear();
    //console.log(month, day, year);
    let today = year + '-' + month +'-' + day;
    return today;
    }

export const today = currentDay();