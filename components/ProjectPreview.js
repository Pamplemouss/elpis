import { motion } from "framer-motion"
import Link from 'next/link'

export default function ProjectPreview(props) {
    //const stylised = (<span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">healthier life!</span>);
    
    const tags = props.data.tags.map((tag) => {
        return (
            <span>{tag}</span>
        );
    });

    return (
        <div className="m-auto w-10/12 xl:w-8/12 flex">
            <div className="flex-none flex flex-col w-1/2 justify-center items-center">
                <motion.div
                    className={`${props.data.mobile ? "w-4/12" : null} overflow-hidden align-middle rounded-xl hover:border-gray-700 border-[6px] border-gray-800 shadow-[0px_0px_20px_20px_rgba(0,0,0,0.3)] -skew-y-6 bg-gradient-to-br from-firstColor to-secondColor hover:to-transparent hover:from-transparent duration-300`}
                >
                    <Link href={props.data.redirectLink ? props.data.redirectLink : ""}>
                        <motion.video autoPlay muted loop id="myVideo"
                            className={`mix-blend-multiply ${props.data.redirectLink ? "cursor-pointer" : null}`}
                            initial={{filter: "grayscale(1) brightness(1.6) contrast(0.85)"}}
                            whileHover={{filter: "grayscale(0) brightness(1) contrast(1)"}}
                            transition={{duration: 0.3}}
                        >
                            <source src={props.data.previewLink} type="video/mp4"/>
                        </motion.video>
                    </Link>
                </motion.div>
            </div>
            <div className="text-right flex flex-col">
                <div>
                    <span className="font-medium text-transparent text-lg bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">{props.data.solo ? "Solo Project" : "Team Project"} - {props.data.year}</span>
                </div>
                <div className="text-4xl mt-2 font-bold text-slate-300">{props.data.name}</div>
                <div className="w-full">
                    <div className="w-11/12 mt-8 mb-4 p-5 bg-[rgba(255,255,255,0.03)] custom-shadow text-slate-300 float-right">
                        {props.data.description}
                    </div>
                </div>
                <div className="text-sm text-slate-300 flex gap-8 justify-end">
                    {tags}
                </div>
                <div className="flex mt-4 justify-end gap-5 text-2xl"> 
                    {props.data.gitLink ? (
                        <Link href={props.data.gitLink}>
                            <div className="cursor-pointer inline-flex justify-center items-center from-slate-400 to-slate-400 text-transparent bg-clip-text bg-gradient-to-r hover:from-firstColor hover:to-secondColor duration-500">
                                <i className="fa-brands fa-github"></i>
                            </div>
                        </Link>
                    ) : null}
                    {props.data.redirectLink ? (
                        <Link href={props.data.redirectLink}>
                            <div className="cursor-pointer inline-flex justify-center items-center from-slate-400 to-slate-400 text-transparent bg-clip-text bg-gradient-to-r hover:from-firstColor hover:to-secondColor duration-500">
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </div>
                        </Link>
                    ) : null}
                </div>
            </div>
        </div>
    )
}