import sem1 from "./sems/sem1";
import sem3 from "./sems/sem3";
import sem5 from "./sems/sem5";

class Time{
  constructor(time){
    let strTime = time.toString()

    if(strTime.length >= 3){
      this.hours = Number(strTime.slice(0,-2))
      this.minutes = Number(strTime.slice(-2))
    }else{
      this.hours = 0
      this.minutes = Number(strTime)
    }


    this.isNoon = this.hours>=12
    this.past12 = this.hours>12


  }

  getString(){

    let minutesPart = this.minutes.toString().padStart(2,'0')
    let ampmPart = this.isNoon ? 'PM' : 'AM'
    let hoursPart = (this.past12 ? this.hours-12 : this.hours).toString().padStart(2,'0')

    if(this.hours == 0){
      hoursPart = '12'
    }

    return `${hoursPart}:${minutesPart} ${ampmPart}`
    
  }
}




let allSem = {
    sem1: {
      schedule: sem1,
      branches: ["Sec-a", "Sec-b"],
    },
    sem3: {
      schedule: sem3,
      branches: ["cse", "ece"],
    },
    sem5: {
      schedule: sem5,
      branches: ["cse", "ece"],
    },
}



let teachers = ["DB", "IM", "SCH", "DRD", "SUR", "RM", "SSM", "PC", "SPA", "RS", "BB", "SP", "RG", "AL", "UD", "RK", "SB"];


let timeLabels = [
  [new Time(915), new Time(1005)],
  [new Time(1010), new Time(1100)],
  [new Time(1105), new Time(1155)],
  [new Time(1200), new Time(1250)],
  [new Time(1415), new Time(1505)],
  [new Time(1510), new Time(1600)],
  [new Time(1605), new Time(1655)],
]


let subjectcodes = [
  "ECC101",
  "ECC111",
  "CSC101",
  "CSC111",
  "MAC101",
  "PHC101",
  "HUC101",
  "HUC102",
  "CSC301",
  "CSC302",
  "CSC303",
  "MAC301",
  "HUC301",
  "CSC311",
  "CSC312",
  "CSC313",
  "ECC301",
  "ECC302",
  "ECC312"
];


export default {allSem, subjectcodes, teachers, timeLabels}