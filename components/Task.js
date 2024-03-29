import React, { useEffect, useState } from "react";
import { getBGColor } from '../utilities/Utilities';
import { motion, useAnimationControls } from "framer-motion"

export default function Task(props) {
    const [toggleState, setToggleState] = useState(props.checked)
    const controls = useAnimationControls();
    const repeatableIcon = (
        <div className="w-6 h-6 inline ml-2 rounded-md bg-white/10 inline-flex justify-center items-center custom-shadow">
            <i className="fa-solid fa-sync text-xs text-slate-400"></i>
        </div>
    );

    useEffect(() => {
        setToggleState(props.checked)
    }, [props.checked])

    function toggle() {
        if(!toggleState) {
            controls.start({
                backgroundColor: ["rgba(16, 185, 129, 0)", "rgba(16, 185, 129, 0.3)", "rgba(16, 185, 129, 0)"],
                scale: [1, 1.1, 1],
                transition: { duration: 0.3, times: [0, 0.01, 1] },
            })
        }
        else {
            controls.start({
                backgroundColor: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0)"],
                scale: [1, 0.9, 1],
                transition: { duration: 0.3, times: [0, 0.01, 1] },
            })
        }
        props.toggleTask(props.task.id)
    }

    return (
        <motion.div className="group w-full relative flex px-4 md:px-24 text-gray-300"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ x : {duration: 0.3}, opacity: {duration: 0.3}, duration: 0.3 }}
            layout
            key={props.task.id}
        >
            <div onClick={() => props.deleteTask(props.task.id)} className="w-10 h-1/2 absolute top-1/2 -translate-y-1/2 right-20 md:left-0 invisible group-hover:visible transition-colors text-slate-500 hover:text-red-500 duration-150 inline-flex justify-center items-center cursor-pointer">
                <i className="fa-solid fa-trash-alt text-xl"></i>
            </div>
            <div onClick={() => props.editTask(props.task.id)} className="w-10 h-1/2 absolute top-1/2 -translate-y-1/2 right-32 md:left-10 invisible group-hover:visible transition-colors text-slate-500 hover:text-blue-500 duration-150 inline-flex justify-center items-center cursor-pointer">
                <i className="fa-solid fa-edit text-xl"></i>
            </div>
            <motion.div
                initial={{backgroundColor: "rgba(255, 255, 255, 0.02)"}}
                animate={controls}
                whileHover={{backgroundColor: "rgba(255,255,255,0.05)", transition: { duration: 0 }}}
                transition={{duration: 0}}
                className={`shadow-lg bg-white flex w-full p-4 justify-between rounded-xl ${toggleState ? "opacity-40" : ""}`}
            >
                <div className="flex">
                    <div className="w-11 h-11 bg-white/10 rounded-lg m-1 mr-5 inline-flex justify-center items-center shadow-lg custom-shadow">
                        <i className={`fa-solid text-xl ${props.category.faCode}`} style={{ color: props.category.color }}></i>
                    </div>
                    <div>
                        <p className="text-lg mb-1">{props.task.name}</p>
                        <div>
                            <div className="category text-xs inline p-1 rounded-md custom-shadow" style={{ color: props.category.color, backgroundColor: getBGColor(props.category.color) }}>
                                {props.category.name}
                            </div>
                            {props.task.repeatable ? repeatableIcon : null}
                        </div>
                    </div>
                </div>

                <div className="inline-flex items-center ml-4">
                    <motion.input
                        animate={{border: "1px solid rgba(16, 185, 129, 0)"}}
                        whileHover={{border: "1px solid rgba(16, 185, 129, 1)", boxShadow: "0 0 6px 1px rgb(16, 185, 129)"}}
                        transition={{duration: 0.15}}
                        checked={toggleState}
                        onChange={() => toggle()}
                        type="checkbox"
                        className="w-7 h-7 cursor-pointer text-emerald-500 rounded-full bg-white/10 border-0">
                    </motion.input>
                </div>
            </motion.div>
        </motion.div>
    )
}