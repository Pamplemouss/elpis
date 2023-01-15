import Head from 'next/head'
import { motion } from "framer-motion"
import Link from 'next/link'

export default function Portfolio() {
    return (
        <>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" /> 
        </Head>
            <div className="montSerrat">
                <div className="w-24 h-24 fixed left-6 top-4">
                    <img src="./logo.png"></img>
                </div>
                <div className="w-full mt-40 grid gap-60">

                    <div className="m-auto w-8/12 flex ">
                        <div className="flex-none flex flex-col w-1/2 justify-center items-center">
                            <motion.div
                                className="align-middle rounded-xl hover:border-gray-700 border-[6px] border-gray-800 shadow-[0px_0px_20px_20px_rgba(0,0,0,0.3)] -skew-y-6 bg-gradient-to-br from-blue-500 to-fuchsia-500 hover:to-transparent hover:from-transparent duration-300"
                            >
                                <Link href="/showcase">
                                    <motion.video autoPlay muted loop id="myVideo"
                                        className="mix-blend-multiply"
                                        initial={{filter: "grayscale(1) brightness(1.6) contrast(0.85)"}}
                                        whileHover={{filter: "grayscale(0) brightness(1) contrast(1)"}}
                                        transition={{duration: 0.3}}
                                    >
                                        <source src="./todo.mp4" type="video/mp4"/>
                                    </motion.video>
                                </Link>
                            </motion.div>
                        </div>
                        <div className="text-right flex flex-col">
                            <div>
                                <span className="font-medium text-transparent text-lg bg-clip-text bg-gradient-to-r from-blue-500 to-fuchsia-500">Personal Project</span>
                            </div>
                            <div className="text-4xl mt-2 font-bold text-slate-300">To do List</div>
                            <div className="w-full">
                                <div className="w-11/12 mt-8 mb-4 p-5 bg-[rgba(255,255,255,0.03)] custom-shadow text-slate-300 float-right">
                                    A Web App to keep track of tasks and build new habits. Schedule one time or repeatable tasks and class them by categories. Remind you of drinking water, and have a <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-fuchsia-500">healthier life!</span>
                                </div>
                            </div>
                            <div className="text-sm text-slate-300 flex gap-8 justify-end">
                                <span>NextJS</span>
                                <span>TailwindCSS</span>
                                <span>Golang</span>
                                <span>MongoDB</span>
                            </div>
                            <div className="flex mt-4 justify-end gap-5 text-2xl">
                                <Link href="https://github.com/Pamplemouss/elpis">
                                    <div className="inline-flex justify-center items-center from-slate-400 to-slate-400 text-transparent bg-clip-text bg-gradient-to-r hover:from-blue-500 hover:to-fuchsia-500 duration-500">
                                        <i className="fa-brands fa-github"></i>
                                    </div>
                                </Link>
                                <Link href="/showcase">
                                    <div className="inline-flex justify-center items-center from-slate-400 to-slate-400 text-transparent bg-clip-text bg-gradient-to-r hover:from-blue-500 hover:to-fuchsia-500 duration-500">
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
