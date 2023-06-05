import moment from "moment";

export default class CommonUtils{
    static  formatString(str, ...val) {
        
    for (let index = 0; index < val.length; index++) { 
       str = str.concat( val[index])
    }
       return str;
        }
    static getDates(month){
        let firstDay= new Date(new Date().getFullYear(),new Date().getMonth(), 1);
        let lastDay=new Date(new Date().getFullYear(), new Date().getMonth()+1, 0)
       if(month){ 
        firstDay = new Date(new Date().getFullYear(), month, 1);
      lastDay = new Date(new Date().getFullYear(), month + 1, 0);
    }
    firstDay=this.formatDates(firstDay)
    lastDay=this.formatDates(lastDay)
    return {firstDay,lastDay}
    }
    static formatDates(date){
        let d= new Date(date)
        let year= d.getFullYear();
        let month='' + (d.getMonth() + 1);
        let day= '' + d.getDate()
        if(month.length<2){
            month="0"+month
        }
        if(day.length<2){
            day="0"+day
        }
        return [year,month,day].join("-")
    }
    static getNameInitials(fullName){
        let nameArr= fullName.split(" ")
        let nameInitals=nameArr[0][0]+nameArr[0][1]
        return nameInitals
    }
}