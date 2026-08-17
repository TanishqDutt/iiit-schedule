
function createEmptyClass(){

    this.id = 1
    this.day = "mon"
    this.branch ="cse"
    this.start = 0
    this.end = 0
    this.subjectcode = "SUBJECTCODE"
    this.teacher = "TEACHER"
    this.rooms = []
    
}


let sem3 =
    [
        {
            id: 1,
            day: "mon", branch: "cse",
            start: 2,
            end: 3,
            subjectcode: "CSC303",
            teacher: "SCH",
            rooms: ["N301"]
        },
        {
            id: 2,
            day: "mon", branch: "cse",
            start: 4,
            end: 6,
            subjectcode: "CSC313",
            teacher: "IM",
            rooms: ["201", "202", "207"]
        },
        {
            id: 3,
            day: "teus", branch: "cse",
            start: 0,
            end: 1,
            subjectcode: "MAC301",
            teacher: "RM",
            rooms: ["N301"]
        },
        {
            id: 4,
            day: "teus", branch: "cse",
            start: 2,
            end: 3,
            subjectcode: "CSC302",
            teacher: "DB",
            rooms: ["N301"]
        },
        {
            id: 5,
            day: "teus", branch: "cse",
            start: 4,
            end: 5,
            subjectcode: "CSC301",
            teacher: "SUR",
            rooms: ["N301"]
        },
        {
            id: 6,
            day: "teus", branch: "cse",
            start: 6,
            end: 6,
            subjectcode: "HUC301",
            teacher: "DRD",
            rooms: ["N301"]
        },

    ]

export default {sem3, createEmptyClass}