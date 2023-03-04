const createAmaId = (type, date, round)=>{
  let idStart = type.substring(0,1);
  let idYear =  new String(new Date(date).getFullYear()).substring(2,4);
  let idEnd = new String((round * 5)).padStart(2,'0');
  return idStart + idYear + idEnd;
}

module.exports = {createAmaId};