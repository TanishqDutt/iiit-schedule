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


function ClassBlock() {
  this.id = 1;
  this.day = "mon";
  this.branch = "cse";
  this.start = 0;
  this.end = 0;
  this.subjectcode = subjectcodes[0];
  this.teacher = teachers[0];
  this.rooms = [];
}

/**@type {ClassBlock[]} */

let sem3 = [
  {
    id: 1787000866469,
    day: "teus",
    branch: "cse",
    start: 0,
    end: "1",
    subjectcode: "MAC301",
    teacher: "RM",
    rooms: ["N301"],
  },
  {
    id: 1787000866754,
    day: "teus",
    branch: "cse",
    start: "2",
    end: "3",
    subjectcode: "CSC302",
    teacher: "DB",
    rooms: ["N301"],
  },
  {
    id: 1787000866994,
    day: "teus",
    branch: "cse",
    start: "4",
    end: "5",
    subjectcode: "CSC301",
    teacher: "SUR",
    rooms: ["N301"],
  },
  {
    id: 1787000867406,
    day: "teus",
    branch: "cse",
    start: "6",
    end: "6",
    subjectcode: "HUC301",
    teacher: "DRD",
    rooms: ["N301"],
  },
  {
    id: 1787000944154,
    day: "wed",
    branch: "cse",
    start: "1",
    end: "3",
    subjectcode: "CSC311",
    teacher: "SUR",
    rooms: ["201", "202", "207"],
  },
  {
    id: 1787000948756,
    day: "wed",
    branch: "cse",
    start: "4",
    end: "5",
    subjectcode: "HUC301",
    teacher: "DRD",
    rooms: ["N301"],
  },
  {
    id: 1787000949096,
    day: "wed",
    branch: "cse",
    start: "6",
    end: "6",
    subjectcode: "CSC301",
    teacher: "SUR",
    rooms: ["N301"],
  },
  {
    id: 1787001037689,
    day: "thurs",
    branch: "cse",
    start: "1",
    end: "3",
    subjectcode: "CSC312",
    teacher: "DB",
    rooms: ["201", "202", "207"],
  },
  {
    id: 1787001038408,
    day: "thurs",
    branch: "cse",
    start: "4",
    end: "5",
    subjectcode: "MAC301",
    teacher: "SSM",
    rooms: ["N301"],
  },
  {
    id: 1787001097944,
    day: "fri",
    branch: "cse",
    start: "2",
    end: "3",
    subjectcode: "CSC302",
    teacher: "DB",
    rooms: ["N301"],
  },
  {
    id: 1787001098458,
    day: "fri",
    branch: "cse",
    start: "4",
    end: "5",
    subjectcode: "CSC303",
    teacher: "SCH",
    rooms: ["N301"],
  },
  {
    id: 1787001157054,
    day: "mon",
    branch: "cse",
    start: "2",
    end: "3",
    subjectcode: "CSC303",
    teacher: "SCH",
    rooms: ["N301"],
  },
  {
    id: 1787001157521,
    day: "mon",
    branch: "cse",
    start: "4",
    end: "6",
    subjectcode: "CSC313",
    teacher: "IM",
    rooms: ["201", "202", "207"],
  },
];

let teachers = ["DB", "IM", "SCH", "DRD", "SUR", "RM", "SSM"];


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
  "CSC301",
  "CSC302",
  "CSC303",
  "MAC301",
  "HUC301",
  "CSC311",
  "CSC312",
  "CSC313",
];

export default { sem3, ClassBlock, teachers, subjectcodes, timeLabels };
