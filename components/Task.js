import React, { useState } from "react";

const ICONS = {
    Maison: "fa-home",
    Santé: "fa-kit-medical",
    Sport: "fa-running",
}

export default function Task(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState(props.name);
    const repeatableIcon = (
        <div className="p-1 inline ml-2 rounded-md bg-white/10 inline-flex justify-center items-center">
            <i className="icon fa-solid fa-sync text-xs text-slate-400"></i>
        </div>
    );

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit() {
        props.editTask(props.id, newName);
        setEditing(false);
    }

    const viewTemplate = (
        <div className="group w-full relative flex px-24 text-gray-300">
            <div onClick={() => props.deleteTask(props.id)} className="w-10 h-1/2 absolute top-1/2 transform -translate-y-1/2 left-0 invisible group-hover:visible transition-colors text-slate-500 hover:text-red-500 duration-150 inline-flex justify-center items-center cursor-pointer">
                <i className="icon fa-solid fa-trash-alt text-xl"></i>
            </div>
            <div onClick={() => setEditing(true)} className="w-10 h-1/2 absolute top-1/2 transform -translate-y-1/2 left-10 invisible group-hover:visible transition-colors text-slate-500 hover:text-blue-500 duration-150 inline-flex justify-center items-center cursor-pointer">
                <i className="icon fa-solid fa-edit text-xl"></i>
            </div>
            <div className="flex w-full p-4 justify-between group-hover:bg-white/10 border-b border-white/30">
                <div className="flex">
                    <div className="w-11 h-11 bg-white/10 rounded-lg m-1 mr-5 inline-flex justify-center items-center">
                        <i className={"icon fa-solid text-xl " + ICONS[props.category] + " " + props.category}></i>
                    </div>
                    <div className="">
                        <p className="text-lg mb-1">{props.name}</p>
                        <div>
                            <p className={"category text-xs inline p-1 rounded-md " + props.category}>{props.category}</p>
                            {props.repeatable ? repeatableIcon : null}
                        </div>
                    </div>
                </div>

                <div className="inline-flex items-center ml-4">
                    <input
                        defaultChecked={props.checked}
                        onChange={() => props.toggleTask(props.id)}
                        type="checkbox"
                        className="w-7 h-7 cursor-pointer text-emerald-500 rounded-full bg-white/10 border-0 duration-75 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-[#1d2738] focus:ring-offset-4">
                    </input>
                </div>
            </div>
        </div>
    );

    const editingTemplate = (
        <div className="group w-full relative flex px-24 text-gray-300">
            <div onClick={handleSubmit} className="w-10 h-1/2 absolute top-1/2 transform -translate-y-1/2 left-10 transition-colors text-slate-500 hover:text-green-500 duration-150 inline-flex justify-center items-center cursor-pointer">
                <i className="icon fa-solid fa-check-circle text-xl"></i>
            </div>
            <div className="flex w-full p-4 justify-between bg-blue-500/20 group-hover:bg-blue-500/30 border-b border-white/30">
                <div className="flex grow">
                    <div className="flex-none w-11 h-11 bg-white/10 rounded-lg m-1 mr-5 inline-flex justify-center items-center">
                        <i className={"icon fa-solid text-xl " + ICONS[props.category] + " " + props.category}></i>
                    </div>
                    <div className="flex grow flex-wrap">
                        <input type="text" onChange={handleChange} defaultValue={props.name} className="bg-transparent mb-1 grow border-0 p-0 text-lg outline outline-1 outline-blue-500 rounded-lg px-2"></input>
                        <div className="grow">
                            <p className={"category text-xs inline p-1 rounded-md " + props.category}>{props.category}</p>
                            {props.repeatable ? repeatableIcon : null}
                        </div>
                    </div>
                </div>

                <div className="inline-flex items-center ml-4">
                    <input
                        defaultChecked={props.checked}
                        onChange={() => props.toggleTask(props.id)}
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