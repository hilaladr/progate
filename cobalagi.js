function getdate() {
    var time = new Date();
    var day = time.getDate();
    console.log(day.toString().length);
    if (day.toString().length == 1) {
        day = `0${day}`;
    };
    let bln = `${time.getFullYear()}0${time.getMonth()+1}${day}`
    console.log(bln);
    return bln
  };
var tgl = getdate();
console.log(tgl);