function calculateTimeDifference(timetype) {
    /* timetype is either units or time for type of support charging  */
    var ttype = timetype;
    var date1 = UK2USdate(document.getElementById('Time_Start').value);
    var date2 = UK2USdate(document.getElementById('Time_end').value);
    var mincharge = document.getElementById('startmincharge').value;

    var sec = (date2.getTime() / 1000.0) - (date1.getTime() / 1000.0);
    var timdif = (date2.getTime() / 1000.0) - (date1.getTime() / 1000.0);
    var hours = parseInt(sec / 60 / 60);
    var sec = sec - hours * 60 * 60;
    var min = parseInt(sec / 60);
    var ses = sec - min * 60;
    var inminutes = (hours * 60);
    var timespent = Math.floor(timdif / 60);
    var units = timdif / 60 / 15;
    units = Math.ceil(units);

    //if there is no time spent
    if (isNaN(timespent) || timespent <= 0) {
        timespent = 0;
        units = 0;
        mincharge = 0;
    };
    if (isNaN(units)) {
        units = 0;
    };
    //if the ticket is less then 3 minutes set min charge
    if (timespent <= 4) {
        mincharge = 0;
    };
    if ((units > 4 && mincharge > 0) || (units > 4)) {
        mincharge = +mincharge + Math.ceil((units * 0.2));
    };
    document.getElementById('TimeSpent').value = timespent;
    if (ttype == "units") {
        console.log("unit charged");
        document.getElementById('CalcUnits').value = units;
        document.getElementById('Charged_Units').value = mincharge;
    } else if (ttype == "time") {
        console.log("time charged");
        document.getElementById('Charged_Time').value = mincharge
    };
}