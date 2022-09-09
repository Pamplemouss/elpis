import Head from 'next/head'
import React, { useLayoutEffect, useState } from "react";
import { nanoid } from "nanoid";
import Task from '../components/Task';

const TASKS = [
    { id: nanoid(), name: "Méditation", category: 2, checked: false, repeatable: true },
    { id: nanoid(), name: "Aspirateur", category: 1, checked: true, repeatable: true },
    { id: nanoid(), name: "Poussières", category: 1, checked: false, repeatable: true },
    { id: nanoid(), name: "Vaisselle", category: 6, checked: false, repeatable: false },
    { id: nanoid(), name: "Jogging", category: 3, checked: false, repeatable: true },
    { id: nanoid(), name: "Magie", category: 5, checked: false, repeatable: true },
];

const CATEGORIES = [
    { id: 1, name: "Maison", faCode: "fa-home" },
    { id: 2, name: "Santé", faCode: "fa-kit-medical" },
    { id: 3, name: "Sport", faCode: "fa-running" },
    { id: 4, name: "Divertissement", faCode: "fa-film" },
    { id: 5, name: "Etudes", faCode: "fa-graduation-cap" },
    { id: 6, name: "Alimentation", faCode: "fa-utensils" },
];

export default function Todo() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [tasks, setTasks] = useState(TASKS);
    const [idToDelete, setIdToDelete] = useState("");
    const [newCategory, setNewCategory] = useState();
    const [newName, setNewName] = useState("");
    const [datesLoaded, setDatesLoaded] = useState([...Array(101)].map((element, index) => {
        var date = new Date();
        date.setDate(date.getDate() + index - Math.floor((101 / 2)));
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }));

    var todayDate = new Date();
    todayDate.setHours(0);
    todayDate.setMinutes(0);
    todayDate.setSeconds(0);
    todayDate.setMilliseconds(0);
    todayDate = todayDate.getTime();

    const [activeDate, setActiveDate] = useState(todayDate);

    const taskList = tasks.map((task) => {
        const category = CATEGORIES.filter(category => { if (category.id === task.category) return category });
        const categoryName = category[0].name;
        const categoryFaCode = category[0].faCode;
        return (
            <Task
                key={task.id}
                id={task.id}
                name={task.name}
                categoryName={categoryName}
                categoryFaCode={categoryFaCode}
                checked={task.checked}
                repeatable={task.repeatable}
                toggleTask={toggleTask}
                deleteTask={askDelete}
                editTask={editTask}
            />
        )
    });
    const categoriesList = CATEGORIES.map((category) => (
        <div key={category.id} onClick={() => setNewCategory(category.id)} className={`flex border border-gray-500 shadow-md p-2 rounded-xl justify-between items-center hover:bg-gray-600 cursor-pointer duration-75 ${newCategory === category.id ? "outline outline-2 outline-blue-500 hover:bg-gray-800 bg-gray-800" : null}`}>
            <p>{category.name}</p>
            <div className="flex-none w-9 h-9 bg-white/10 rounded-lg inline-flex justify-center items-center">
                <i className={`icon fa-solid text-md icon ${category.faCode} ${category.name}`}></i>
            </div>
        </div>
    ));

    const datesList = datesLoaded.map((date) => {
        var weekday = new Intl.DateTimeFormat(["fr"], { weekday: "short" }).format(date).slice(0, 3);
        var month = new Intl.DateTimeFormat(["fr"], { month: "long" }).format(date);

        return (
            <div
                key={date.getTime()}
                id={date.getTime()}
                onClick={changeDate}
                className={`date group text-white/80 shadow-md relative duration-150 text-center w-12 h-16 rounded-2xl flex flex-col justify-between cursor-pointer
                    ${activeDate == date.getTime() ? "active bg-blue-500" : "hover:bg-gray-600 bg-gray-700"}
                    ${date.getTime() == todayDate ? (activeDate == date.getTime() ? "today outline outline-2 outline-offset-2 outline-blue-300" : "today outline outline-2 outline-white/50") : null}`}
            >
                {date.getDate() == 1 &&
                    <div className="flex absolute -top-7 left-3 rounded-lg">
                        <span className="capitalize text-gray-300 text-sm italic">{month}</span>
                        <div className="absolute w-1 h-4 bg-white/50 -left-3 top-1 rounded-r"></div>
                    </div>
                }
                <div className="grow inline-flex justify-center items-center capitalize" style={{ fontSize: "0.7em" }}>{weekday}</div>
                <div className={`dateNumber duration-150 rounded-b-2xl rounded-t-xl h-10 leading-8 font-bold ${activeDate == date.getTime() ? "active bg-blue-600 text-white" : "group-hover:bg-gray-500 bg-gray-600"}`}>{date.getDate()}</div>
                <span className="slot invisible w-4 h-1 absolute bottom-0 bg-white/70 left-4 rounded-t"></span>
            </div>
        )
    });

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function toggleTask(id) {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) task.checked = !task.checked;
            return task;
        });
        setTasks(updatedTasks);
    }

    function editTask(id, newName) {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) task.name = newName;
            return task;
        });
        setTasks(updatedTasks);
    }

    function askDelete(id) {
        setShowDeleteModal(true);
        setIdToDelete(id);
    }

    function deleteTask() {
        const remainingTasks = tasks.filter((task) => task.id !== idToDelete);
        setTasks(remainingTasks);
    }

    function addTask() {
        const newTask = { id: nanoid(), name: newName, category: newCategory, checked: false, repeatable: false };
        setTasks([...tasks, newTask]);
        setNewName("");
        setNewCategory();
    }

    function changeDate(e) {
        if (scrolled) {
            scrolled = false;
            return;
        }
        setActiveDate(e.target.closest(".date").getAttribute("id"));
    }

    useLayoutEffect(() => {
        if (document.getElementsByClassName("active").length > 0) document.getElementsByClassName("active")[0].scrollIntoView({ behavior: 'smooth', inline: "center" });
    }, [activeDate]);

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
        <div>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
            </Head>

            {/* DATES */}
            <div className="
            w-10/12 relative mx-auto rounded-l-2xl overflow-hidden mt-10 mb-5
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
                </div></div>

            {/* TASKS LIST */}
            <div className="flex justify-center">
                <div className="w-2/5">
                    {taskList}
                </div>
            </div>

            <div onClick={() => setShowAddModal(true)} className="fixed bottom-10 right-10 bg-blue-500 p-7 rounded-2xl cursor-pointer shadow-md hover:bg-blue-700 duration-150">
                <i className="fa-solid fa-plus" style={{ fontSize: "1.5em" }}></i>
            </div>

            {showAddModal ? (
                <div id="modal" aria-hidden="true" className="z-20 top-0 w-full h-full fixed bg-black/70 place-content-center inline-flex justify-center items-center">
                    <div className="items-center bg-gray-700 text-gray-300 rounded-lg p-10 w-1/3">
                        <div className="relative">
                            <input onChange={handleChange} type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Task name</label>
                        </div>
                        <div className="grid gap-2 grid-cols-2 mt-5">
                            {categoriesList}
                        </div>
                        <div className="flex space-x-5 mt-10">
                            <button disabled={newName.length == 0 || newCategory == undefined ? true : false} className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-500" onClick={() => { addTask(); setShowAddModal(false) }}>Confirm</button>
                            <button className="w-full border border-gray-400 hover:bg-gray-600 rounded-lg text-center px-3 py-2" onClick={() => { setNewName(""); setNewCategory(); setShowAddModal(false) }}>Cancel</button>
                        </div>
                    </div>
                </div>
            ) : null}

            {showDeleteModal ? (
                <div id="modal" aria-hidden="true" className="z-20 top-0 w-full h-full fixed bg-black/70 place-content-center inline-flex justify-center items-center">
                    <div className="items-center bg-gray-700 text-gray-300 rounded-lg p-8">
                        <div className="flex justify-center mb-7">
                            <i className="fa-solid fa-exclamation-circle" style={{ fontSize: "2em" }}></i>
                        </div>
                        <h3 className="text-lg mb-5">Are you sure you want to delete this task?</h3>
                        <div className="flex space-x-5">
                            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center px-3 py-2" onClick={() => { deleteTask(); setShowDeleteModal(false) }}>Confirm</button>
                            <button className="w-full border border-gray-400 hover:bg-gray-600 rounded-lg text-center px-3 py-2" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
