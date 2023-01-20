import { motion } from "framer-motion"
import Link from 'next/link'

export default function ProjectPreview(props) {
    //const stylised = (<span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">healthier life!</span>);
    
    const tags = props.data.tags.map((tag, index) => {
        return (
            <span key={tag + index}>{tag}</span>
        );
    });

    return (
        <motion.div
            className="m-auto flex bg-[rgba(255,255,255,0.08)] md:bg-inherit rounded md:rounded-none custom-shadow md:shadow-none"
            initial={{ translateY: 0, scale: 0.5, opacity: 0 }}
            whileInView={{ translateY: 0, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
        >
            <div className="w-10/12 md:w-full m-auto flex flex-col md:flex-row">
                <div className="mt-5 md:hidden"><span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">{props.data.solo ? "Solo Project" : "Team Project"} - {props.data.year}</span></div>
                <div className="mb-3 md:hidden text-2xl mt-1 font-bold text-slate-300">{props.data.name}</div>
                <div className="flex-none flex flex-col md:w-1/2 justify-center items-center">
                    <div className={`${props.data.mobile ? "w-4/12" : null} overflow-hidden align-middle rounded-xl md:hover:border-gray-700 border-4 md:border-[6px] hover:border-gray-500 border-gray-600 md:border-gray-800 shadow-xl md:shadow-[0px_0px_20px_20px_rgba(0,0,0,0.3)] md:-skew-y-6 bg-gradient-to-br from-firstColor to-secondColor hover:to-white hover:from-white duration-300`}>
                        <Link href={props.data.redirectLink ? props.data.redirectLink : ""}>
                            <motion.video autoPlay muted loop id="myVideo"
                                className={`mix-blend-multiply ${props.data.redirectLink ? "cursor-pointer" : null}`}
                                initial={{filter: "grayscale(1) brightness(1.6) contrast(0.85)"}}
                                whileHover={{filter: "grayscale(0) brightness(1) contrast(1)"}}
                                whileFocus={{filter: "grayscale(0) brightness(1) contrast(1)"}}
                                transition={{duration: 0.3}}
                            >
                                <source src={props.data.previewLink} type="video/mp4"/>
                            </motion.video>
                        </Link>
                    </div>
                </div>
                <div className="md:text-right flex flex-col grow">
                    <div><span className="hidden md:inline-block font-medium text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">{props.data.solo ? "Solo Project" : "Team Project"} - {props.data.year}</span></div>
                    <div className="hidden md:block text-3xl mt-1 font-bold text-slate-300">{props.data.name}</div>
                    <div className="flex md:block">
                        <div className="mt-6 mb-7 md:w-11/12 m-auto md:mx-0 md:mt-6 mb-4 md:p-6 text-sm md:bg-[rgba(255,255,255,0.05)] md:rounded md:shadow-xl text-slate-300 md:float-right"
                            dangerouslySetInnerHTML={{ __html: props.data.description }}>
                        </div>
                    </div>
                    <div className="md:w-full mb-6 md:mb-0 flex-wrap text-xs md:text-sm text-slate-300 flex gap-x-4 md:gap-8 md:justify-end">
                        {tags}
                    </div>
                    {props.data.gitLink && props.data.redirectLink ? (
                        <div className="flex mb-6 md:mt-4 md:mb-0 md:justify-end gap-8 md:gap-5 text-2xl"> 
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
                    ) : null}
                </div>
            </div>
            
        </motion.div>
    )
}