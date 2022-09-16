import React, { useState } from "react";
import Calendar from '../components/Calendar';
import { nanoid } from "nanoid";

const CATEGORIES = [
    { id: 1, name: "Maison", faCode: "fa-home" },
    { id: 2, name: "Santé", faCode: "fa-kit-medical" },
    { id: 3, name: "Sport", faCode: "fa-running" },
    { id: 4, name: "Divertissement", faCode: "fa-film" },
    { id: 5, name: "Etudes", faCode: "fa-graduation-cap" },
    { id: 6, name: "Alimentation", faCode: "fa-utensils" },
];

export default function AddTaskModal(props) {
    const [newCategory, setNewCategory] = useState();
    const [newName, setNewName] = useState("");
    const [newDate, setNewDate] = useState(new Date());
    const [state, setState] = useState(0);
    var template;
    const categoriesList = CATEGORIES.map((category) => (
        <div key={category.id} onClick={() => setNewCategory(category.id)} className={`flex shadow-md p-2 rounded-xl justify-between items-center cursor-pointer duration-150 outline-blue-500 ${newCategory === category.id ? "outline outline-1 outline-offset-2 bg-gray-800/30" : "text-gray-500 bg-gray-500/10 hover:bg-gray-500/20"}`}>
            <p>{category.name}</p>
            <div className="flex-none w-9 h-9 bg-white/10 rounded-lg inline-flex justify-center items-center">
                <i className={`icon fa-solid text-md icon ${category.faCode} ${category.name}`}></i>
            </div>
        </div>
    ));

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function addTask() {
        const newTask = { id: nanoid(), name: newName, category: newCategory, checked: false, repeatable: false, targetDate: newDate };
        props.addTask(newTask);
        setNewName("");
        setNewCategory();
        props.setShowModal(false);
    }



    const nameCategoryTemplate = (
        <>
            <div className="mb-7 text-center text-lg">New task</div>
            <div className="relative">
                <input onChange={handleChange} value={newName} type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="floating_outlined" className="pointer-events-none absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Task name</label>
            </div>
            <div className="grid gap-2 grid-cols-2 mt-5">
                {categoriesList}
            </div>
            <div className="flex space-x-5 mt-10">
                <button className="w-full border border-gray-400 hover:bg-gray-600 rounded-lg text-center px-3 py-2" onClick={() => { setNewName(""); setNewCategory(); props.setShowModal(false) }}>Cancel</button>
                <button disabled={newName.length == 0 || newCategory == undefined ? true : false} className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-500" onClick={() => setState(state + 1)}>Next</button>
            </div>
        </>
    );

    const calendarTemplate = (
        <>
            <div className="mb-7 text-center text-lg">When do you want to schedule the task?</div>
            <Calendar activeDate={newDate} setActiveDate={setNewDate} />
            <div className="flex space-x-5 mt-10">
                <button className="w-full border border-gray-400 hover:bg-gray-600 rounded-lg text-center px-3 py-2" onClick={() => setState(state - 1)}>Previous</button>
                <button disabled={newName.length == 0 || newCategory == undefined ? true : false} className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-500" onClick={addTask}>Next</button>
            </div>
        </>
    );

    const TEMPLATES = [nameCategoryTemplate, calendarTemplate];

    return (
        <div id="modal" aria-hidden="true" className="z-20 top-0 w-full h-full fixed bg-black/70 place-content-center inline-flex justify-center items-center">
            <div className="items-center bg-gray-700 text-gray-300 rounded-lg p-10 w-1/3">
                {TEMPLATES[state]}
            </div>
        </div>
    )
}