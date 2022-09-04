import Head from 'next/head'
import React, { useState } from "react";
import Task from '../components/Task';

const TASKS = [
    { id: 1, name: "Méditation", category: "Santé", checked: false, repeatable: true },
    { id: 3, name: "Aspirateur", category: "Maison", checked: true, repeatable: true },
    { id: 4, name: "Poussières", category: "Maison", checked: false, repeatable: true },
    { id: 5, name: "Poubelles", category: "Maison", checked: false, repeatable: false },
    { id: 6, name: "Jogging", category: "Sport", checked: false, repeatable: true },
];

export default function Todo() {
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState(TASKS);
    const [idToDelete, setIdToDelete] = useState("");
    const taskList = tasks.map((task) => (
        <Task key={task.id} id={task.id} name={task.name} category={task.category} checked={task.checked} repeatable={task.repeatable} toggleTask={toggleTask} deleteTask={askDelete} editTask={editTask}/>
    ));

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
        setShowModal(true);
        setIdToDelete(id);
    }

    function deleteTask() {
        const remainingTasks = tasks.filter((task) => task.id !== idToDelete);
        setTasks(remainingTasks);
    }

    return (
        <div className="flex justify-center">
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
            </Head>
            <div className="w-2/5 my-10">
                {taskList}
            </div>

            {showModal ? (
                <div id="modal" aria-hidden="true" className="w-full h-full fixed bg-black/70 place-content-center inline-flex justify-center items-center">
                    <div className="items-center bg-gray-700 text-gray-400 rounded-lg p-8">
                        <div className="flex justify-center mb-7">
                            <i className="fa-solid fa-exclamation-circle" style={{fontSize:"3em"}}></i>
                        </div>
                        <h3 className="text-lg mb-5">Are you sure you want to delete this task?</h3>
                        <div className="flex space-x-5">
                            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center px-3 py-2" onClick={() => { deleteTask(); setShowModal(false) }}>Confirm</button>
                            <button className="w-full border border-gray-400 hover:bg-gray-600 rounded-lg text-center px-3 py-2" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
