import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import { nanoid } from "nanoid";

const ICONS = [
    "fa-home",
    "fa-kit-medical",
    "fa-walking",
    "fa-running",
    "fa-swimmer",
    "fa-film",
    "fa-graduation-cap",
    "fa-utensils",
    "fa-comments",
    "fa-book",
    "fa-dollar-sign",
    "fa-paint-brush",
    "fa-clock",
    "fa-bed",
    "fa-table-tennis",
    "fa-volleyball-ball",
    "fa-dumbbell",
    "fa-music",
    "fa-guitar",
    "fa-headphones",
    "fa-image",
    "fa-camera",
    "fa-gamepad",
    "fa-dice",
    "fa-car",
    "fa-train",
    "fa-plane",
    "fa-ship",
    "fa-map-marker-alt",
    "fa-tshirt",
    "fa-baby-carriage",
    "fa-paw",
    "fa-heart",
    "fa-cake",
    "fa-coffee",
    "fa-code",
    "fa-microchip",
    "fa-keyboard",
];

const COLORS = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
    "#ffffff",
];

export default function CategoriesModal(props) {
    const [state, setState] = useState(0);
    const [mode, setMode] = useState("");
    const [categoryToEdit, setCategoryToEdit] = useState({ id: null, name: "", color: "", faCode: "" });
    const categoriesList = props.categories.map((category) => {
        if (category.id != 0) {
            return (
                <div key={category.id} onClick={() => { setCategoryToEdit(category); setState(1); setMode("edit"); }} className="flex shadow-md p-2 rounded-xl justify-between items-center cursor-pointer hover:duration-150 outline-blue-500 bg-gray-500/10 hover:bg-gray-500/20">
                    <p className="text-sm md:text-base">{category.name}</p>
                    <div className="flex-none w-9 h-9 bg-white/10 rounded-lg inline-flex justify-center items-center md:ml-5">
                        <i className={`fa-solid text-md ${category.faCode}`} style={{ color: category.color }}></i>
                    </div>
                </div>
            )
        }
    });
    const iconsList = ICONS.map((icon) => {
        return (
            <div key={icon} onClick={changeIcon} faCode={icon} className={`icon flex-none w-14 h-14 rounded-lg inline-flex justify-center items-center hover:bg-white/10 cursor-pointer ${icon == categoryToEdit.faCode ? "bg-white/10" : ""}`}>
                <i className={`fa-solid ${icon}`} style={{ fontSize: "1.5em" }}></i>
            </div>
        );
    });
    const colorsList = COLORS.map((color) => {
        return (
            <div key={color} onClick={changeColor} color={color} className={`color flex-none w-14 h-14 rounded-lg inline-flex justify-center items-center hover:bg-white/10 cursor-pointer ${color == categoryToEdit.color ? "bg-white/10" : ""}`}>
                <div className="w-7 h-7 rounded-full" style={{ backgroundColor: color }}></div>
            </div>
        );
    });

    function handleChange(e) {
        setCategoryToEdit({ ...categoryToEdit, name: e.target.value });
    }

    function changeIcon(e) {
        setCategoryToEdit({ ...categoryToEdit, faCode: e.target.closest(".icon").getAttribute("faCode") });
    }

    function changeColor(e) {
        setCategoryToEdit({ ...categoryToEdit, color: e.target.closest(".color").getAttribute("color") });
    }

    function editCategory() {
        props.editCategory(categoryToEdit);
    }

    function createCategory() {
        props.createCategory(categoryToEdit);
    }

    function deleteCategory() {
        props.deleteCategory(categoryToEdit.id);
    }

    const categoriesTemplate = (
        <div className="grid gap-2 grid-cols-2">
            {categoriesList}
            <div onClick={() => { setState(1); setMode("create"); setCategoryToEdit({ id: nanoid(), name: "", color: "" }) }} className="flex p-2 rounded-xl justify-between items-center cursor-pointer border border-white/40 italic opacity-50 hover:opacity-100">
                <p className="text-sm md:text-base">New category</p>
                <div className="flex-none w-9 h-9 rounded-lg inline-flex justify-center items-center">
                    <i className="fa-solid fa-plus-square text-md"></i>
                </div>
            </div>
        </div>
    );

    const editTemplate = (
        <>
            <div className="flex gap-3">
                <div className="w-12 rounded-lg inline-flex justify-center items-center bg-white/10">
                    <i className={`fa-solid text-md ${categoryToEdit.faCode}`} style={{ fontSize: "1.5em", color: categoryToEdit.color }}></i>
                </div>
                <div className="relative grow">
                    <input onChange={handleChange} value={categoryToEdit.name} type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="floating_outlined" className="pointer-events-none absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Category name</label>
                </div>
            </div>
            <div className="grid gap-2 grid-cols-5 mt-5 h-56 overflow-y-scroll border border-white/10 p-3 rounded-lg">
                {iconsList}
            </div>
            <div className="grid gap-2 grid-cols-5 mt-5 h-36 overflow-y-scroll border border-white/10 p-3 rounded-lg">
                {colorsList}
            </div>
            <div className="flex space-x-5 mt-5">
                {mode === "edit" ? (
                    <button className="bg-red-500 text-white hover:bg-red-600 rounded-lg text-center px-3 py-2" onClick={() => { deleteCategory(); setState(0); }}>
                        <i className="fa-solid fa-trash-alt text-xl"></i>
                    </button>
                ) : null}
                <button className="w-full border border-gray-400 hover:bg-gray-600 rounded-lg text-center px-3 py-2" onClick={() => setState(state - 1)}>Cancel</button>
                <button disabled={categoryToEdit.name.length == 0 || categoryToEdit.color == "" || categoryToEdit.faCode == "" ? true : false} className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-500" onClick={() => { setState(state - 1); mode === "edit" ? editCategory() : createCategory() }}>{mode === "edit" ? "Confirm" : "Create"}</button>
            </div>
        </>
    );

    const TEMPLATES = [categoriesTemplate, editTemplate];

    return (
        <>
            <motion.div id="modal" aria-hidden="true" className="z-20 top-0 w-full h-full fixed bg-black/70 place-content-center inline-flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            ></motion.div>
            <div className="z-30 top-0 w-full h-full fixed place-content-center inline-flex justify-center items-center">
                <motion.div className="relative items-center bg-gray-700 text-gray-300 rounded-lg p-4 md:p-8 overflow-hidden"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3, type: "spring" }}
                >
                    <div className="mb-5 text-lg font-bold ">
                        <i className="fa-solid fa-tags"></i>
                        <span className="ml-3">Categories</span>
                    </div>
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