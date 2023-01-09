import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { AnimatePresence, motion } from "framer-motion"
import { sameDay } from '../utilities/Utilities';

export default function Calendar(props) {
    const [dateToDisplay, setDateToDisplay] = useState(new Date(props.activeDate.getFullYear(), props.activeDate.getMonth(), 1));
    const todayDate = new Date();
    const [direction, setDirection] = useState(1);
    const calendarDates = [...Array(42)].map((element, index) => {
        var firstDay = new Date(new Date(dateToDisplay).setDate(1));
        var newDate = new Date(firstDay);
        newDate.setDate(newDate.getDate() + index - (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1));
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);

        return (
            <motion.div key={newDate + dateToDisplay.getMonth()}
                onClick={() => { checkDateToDisplay(newDate); props.setActiveDate(newDate); }}
                className={`rounded-lg w-10 h-10 inline-flex justify-center items-center shadow cursor-pointer
                    ${newDate.getMonth() != firstDay.getMonth() ? "text-gray-500 bg-gray-500/5" : (sameDay(props.activeDate, newDate) ? "active bg-blue-500 text-white" : "bg-gray-500/10 hover:bg-gray-500/30")}
                    ${sameDay(todayDate, newDate) ? "outline outline-2 outline-white/75 " : ""}`}
                initial={{ x: direction * 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -direction * 50, opacity: 0 }}
                transition={{ duration: 0.1 }}
            >
                {newDate.getDate()}
            </motion.div>
        )
    });

    // WARNING: sets date back to 1
    function neighborMonth(date, i) {
        var newDate = new Date(date);
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() + i);

        return newDate;
    }

    function checkDateToDisplay(date) {
        if (date.getMonth() != dateToDisplay.getMonth()) {
            date < dateToDisplay ? setDirection(-1) : setDirection(1);
            setTimeout(() => {
                setDateToDisplay(date);
            }, 0);
        }
    }

    return (
        <>
            <div className="flex justify-between">
                <div onClick={() =>  checkDateToDisplay(neighborMonth(dateToDisplay, -1)) } className="w-12 h-12 text-blue-500 inline-flex justify-center items-center cursor-pointer hover:-translate-x-1 duration-150 rounded-lg">
                    <i className="fa-solid fa-angle-left" style={{ fontSize: "1.5em" }}></i>
                </div>
                <div className="text-center">
                    <AnimatePresence exitBeforeEnter>
                        <motion.div className="capitalize text-white font-bold text-xl"
                            key={dateToDisplay}
                            initial={{ x: direction * 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -direction * 50, opacity: 0 }}
                            transition={{ duration: 0.1 }}
                        >
                            {new Intl.DateTimeFormat(["fr"], { month: "long" }).format(dateToDisplay)}
                        </motion.div>
                    </AnimatePresence>
                    <div>{dateToDisplay.getFullYear()}</div>
                </div>
                <div onClick={() => checkDateToDisplay(neighborMonth(dateToDisplay, 1)) } className="w-12 h-12 text-blue-500 inline-flex justify-center items-center cursor-pointer hover:translate-x-1 duration-150 rounded-lg">
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
                <AnimatePresence exitBeforeEnter>{calendarDates}</AnimatePresence>

            </div>
        </>
    )
}