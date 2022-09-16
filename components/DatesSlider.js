import React, { useState, useEffect } from "react";
import Calendar from '../components/Calendar';
import sameDay from '../utilities/Utilities';

export default function DatesSlider(props) {
    var todayDate = new Date();
    const [showModal, setShowModal] = useState(false);
    const [datesLoaded, setDatesLoaded] = useState([...Array(101)].map((element, index) => {
        var date = new Date();
        date.setDate(date.getDate() + index - Math.floor((101 / 2)));
        return date;
    }));

    const datesList = datesLoaded.map((date) => {
        var weekday = new Intl.DateTimeFormat(["fr"], { weekday: "short" }).format(date).slice(0, 3);
        var month = new Intl.DateTimeFormat(["fr"], { month: "long" }).format(date);

        return (
            <div
                key={date.getTime()}
                id={date.getTime()}
                onClick={changeDate}
                className={`date group text-white/80 shadow-md relative duration-150 text-center w-12 h-16 rounded-2xl flex flex-col justify-between cursor-pointer
                    ${sameDay(props.activeDate, date) ? "active bg-blue-500" : "hover:bg-gray-600 bg-gray-700"}
                    ${sameDay(date, todayDate) ? (sameDay(props.activeDate, date) ? "today outline outline-2 outline-offset-2 outline-blue-300" : "today outline outline-2 outline-white/50") : null}`}
            >
                {date.getDate() == 1 &&
                    <div className="flex absolute -top-7 left-3 rounded-lg">
                        <span className="capitalize text-gray-300 text-sm italic">{month}</span>
                        <div className="absolute w-1 h-4 bg-white/50 -left-3 top-1 rounded-r"></div>
                    </div>
                }
                <div className="grow inline-flex justify-center items-center capitalize" style={{ fontSize: "0.7em" }}>{weekday}</div>
                <div className={`dateNumber duration-150 rounded-b-2xl rounded-t-xl h-10 leading-8 font-bold ${sameDay(props.activeDate, date) ? "active bg-blue-600 text-white" : "group-hover:bg-gray-500 bg-gray-600"}`}>{date.getDate()}</div>
                <span className="slot invisible w-4 h-1 absolute bottom-0 bg-white/70 left-4 rounded-t"></span>
            </div>
        )
    });



    function changeDateCalendar(newDate) {
        setDatesLoaded([...Array(101)].map((element, index) => {
            var date = new Date(newDate);
            date.setDate(date.getDate() + index - Math.floor((101 / 2)));
            return date;
        }));
        setShowModal(false);
        props.setActiveDate(newDate);
    }

    function changeDate(e) {
        if (scrolled) {
            scrolled = false;
            return;
        }
        var newActiveDate = new Date(parseInt(e.target.closest(".date").getAttribute("id")));
        props.setActiveDate(newActiveDate);
    }

    useEffect(() => {
        if (document.getElementsByClassName("active").length > 0) document.getElementsByClassName("active")[0].scrollIntoView({ behavior: 'smooth', inline: "center" });
    }, [props.activeDate]);


    var isScrolling = false;
    var clientX;
    var scrollLeft;
    var scrolled = false;

    function onMouseDown(e) {
        clientX = e.clientX;
        scrollLeft = document.getElementById("datesGrid").scrollLeft;
        isScrolling = true;
    }

    function onMouseUp() {
        isScrolling = false;
    }

    function onMouseLeave() {
        isScrolling = false;
    }

    function onMouseMove(e) {
        if (!isScrolling) return;
        var grid = document.getElementById("datesGrid");
        var walk = clientX - e.clientX;
        grid.scrollLeft = scrollLeft + walk;
        if (Math.abs(scrollLeft - grid.scrollLeft) > 20) scrolled = true;
    }



    /*function checkLoadDates() {
        const grid = document.getElementById("datesGrid");
        const scrollRatio = grid.scrollLeft / (grid.scrollWidth - grid.clientWidth);

        const threshold = 0.25;
        const numberOfDatesToLoad = 25;
        if (scrollRatio > 1-threshold) {
            var datesToAdd = [];
            for (var i = 0; i < numberOfDatesToLoad; i++) {
                var newDate = new Date(datesLoaded.at(-1));
                newDate.setDate(newDate.getDate() + i + 1);
                datesToAdd = [...datesToAdd, newDate];
            }
            
            setDatesLoaded([...datesLoaded, ...datesToAdd]);
        }
        else if (scrollRatio < threshold) {
            var datesToAdd = [];
            for (var i = 0; i < numberOfDatesToLoad; i++) {
                var newDate = new Date(datesLoaded.at(0));
                newDate.setDate(newDate.getDate() - i - 1);
                datesToAdd = [newDate, ...datesToAdd];
            }
            setDatesLoaded([...datesToAdd, ...datesLoaded]);
        }
    }*/

    return (
        <>
            <div className="relative">
                <div className="
            w-9/12 relative mx-auto rounded-l-2xl mt-10 mb-5
            before:block before:absolute before:pointer-events-none before:bg-gradient-to-r before:from-slate-900 before:w-24 before:h-full before:left-0 before:top-0 before:z-10
            after:block after:absolute after:pointer-events-none after:bg-gradient-to-r after:from-slate-900 after:w-24 after:h-full after:right-0 after:top-0 after:z-10 after:scale-x-flip
            ">
                    <div
                        id="datesGrid"
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseDown={onMouseDown}
                        onMouseLeave={onMouseLeave}
                        className="relative grid grid-rows-1 grid-flow-col overflow-x-hidden select-none gap-3 py-7 px-24 justify-between cursor-pointer"
                    >
                        {datesList}
                    </div>
                    <div onClick={() => setShowModal(true)} className="absolute -right-24 top-8 transform w-12 h-12 text-gray-300 hover:text-white bg-gray-700 hover:bg-blue-600 p-7 rounded-lg cursor-pointer shadow-md  duration-150 inline-flex justify-center items-center">
                        <i className="fa-solid fa-calendar-alt" style={{ fontSize: "1.5em" }}></i>
                    </div>
                </div>
            </div>
            {showModal ? (
                <div id="modal" aria-hidden="true" className="z-20 top-0 w-full h-full fixed bg-black/70 place-content-center inline-flex justify-center items-center">
                    <div className="items-center bg-gray-700 text-gray-300 rounded-lg p-10">
                        <Calendar activeDate={props.activeDate} setActiveDate={changeDateCalendar} />
                    </div>
                </div>
            ) : null}
        </>

    )
}