import React, { useEffect, useState } from "react";
import Calendar from './Calendar';
import { nanoid } from "nanoid";
import { AnimatePresence, motion } from "framer-motion"

export default function TaskModal(props) {
    const [newTask, setNewTask] = useState(props.task ? props.task : {
        id: "",
        name: "",
        category: "",
        checked: [],
        repeatable: false,
        repeat: { rule: "", value: "" },
        startDate: new Date().getTime()
    });

    const [repeatWeek, setRepeatWeek] = useState(newTask.repeat?.rule === "week" ? newTask.repeat.value : []);
    const [repeatMonth, setRepeatMonth] = useState(newTask.repeat?.rule === "month" ? newTask.repeat.value : []);
    const [repeatDay, setRepeatDay] = useState(newTask.repeat?.rule === "day" ? newTask.repeat.value : 2);
    const [state, setState] = useState(0);
    const [repeatRuleValid, setRepeatRuleValid] = useState(true);
    const categoriesList = props.categories.map((category) => (
        <div key={category.id} onClick={() => setNewTask({ ...newTask, category: category })} className={`flex shadow-md p-2 rounded-xl justify-between items-center cursor-pointer hover:duration-150 outline-blue-500 ${newTask.category.id === category.id ? "outline outline-1 outline-offset-2 bg-gray-800/30" : "text-gray-500 bg-gray-500/10 hover:bg-gray-500/20"}`}>
            <p className="text-sm md:text-base">{category.name}</p>
            <div className="flex-none w-9 h-9 bg-white/10 rounded-lg inline-flex justify-center items-center md:ml-5">
                <i className={`fa-solid text-md ${category.faCode}`} style={{ color: category.color }}></i>
            </div>
        </div>
    ));

    function handleChangeName(e) {
        setNewTask({ ...newTask, name: e.target.value });
    }

    function handleChangeRule(e) {
        setNewTask({ ...newTask, repeat: { ...newTask.repeat, rule: e.target.value } });
    }

    useEffect(() => {
        switch (newTask.repeat?.rule) {
            case "daily":
                setRepeatRuleValid(true);
                break;
            case "week":
                repeatWeek.length > 0 ? setRepeatRuleValid(true) : setRepeatRuleValid(false);
                break;
            case "month":
                repeatMonth.length > 0 ? setRepeatRuleValid(true) : setRepeatRuleValid(false);
                break;
            case "day":
                repeatDay > 0 ? setRepeatRuleValid(true) : setRepeatRuleValid(false);
                break;
            default:
                break;
        }
    }, [newTask, repeatWeek, repeatMonth, repeatDay]);

    function handleChangeWeek(e) {
        var day = parseInt(e.target.getAttribute("day"));
        repeatWeek.includes(day) ? setRepeatWeek(repeatWeek.filter(date => date != day)) : setRepeatWeek([...repeatWeek, day]);
    }

    function handleChangeDay(e) {
        setRepeatDay(parseInt(e.target.value));
    }

    function returnTask() {
        var value;
        switch (newTask.repeat.rule) {
            case "daily":
                value = ""
                break;
            case "week":
                value = repeatWeek;
                break;
            case "month":
                value = repeatMonth;
                break;
            case "day":
                value = repeatDay;
                break;
            default:
                break;
        }
        var taskToReturn = { ...newTask, repeat: { ...newTask.repeat, value: value } };
        props.task ? props.editTask(taskToReturn) : props.addTask(taskToReturn);
    }

    function toggleDate(e) {
        var day = parseInt(e.target.getAttribute("value"));
        repeatMonth.includes(day) ? setRepeatMonth(repeatMonth.filter(date => date != day)) : setRepeatMonth([...repeatMonth, day]);
    }

    const nameCategoryTemplate = (
        <>
            <div className="mb-7 text-center text-lg">{props.task ? "Edit Task" : "New task"}</div>
            <div className="flex gap-4">
                <div className="relative w-full">
                    <input onChange={handleChangeName} value={newTask.name} type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="floating_outlined" className="pointer-events-none absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Task name</label>
                </div>
                <div onClick={() => setNewTask({ ...newTask, repeatable: !newTask.repeatable })} className={`w-16 rounded-lg inline-flex justify-center items-center cursor-pointer shadow-md duration-150 ${newTask.repeatable ? "bg-blue-500 text-white" : "bg-gray-500/10 hover:bg-gray-500/20 text-gray-500"}`}>
                    <i className="fa-solid text-md fa-sync"></i>
                </div>
            </div>
            <div className="grid gap-2 grid-cols-2 mt-5">
                {categoriesList}
            </div>
            <div className="flex space-x-5 mt-10">
                <button className="w-full border border-gray-400 hover:bg-gray-600 rounded-lg text-center px-3 py-2" onClick={() => props.setShowModal(false)}>Cancel</button>
                <button disabled={newTask.name.length == 0 || newTask.category.id == undefined ? true : false} className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-500" onClick={() => newTask.repeatable ? setState(state + 1) : setState(state + 2)}>Next</button>
            </div>
        </>
    );

    const weekMiniTemplate = (
        <motion.div className="grid grid-cols-3 gap-3 m-5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {[...Array(7)].map((element, index) => {
                var days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
                return (
                    <div key={days[index]} className="flex items-center">
                        <input onChange={handleChangeWeek} id={`checkbox-${index}`} day={index} checked={repeatWeek.includes(index)} type="checkbox" className="w-4 h-4 bg-gray-700 border-gray-600 cursor-pointer focus:ring-0 focus:ring-offset-0" />
                        <label htmlFor={`checkbox-${index}`} className="ml-2 text-sm font-medium text-gray-300 cursor-pointer">{days[index]}</label>
                    </div>
                )
            })}
        </motion.div>
    );

    const monthMiniTemplate = (
        <motion.div className="grid grid-cols-7 gap-3 m-5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {[...Array(31)].map((element, index) => {
                return (
                    <div key={index} onClick={toggleDate} value={index + 1} className={`rounded-lg w-8 h-8 text-sm inline-flex justify-center items-center shadow cursor-pointer ${repeatMonth.includes(index + 1) ? "bg-blue-500 text-white" : "bg-gray-500/10 hover:bg-gray-500/30"}`}>{index + 1}</div>
                )
            })}
        </motion.div>
    );

    const dayMiniTemplate = (
        <motion.div className="flex gap-3 m-5 mx-7 text-sm"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div>Repeat every</div>
            <input onChange={handleChangeDay} value={repeatDay} className="w-12 text-center border-b bg-white/0 focus:ring-0 focus:ring-offset-0" />
            <div>days</div>
        </motion.div>
    );

    const repeatRuleTemplate = (
        <>
            <div>
                <div className="flex items-center mb-2">
                    <input onChange={handleChangeRule} defaultChecked={newTask.repeat?.rule == "daily" || newTask.repeat?.rule == ""} id="default-radio-1" type="radio" value="daily" name="repeatRule" className="w-4 h-4 bg-gray-700 border-gray-600 cursor-pointer focus:ring-0 focus:ring-offset-0" />
                    <label htmlFor="default-radio-1" className="ml-2 text-lg font-medium text-gray-300 cursor-pointer">Daily</label>
                </div>
                <div className="flex items-center mb-2">
                    <input onChange={handleChangeRule} defaultChecked={newTask.repeat?.rule == "week"} id="default-radio-2" type="radio" value="week" name="repeatRule" className="w-4 h-4 bg-gray-700 border-gray-600 cursor-pointer focus:ring-0 focus:ring-offset-0" />
                    <label htmlFor="default-radio-2" className="ml-2 text-lg font-medium text-gray-300 cursor-pointer">Certain days of the week</label>
                </div>
                <AnimatePresence>
                    {newTask.repeat?.rule == "week" ? weekMiniTemplate : null}
                </AnimatePresence>

                <div className="flex items-center mb-2">
                    <input onChange={handleChangeRule} defaultChecked={newTask.repeat?.rule == "month"} id="default-radio-3" type="radio" value="month" name="repeatRule" className="w-4 h-4 bg-gray-700 border-gray-600 cursor-pointer focus:ring-0 focus:ring-offset-0" />
                    <label htmlFor="default-radio-3" className="ml-2 text-lg font-medium text-gray-300 cursor-pointer">Certain days of the month</label>
                </div>
                <AnimatePresence>
                    {newTask.repeat?.rule == "month" ? monthMiniTemplate : null}
                </AnimatePresence>

                <div className="flex items-center">
                    <input onChange={handleChangeRule} defaultChecked={newTask.repeat?.rule == "day"} id="default-radio-4" type="radio" value="day" name="repeatRule" className="w-4 h-4 bg-gray-700 border-gray-600 cursor-pointer focus:ring-0 focus:ring-offset-0" />
                    <label htmlFor="default-radio-4" className="ml-2 text-lg font-medium text-gray-300 cursor-pointer">Every X days</label>
                </div>
                <AnimatePresence>
                    {newTask.repeat?.rule == "day" ? dayMiniTemplate : null}
                </AnimatePresence>
            </div>

            <div className="flex space-x-5 mt-10">
                <button className="w-full border border-gray-400 hover:bg-gray-600 rounded-lg text-center px-3 py-2" onClick={() => setState(state - 1)}>Previous</button>
                <button disabled={!repeatRuleValid} className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-500" onClick={() => setState(state + 1)}>Next</button>
            </div>
        </>
    );

    const calendarTemplate = (
        <>
            <div className="mb-7 text-center text-lg">When do you want to schedule the task?</div>
            <Calendar activeDate={new Date(newTask.startDate)} setActiveDate={(date) => setNewTask({ ...newTask, startDate: date })} />
            <div className="flex space-x-5 mt-10">
                <button className="w-full border border-gray-400 hover:bg-gray-600 rounded-lg text-center px-3 py-2" onClick={() => newTask.repeatable ? setState(state - 1) : setState(state - 2)}>Previous</button>
                <button className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-500" onClick={() => { returnTask(); props.setShowModal(false); }}>{props.task ? "Edit" : "Create"}</button>
            </div>
        </>
    );

    const TEMPLATES = [nameCategoryTemplate, repeatRuleTemplate, calendarTemplate];

    return (
        <>
            <motion.div id="modal" aria-hidden="true" className="z-20 top-0 w-full h-full fixed bg-black/70 place-content-center inline-flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            ></motion.div>
            <div className="z-30 top-0 w-full h-full fixed place-content-center inline-flex justify-center items-center">
                <motion.div className="relative items-center bg-gray-700 text-gray-300 rounded-lg p-4 md:p-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3, type: "spring" }}
                >
                    <AnimatePresence exitBeforeEnter>
                        <motion.div key={state}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {TEMPLATES[state]}
                        </motion.div>
                    </AnimatePresence>
                    <div onClick={() => props.setShowModal(false)} className="w-5 h-5 rounded-lg absolute top-2 right-2 inline-flex justify-center items-center cursor-pointer text-white/30 hover:text-white hover:shadow">
                        <i className="fa-solid fa-times"></i>
                    </div>
                </motion.div>
            </div>
        </>
    )
}