import Head from 'next/head'
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { motion, AnimatePresence } from "framer-motion"
import Task from '../components/Task';
import DatesSlider from '../components/DatesSlider';
import TaskModal from '../components/TaskModal';
import CategoriesModal from '../components/CategoriesModal';
import { sameDay, date1BeforeDate2 } from '../utilities/Utilities';

const TASKS = [
    { id: nanoid(), name: "Méditation", category: 2, checked: [], startDate: new Date(), repeatable: true, repeat: { rule: "daily" } },
    { id: nanoid(), name: "Aspirateur", category: 1, checked: [], startDate: new Date(), repeatable: true, repeat: { rule: "week", value: [0, 3] } },
    { id: nanoid(), name: "Poussières", category: 1, checked: [], startDate: new Date(), repeatable: true, repeat: { rule: "month", value: [1, 15] } },
    { id: nanoid(), name: "Vaisselle", category: 6, checked: [], startDate: new Date(), repeatable: true, repeat: { rule: "daily" } },
    { id: nanoid(), name: "Jogging", category: 3, checked: [], startDate: new Date(2022, 8, 13), repeatable: true, repeat: { rule: "week", value: [0, 2, 4] } },
    { id: nanoid(), name: "Magie", category: 5, checked: [], startDate: new Date(2022, 8, 11), repeatable: true, repeat: { rule: "day", value: 3 } },
    { id: nanoid(), name: "Nettoyer douche", category: 0, checked: [new Date(2022, 8, 16)], startDate: new Date(2022, 8, 15), repeatable: false, repeat: {rule: "", value: ""} },
    { id: nanoid(), name: "Piano 777", category: 5, checked: [], startDate: new Date(2022, 8, 16), repeatable: false, repeat: {rule: "", value: ""} },
];

const CATEGORIES = [
    { id: 0, name: "Tâche", faCode: "fa-tasks", color: "#06b6d4" },
    { id: 1, name: "Maison", faCode: "fa-home", color: "#f97316" },
    { id: 2, name: "Santé", faCode: "fa-kit-medical", color: "#10b981" },
    { id: 3, name: "Sport", faCode: "fa-running", color: "#3b82f6" },
    { id: 4, name: "Divertissement", faCode: "fa-film", color: "#0ea5e9" },
    { id: 5, name: "Etudes", faCode: "fa-graduation-cap", color: "#8b5cf6" },
    { id: 6, name: "Alimentation", faCode: "fa-utensils", color: "#ef4444" },
];

export default function Todo() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showCategoriesModal, setShowCategoriesModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [tasks, setTasks] = useState(TASKS);
    const [categories, setCategories] = useState(CATEGORIES);
    const [idToDelete, setIdToDelete] = useState("");
    const [taskToEdit, setTaskToEdit] = useState();
    const [activeDate, setActiveDate] = useState(new Date());
    const [toastMessage, setToastMessage] = useState("");

    const taskList = tasks.filter((task) => {
        if (!date1BeforeDate2(task.startDate, activeDate)) return;      // Filter if active date is before starting date

        if (!task.repeatable && task.checked.length > 0) {
            if (!sameDay(task.checked[0], activeDate)) return;          // Filter if non repeatable task was checked another day
        }

        if (task.repeatable) {
            switch (task.repeat.rule) {
                case "daily":
                    break;
                case "week":
                    var day = activeDate.getDay() === 0 ? 6 : activeDate.getDay() - 1;  //Formate day back to Monday = 0, Tuesday = 1 etc..
                    if (!task.repeat.value.includes(day)) return;
                    break;
                case "month":
                    if (!task.repeat.value.includes(activeDate.getDate())) return;
                    break;
                case "day":
                    var testDate = new Date(task.startDate);
                    var isMultiple = false;
                    do {
                        if (sameDay(testDate, activeDate)) isMultiple = true;
                        testDate.setDate(testDate.getDate() + task.repeat.value);
                    } while (date1BeforeDate2(testDate, activeDate))
                    if (!isMultiple) return;
                    break;
                default:
                    break;
            }
        }
        return task;
    }).map((task) => {
        const category = categories.filter(category => { if (category.id === task.category) return category })[0];
        return (
            <Task
                key={task.id}
                task={task}
                activeDate={activeDate}
                category={category}
                toggleTask={toggleTask}
                deleteTask={askDelete}
                editTask={(id) => {setTaskToEdit(tasks.find((task) => task.id == id)); setShowTaskModal(true)}}
            />
        )
    });

    function toggleTask(id) {
        const updatedTasks = tasks.map((task) => {
            if (task.id !== id) return task;

            if (task.checked.find(date => sameDay(date, activeDate))) task.checked = task.checked.filter((date) => { !sameDay(date, activeDate) });
            else task.checked.push(activeDate);
            return task;
        });
        setTasks(updatedTasks);
    }

    function editTask(editedTask) {
        const updatedTasks = tasks.map((task) => {
            if (task.id === editedTask.id) return editedTask;
            else return task;
        });
        setTasks(updatedTasks);
        displayToast("Task edited !");
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

    function editCategory(editedCategory) {
        const updatedCategories = categories.map((category) => {
            if (category.id === editedCategory.id) category = editedCategory;
            return category;
        });
        setCategories(updatedCategories);
    }

    function createCategory(newCategory) {
        setCategories([...categories, newCategory]);
    }

    function deleteCategory(id) {
        const updatedTasks = tasks.map((task) => {
            if (task.category === id) task.category = 0;
            return task;
        });
        setTasks(updatedTasks);

        const remainingCategories = categories.filter((category) => category.id !== id);
        setCategories(remainingCategories);
    }

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
            </Head>

            {/* DATES */}
            <DatesSlider activeDate={activeDate} setActiveDate={setActiveDate} tasks={tasks} />

            {/* TASKS LIST */}
            <div className="flex justify-center">
                <div className="w-2/5">
                    {taskList}
                </div>
            </div>

            <div onClick={() => setShowCategoriesModal(true)} className="fixed bottom-36 right-10 bg-pink-500 w-12 h-12 inline-flex justify-center items-center rounded-2xl cursor-pointer shadow-md hover:bg-pink-700 duration-150">
                <i className="fa-solid fa-tags" style={{ fontSize: "1.2em" }}></i>
            </div>

            <div onClick={() => {setTaskToEdit(); setShowTaskModal(true) }} className="fixed bottom-10 right-10 bg-blue-500 w-20 h-20 inline-flex justify-center items-center rounded-2xl cursor-pointer shadow-md hover:bg-blue-700 duration-150">
                <i className="fa-solid fa-plus" style={{ fontSize: "1.5em" }}></i>
            </div>

            {showTaskModal ? (
                <TaskModal addTask={addTask} editTask={editTask} setShowModal={setShowTaskModal} categories={categories} task={taskToEdit} />
            ) : null}

            {showDeleteModal ? (
                <div id="modal" aria-hidden="true" className="z-20 top-0 w-full h-full fixed bg-black/70 place-content-center inline-flex justify-center items-center">
                    <div className="items-center bg-gray-700 text-gray-300 rounded-lg p-8">
                        <div className="flex justify-center mb-7">
                            <i className="fa-solid fa-exclamation-circle" style={{ fontSize: "2em" }}></i>
                        </div>
                        <h3 className="text-lg mb-5">Are you sure you want to delete this task?</h3>
                        <div className="flex space-x-5">
                            <button className="w-full border border-gray-400 hover:bg-gray-600 rounded-lg text-center px-3 py-2" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center px-3 py-2" onClick={() => { deleteTask(); setShowDeleteModal(false) }}>Confirm</button>
                        </div>
                    </div>
                </div>
            ) : null}

            {showCategoriesModal ? (
                <CategoriesModal categories={categories} setShowModal={setShowCategoriesModal} editCategory={editCategory} createCategory={createCategory} deleteCategory={deleteCategory} />
            ) : null}

            <AnimatePresence>
                {showToast ? (
                    <motion.div id="addToast" className="fixed left-1/2 bottom-5 px-8 bg-emerald-500 text-sm rounded-lg"
                        initial={{ scale: 0, y: -50, x: "-50%" }}
                        animate={{ scale: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, type: "spring" }}
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
