import Head from 'next/head'
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { motion, AnimatePresence } from "framer-motion"
import Task from '../components/Task';
import DatesSlider from '../components/DatesSlider';
import AddTaskModal from '../components/AddTaskModal';
import sameDay from '../utilities/Utilities';

const TASKS = [
    { id: nanoid(), name: "Méditation", category: 2, checked: false, repeatable: true, targetDate: new Date() },
    { id: nanoid(), name: "Aspirateur", category: 1, checked: true, repeatable: true, targetDate: new Date() },
    { id: nanoid(), name: "Poussières", category: 1, checked: false, repeatable: true, targetDate: new Date() },
    { id: nanoid(), name: "Vaisselle", category: 6, checked: false, repeatable: false, targetDate: new Date(2022, 8, 13) },
    { id: nanoid(), name: "Jogging", category: 3, checked: false, repeatable: true, targetDate: new Date(2022, 8, 13) },
    { id: nanoid(), name: "Magie", category: 5, checked: false, repeatable: true, targetDate: new Date(2022, 8, 11) },
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
    const [showToast, setShowToast] = useState(false);
    const [tasks, setTasks] = useState(TASKS);
    const [idToDelete, setIdToDelete] = useState("");
    const [activeDate, setActiveDate] = useState(new Date());
    const [toastMessage, setToastMessage] = useState("");

    const taskList = tasks.filter((task) => {
        if (sameDay(task.targetDate, activeDate)) return task;
    }).map((task) => {
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
        displayToast("Task deleted!");
    }

    function addTask(newTask) {
        setTasks([...tasks, newTask]);
        displayToast("New task created!");
    }

    function displayToast(message) {
        setToastMessage(message);

        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    }

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
            </Head>

            {/* DATES */}
            <DatesSlider activeDate={activeDate} setActiveDate={setActiveDate} />

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
                <AddTaskModal addTask={addTask} setShowModal={setShowAddModal} />
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

            <AnimatePresence>
            {showToast ? (
                <motion.div id="addToast" className="fixed right-10 bottom-32 px-8 mx-auto bg-emerald-500 shadow-lg text-sm rounded-lg mb-3"
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 , type: "spring" }}
                >
                    <div className="text-center flex justify-between items-center py-2 px-3">
                        <svg className="absolute w-4 h-4 mr-2 left-3 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                        </svg>
                        <div className="font-bold text-center w-full">{toastMessage}</div>
                    </div>
                </motion.div>
            ) : null}
            </AnimatePresence>
            
        </div>
    )
}
