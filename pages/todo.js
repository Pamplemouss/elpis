import Head from 'next/head'
import React, { useState } from "react";
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
    const taskList = tasks.map((task) => {
        var category = CATEGORIES.filter(category => { if (category.id === task.category) return category });
        var categoryName = category[0].name;
        var categoryFaCode = category[0].faCode;
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
                editTask={editTask} />
        )
    });
    const categoriesList = CATEGORIES.map((category) => (
        <div key={category.id} onClick={() => setNewCategory(category.id)} className={`flex border border-gray-500 p-2 rounded-xl justify-between items-center hover:bg-gray-600 cursor-pointer duration-75 ${newCategory === category.id ? "bg-blue-500/30 hover:bg-blue-500/50" : null}`}>
            <p>{category.name}</p>
            <div className="flex-none w-9 h-9 bg-white/10 rounded-lg inline-flex justify-center items-center">
                <i className={`icon fa-solid text-md icon ${category.faCode} ${category.name}`}></i>
            </div>
        </div>
    ));

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

    return (
        <div className="flex justify-center">
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
            </Head>
            <div className="w-2/5 my-10">
                {taskList}
            </div>

            <div onClick={() => setShowAddModal(true)} className="fixed bottom-10 right-10 bg-blue-500 p-7 rounded-2xl cursor-pointer shadow-md hover:bg-blue-700 duration-150">
                <i className="fa-solid fa-plus" style={{ fontSize: "1.5em" }}></i>
            </div>

            {showAddModal ? (
                <div id="modal" aria-hidden="true" className="w-full h-full fixed bg-black/70 place-content-center inline-flex justify-center items-center">
                    <div className="items-center bg-gray-700 text-gray-300 rounded-lg p-10 w-1/3">
                        <div className="relative">
                            <input onChange={handleChange} type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Task name</label>
                        </div>
                        <h3 className="mt-7 text-xl font-bold text-center">Category</h3>
                        <div className="grid gap-2 grid-cols-2 mt-5">
                            {categoriesList}
                        </div>
                        <div className="flex space-x-5 mt-10">
                            <button disabled={newName.length == 0 || newCategory == undefined ? true : false} className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-500" onClick={() => {addTask(); setShowAddModal(false)}}>Confirm</button>
                            <button className="w-full border border-gray-400 hover:bg-gray-600 rounded-lg text-center px-3 py-2" onClick={() => { setNewName(""); setNewCategory(); setShowAddModal(false) }}>Cancel</button>
                        </div>
                    </div>
                </div>
            ) : null}

            {showDeleteModal ? (
                <div id="modal" aria-hidden="true" className="w-full h-full fixed bg-black/70 place-content-center inline-flex justify-center items-center">
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
