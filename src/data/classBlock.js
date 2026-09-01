
import allSem from './allSem'


function ClassBlock() {
  this.id = 1;
  this.day = "mon";
  this.branch = "cse";
  this.start = 0;
  this.end = 0;
  this.subjectcode = allSem.subjectcodes[0];
  this.teacher = allSem.teachers[0];
  this.rooms = [];
}


export default ClassBlock;