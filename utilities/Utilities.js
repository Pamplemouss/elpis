export default function sameDay(date1, date2) {
    if (date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()) return true;
    else return false;
}