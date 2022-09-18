import React, { useState, useEffect } from "react";
import { sameDay } from '../utilities/Utilities';

export default function Calendar(props) {
    const [dateToDisplay, setDateToDisplay] = useState(new Date(props.activeDate.getFullYear(), props.activeDate.getMonth(), 1));
    const todayDate = new Date();
    const calendarDates = [...Array(42)].map((element, index) => {
        var firstDay = new Date(new Date(dateToDisplay).setDate(1));
        var newDate = new Date(firstDay);
        newDate.setDate(newDate.getDate() + index - (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1));
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);

        return (
            <div key={newDate}
                onClick={() => { setDateToDisplay(newDate); props.setActiveDate(newDate); }}
                className={`rounded-lg w-10 h-10 inline-flex justify-center items-center shadow cursor-pointer
                    ${newDate.getMonth() != firstDay.getMonth() ? "text-gray-500 bg-gray-500/5" : (sameDay(props.activeDate, newDate) ? "active bg-blue-500 text-white" : "bg-gray-500/10 hover:bg-gray-500/30")}
                    ${sameDay(todayDate, newDate) ? "outline outline-2 outline-white/75 " : ""}`}
            >
                {newDate.getDate()}
            </div>
        )
    });

    // WARNING: sets date back to 1
    function neighborMonth(date, i) {
        var newDate = new Date(date);
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() + i);

        return newDate;
    }

    return (
        <>
            <div className="flex justify-between">
                <div onClick={() => setDateToDisplay(neighborMonth(dateToDisplay, -1))} className="w-12 h-12 text-blue-500 inline-flex justify-center items-center cursor-pointer hover:-translate-x-1 duration-150 rounded-lg">
                    <i className="fa-solid fa-angle-left" style={{ fontSize: "1.5em" }}></i>
                </div>
                <div className="text-center">
                    <div className="capitalize text-white font-bold text-xl">{new Intl.DateTimeFormat(["fr"], { month: "long" }).format(dateToDisplay)}</div>
                    <div>{dateToDisplay.getFullYear()}</div>
                </div>
                <div onClick={() => setDateToDisplay(neighborMonth(dateToDisplay, 1))} className="w-12 h-12 text-blue-500 inline-flex justify-center items-center cursor-pointer hover:translate-x-1 duration-150 rounded-lg">
                    <i className="fa-solid fa-angle-right" style={{ fontSize: "1.5em" }}></i>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-2 text-center">
                <div>Lun</div>
                <div>Mar</div>
                <div>Mer</div>
                <div>Jeu</div>
                <div>Ven</div>
                <div className="text-blue-500">Sam</div>
                <div className="text-blue-500">Dim</div>
                {calendarDates}
            </div>
        </>
    )
}