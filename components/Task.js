import React, { useState } from "react";
import { getBGColor } from '../utilities/Utilities';
import { sameDay } from '../utilities/Utilities';

export default function Task(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState(props.task.name);
    const repeatableIcon = (
        <div className="w-6 h-6 inline ml-2 rounded-md bg-white/20 inline-flex justify-center items-center">
            <i className="fa-solid fa-sync text-xs text-slate-400"></i>
        </div>
    );

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit() {
        props.editTask(props.task.id, newName);
        setEditing(false);
    }

    const viewTemplate = (
        <div className="group w-full relative flex px-24 text-gray-300">
            <div onClick={() => props.deleteTask(props.task.id)} className="w-10 h-1/2 absolute top-1/2 -translate-y-1/2 left-0 invisible group-hover:visible transition-colors text-slate-500 hover:text-red-500 duration-150 inline-flex justify-center items-center cursor-pointer">
                <i className="fa-solid fa-trash-alt text-xl"></i>
            </div>
            <div onClick={() => setEditing(true)} className="w-10 h-1/2 absolute top-1/2 -translate-y-1/2 left-10 invisible group-hover:visible transition-colors text-slate-500 hover:text-blue-500 duration-150 inline-flex justify-center items-center cursor-pointer">
                <i className="fa-solid fa-edit text-xl"></i>
            </div>
            <div className="flex w-full p-4 justify-between group-hover:bg-white/10 border-b border-white/30">
                <div className="flex">
                    <div className="w-11 h-11 bg-white/10 rounded-lg m-1 mr-5 inline-flex justify-center items-center">
                        <i className={`fa-solid text-xl ${props.category.faCode}`} style={{ color: props.category.color }}></i>
                    </div>
                    <div>
                        <p className="text-lg mb-1">{props.task.name}</p>
                        <div>
                            <div className="category text-xs inline p-1 rounded-md" style={{ color: props.category.color, backgroundColor: getBGColor(props.category.color) }}>{props.category.name}</div>
                            {props.task.repeatable ? repeatableIcon : null}
                        </div>
                    </div>
                </div>

                <div className="inline-flex items-center ml-4">
                    <input
                        checked={props.task.checked.find((date) => sameDay(date, props.activeDate))}
                        onClick={() => props.toggleTask(props.task.id)}
                        type="checkbox"
                        className="w-7 h-7 cursor-pointer text-emerald-500 rounded-full bg-white/10 border-0 duration-75 focus:ring-1 focus:ring-emerald-500 focus:ring-offset-[#1d2738] focus:ring-offset-3">
                    </input>
                </div>
            </div>
        </div>
    );

    const editingTemplate = (
        <div className="group w-full relative flex px-24 text-gray-300">
            <div onClick={handleSubmit} className="w-10 h-1/2 absolute top-1/2 -translate-y-1/2 left-10 transition-colors text-slate-500 hover:text-green-500 duration-150 inline-flex justify-center items-center cursor-pointer">
                <i className="fa-solid fa-check-circle text-xl"></i>
            </div>
            <div className="flex w-full p-4 justify-between bg-blue-500/20 group-hover:bg-blue-500/30 border-b border-white/30">
                <div className="flex grow">
                    <div className="flex-none w-11 h-11 bg-white/10 rounded-lg m-1 mr-5 inline-flex justify-center items-center">
                        <i className={`fa-solid text-xl ${props.category.faCode}`} style={{ color: props.category.color }}></i>
                    </div>
                    <div className="flex grow flex-wrap">
                        <div className="grow">
                            <input type="text" onChange={handleChange} defaultValue={props.task.name} className="bg-transparent mb-1 w-full border-0 p-0 text-lg outline outline-1 outline-blue-500 rounded-lg px-2"></input>
                            <div className="">
                                <p className="category text-xs inline p-1 rounded-md" style={{ color: props.category.color, backgroundColor: getBGColor(props.category.color) }}>{props.category.name}</p>
                                {props.task.repeatable ? repeatableIcon : null}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="inline-flex items-center ml-4">
                    <input
                        defaultChecked={props.task.checked.find((date) => sameDay(date, props.activeDate))}
                        onChange={() => props.toggleTask(props.task.id)}
                        type="checkbox"
                        className="w-7 h-7 flex-initial cursor-pointer text-emerald-500 rounded-full bg-white/10 border-0 duration-75 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-[#1d2738] focus:ring-offset-4">
                    </input>
                </div>
            </div>
        </div>
    );

    return (
        <>{isEditing ? editingTemplate : viewTemplate}</>
    )
}