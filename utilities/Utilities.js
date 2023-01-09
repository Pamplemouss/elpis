export function sameDay(date1, date2) {
    if (date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()) return true;
    else return false;
}

export function getBGColor(color) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    var color = {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    };

    return `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`
}

export function date1BeforeDate2(date1, date2) {
    var date1Formated = initDateToMidnight(new Date(date1));
    var date2Formated = initDateToMidnight(new Date(date2));

    if (date1Formated.getTime() <= date2Formated.getTime()) return true;
    else return false;
}

export function initDateToMidnight(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
}