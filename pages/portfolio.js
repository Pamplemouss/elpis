import Head from 'next/head'
import { AnimatePresence, motion, useScroll } from "framer-motion"
import ProjectPreview from '../components/ProjectPreview';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export default function Portfolio() {
    const { scrollYProgress } = useScroll();
    const [atTheTop, setAtTheTop] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const projects = [
        {
            solo: true,
            name: "To do",
            year: "2022",
            description: "A Web App to keep track of tasks and build new habits. Schedule one time or repeatable tasks and class them by categories. Remind you of drinking water, and have a healthier life!",
            tags: ["NextJS", "TailwindCSS", "Go", "MongoDB"],
            previewLink: "./todo.webm",
            gitLink: "https://github.com/Pamplemouss/elpis",
            redirectLink: "/showcase",
            mobile: false
        },
        {
            solo: false,
            name: "Hide and Seek Neural Network",
            year: "2021",
            description: "An attempt to recreate a 2D version of the <a class='font-medium text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor' href='https://openai.com/blog/emergent-tool-use'>Hide and Seek Google project</a> in Qt. Agents with a neural network brain play a simple game of Hide & Seek, where intelligent and surprising behaviour can emerge.",
            tags: ["Qt", "C++", "Neural Network"],
            previewLink: "./hideandseek.webm",
            gitLink: "https://gitlab.com/Pamplemouss/hideandseek",
            redirectLink: false,
            mobile: false
        },
        {
            solo: false,
            name: "Bike and Motorcycle tracker",
            year: "2019",
            description: "Geolocalisation device prototype hidden in a bike headlight. Use the app to track its location in case of loosing or getting it stolen.",
            tags: ["AdobeXD", "Arduino"],
            previewLink: "./hermes.webm",
            gitLink: false,
            redirectLink: false,
            mobile: true
        },
        {
            solo: true,
            name: "Piano notes trainer",
            year: "2019",
            description: "A simple app to train yourself recognizing notes on a Piano.",
            tags: ["NodeJS", "Express"],
            previewLink: "./pianolynn.mp4",
            gitLink: "https://github.com/Pamplemouss/piano-lynn",
            redirectLink: false,
            mobile: false
        },
    ];

    const projectsPreviews = projects.map((project) => {
        return <ProjectPreview key={project.name} data={project}></ProjectPreview>
    });

    useEffect(() => {
        document.addEventListener("scroll", (event) => {
            if (atTheTop && window.scrollY != 0) setAtTheTop(false);
            if (!atTheTop && window.scrollY== 0) setAtTheTop(true);
        });
    });



    // VARIANTS
    const menu = {
        visible: {
            transition: {
                when: "beforeChildren",
                staggerChildren: .1,
            }
        },
        hidden: {},
    }

    const item = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: .5,
            }
        },
        hidden: { opacity: 0, y: -50 },
    }

    const titleBlockVariants = {
        visible: {
            transition: {
                when: "beforeChildren",
                delayChildren: 0.7,
                staggerChildren: .15,
            }
        },
        hidden: {},
    }


    const titleVariants = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: .5,
            },
        },
        hidden: { opacity: 0, x: -200 },
    }

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
            document.getElementById("nav-icon").classList.add("open");
        }
        else {
            document.body.style.overflow = "auto"
            document.getElementById("nav-icon").classList.remove("open");
        }
    }, [menuOpen])

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" /> 
            </Head>
            <div className={`montSerrat ${menuOpen ? "overflow-hidden" : ""}`}>
                
                {/* TOP BAR */}
                <div className={`z-30 fixed flex ${ atTheTop ? "h-24" : "h-16 shadow-xl"} w-screen ${menuOpen ? "shadow-none" : "backdrop-blur bg-[#0F172A]/70"} duration-300`}>
                    <div className="w-12 h-12 grow m-auto ml-6 md:ml-12">
                        <motion.img
                            initial={{ opacity: 0, rotate: 500, x: 300 }}
                            whileInView={{ opacity: 1, rotate: 0, x: 0 }}
                            transition={{ type: "spring", duration: 1.5 }}
                            className="w-12 h-12" src="./logo.png">
                        </motion.img>
                    </div>

                    <motion.div
                        variants={menu}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex gap-4 mr-16 hidden md:flex"
                    >
                        {["About", "Projects", "Contact"].map((element, index) => {
                            var before = "0" + (index+1) + ".";
                            return (
                                <motion.a
                                    key={index+element}
                                    before={before}
                                    href={`#${element}`}
                                    variants={item}
                                    className={`
                                        p-4 m-auto from-slate-400 to-slate-400 font-semibold text-sm text-transparent bg-clip-text bg-gradient-to-r hover:from-firstColor hover:to-secondColor
                                        before:content-[attr(before)] before:mr-2 before:font-semibold before:text-transparent before:bg-clip-text before:bg-gradient-to-r before:from-firstColor before:to-secondColor
                                    `}
                                >
                                    {element}
                                </motion.a>
                            )
                        })}
                        <motion.span variants={item} className="flex">
                            <a className="
                                m-auto relative rounded py-2 px-4 border-firstColor border
                                after:absolute after:h-full after:w-full after:bg-gradient-to-br after:from-firstColor after:to-secondColor after:block after:top-0 after:left-0 after:opacity-0 hover:after:opacity-20 before:duration-300
                            " href="./resume.pdf">
                                <span className="font-semibold text-sm -translate-y-2 text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">
                                    Resume
                                </span>
                            </a>
                        </motion.span>
                    </motion.div>
                    <div className="z-30 flex md:hidden mr-6">
                        <div onClick={() => setMenuOpen(!menuOpen)} id="nav-icon" className="m-auto w-[34px] h-[34px] rotate-0 cursor-pointer">
                            {Array(4).fill("").map(() => {
                                return (
                                    <span key={nanoid()} className="duration-300 ease-in-out h-0.5 left-0 w-full rotate-0 absolute block bg-gradient-to-r from-firstColor to-secondColor"></span>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* BLUR WHEN MENU OPEN */}
                <AnimatePresence>
                    { menuOpen ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setMenuOpen(false)}
                                className="`md:hidden fixed top-0 left-0 h-screen w-screen backdrop-blur-sm z-10 `"
                            ></motion.div>
                    )
                    : null}
                </AnimatePresence>

                {/* MENU */}
                <div className={`z-20 fixed w-8/12 flex h-screen bg-slate-800 top-0 right-0 duration-300 ${menuOpen ? "" : "translate-x-full"}`}>
                    <div className="flex flex-col m-auto gap-14 -translate-y-6">
                        {["About", "Projects", "Contact"].map((element, index) => {
                            var before = "0" + (index+1) + ".";
                            return (
                                <motion.a
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    key={index+element}
                                    before={before}
                                    href={`#${element}`}
                                    variants={item}
                                    className={`
                                    m-auto from-slate-400 to-slate-400 font-semibold text-base text-transparent bg-clip-text bg-gradient-to-r hover:from-firstColor hover:to-secondColor
                                    before:content-[attr(before)] before:mr-2 before:font-semibold before:text-transparent before:bg-clip-text before:bg-gradient-to-r before:from-firstColor before:to-secondColor
                                `}
                                >
                                    {element}
                                </motion.a>
                            )
                        })}
                        <motion.span variants={item} className="flex">
                            <a className="
                                m-auto relative rounded py-4 px-10 mt-8 border-firstColor border
                                after:absolute after:h-full after:w-full after:bg-gradient-to-br after:from-firstColor after:to-secondColor after:block after:top-0 after:left-0 after:opacity-0 hover:after:opacity-20 before:duration-300
                            " href="./resume.pdf">
                                <span className="font-semibold text-sm -translate-y-2 text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">
                                    Resume
                                </span>
                            </a>
                        </motion.span>
                    </div>
                </div>

                {/* INTRO */}
                <div className="m-auto w-10/12 md:w-9/12 xl:w-8/12 h-screen flex">
                    <motion.div
                        variants={titleBlockVariants}
                        initial="hidden"
                        animate="visible"
                        viewport={{ once: true }}
                        className="m-auto -translate-y-10 xl:-translate-y-20"
                    >
                        <motion.div variants={titleVariants} className="text-xl font-semibold mb-5 md:mb-10">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">Hi, my name is</span>
                        </motion.div>
                        <motion.div variants={titleVariants} className="text-slate-300 text-4xl md:text-5xl xl:text-6xl font-bold mb-1 md:mb-4">
                            John Dufaye.
                        </motion.div>
                        <motion.div variants={titleVariants} className="text-slate-500 text-4xl md:text-5xl xl:text-6xl font-bold">
                            I am a web & software developer.
                        </motion.div>
                    </motion.div>
                </div>

                {/* ABOUT */}
                <a id="About" className="absolute -translate-y-20 md:translate-y-0"></a>
                <motion.div
                    className="m-auto w-10/12 md:w-9/12 xl:w-7/12 flex md:mt-20"
                    initial={{ y: 200, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: .1 }}
                    viewport={{ once: true }}
                >
                    <div className="m-auto relative">
                        <div className="flex gap-5 mb-5">
                            <span className="m-auto text-lg md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">01.</span>
                            <span className="text-lg md:text-3xl font-semibold text-slate-300">About me</span>
                            <div className="flex-1 flex">
                                <div className="m-auto w-full h-0.5 bg-slate-700"></div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-4/5 flex flex-col">
                                <div className="m-auto text-slate-300 text-sm md:text-base">
                                    Hello! My name is John Dufaye and I enjoy creating things that pop off my head. My interest in web design and software development started back in highschool when I tried to create an app to help me learn music theory — turns out it helped me learn more about programing than music!
                                    <br/><br/>Fast forward to today, I never stopped trying to give life to ideas. Being curious about several areas (such as music theory, game design, cooking, running, meditation), led me to create eclectic projetcs. From tabletop roleplaying online, to magic mirrors, I explored programming through many lenses.
                                    <br/><br/>Here are a few technologies I’ve been working with recently:
                                </div>
                                <ul className="grid grid-cols-2 md:w-10/12 text-slate-500 font-semibold text-sm mt-3">
                                    {["NodeJS", "React - NextJS", "MongoDB", "TailwindCSS", "Framer motion"].map((element, index) => {
                                        return (
                                            <li key={element} className="relative pl-5 before:text-firstColor before:absolute before:left-0 before:content-['▹']">
                                                {element}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="p-10 flex">
                                <div className="
                                    m-auto relative w-4/5 before:w-full before:h-full before:rounded-lg before:border-r-firstColor before:border-b-secondColor before:border-t-secondColor before:border-l-firstColor before:border-2 before:top-4 before:left-4 before:block before:absolute
                                    hover:before:top-3 hover:before:left-3 before:duration-300"
                                >
                                    <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-firstColor to-secondColor hover:to-white hover:from-white duration-300"
                                    >
                                        <motion.img
                                            className="mix-blend-multiply"
                                            src="/me.png"
                                            initial={{filter: "grayscale(1) brightness(1.4) contrast(0.85)"}}
                                            whileHover={{filter: "grayscale(0) brightness(1) contrast(1)"}}
                                            transition={{duration: 0.3}}
                                        ></motion.img>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* PROJECTS */}
                <div className="w-10/12 md:w-9/12 xl:w-8/12 m-auto mt-40 md:mt-60">
                    <a id="Projects" className="absolute -translate-y-20 md:translate-y-[-14vh]"></a>
                    <div className="flex gap-5 mb-8 md:mb-40">
                        <span className="m-auto text-lg md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">02.</span>
                        <span className="text-lg md:text-3xl font-semibold text-slate-300">Some things I’ve built</span>
                        <div className="flex-1 flex">
                            <div className="m-auto w-full h-0.5 bg-slate-700"></div>
                        </div>
                    </div>
                    <div className="grid gap-20 md:gap-80">
                        {projectsPreviews}
                    </div>
                </div>

                {/* CONTACT */}
                <div className="w-10/12 md:w-6/12 xl:w-5/12 mt-28 md:mt-0 md:h-screen m-auto text-center text-slate-300 flex-col flex">
                    <a id="Contact" className="absolute -translate-y-20 md:translate-y-[5vh]"></a>
                    <motion.div
                        className="m-auto"
                        initial={{ translateY: 200, opacity: 0 }}
                        whileInView={{ translateY: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex gap-5 mb-5 md:mb-10">
                            <span className="m-auto text-lg md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">03.</span>
                            <span className="text-lg md:text-3xl font-semibold text-slate-300">Contact</span>
                            <div className="flex-1 flex">
                                <div className="m-auto w-full h-0.5 bg-slate-700"></div>
                            </div>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold">
                            Get in Touch
                        </h1>
                        <div className="text-sm md:text-base mt-4 md:mt-10">
                            Currently looking for new opportunities, my inbox is always open. Whether you have a question, a job offer, or just want to say hi, I’ll get back to you!
                        </div>
                        <div className="mt-16 md:mt-20">
                            <a className="
                                relative rounded py-5 px-7 border-firstColor border-2
                                after:absolute after:h-full after:w-full after:bg-gradient-to-br after:from-firstColor after:to-secondColor after:block after:top-0 after:left-0 after:opacity-0 hover:after:opacity-20 before:duration-300
                            " href="mailto:john.dufayeg@gmail.com">
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">
                                    Say hello
                                </span>
                            </a>
                        </div>
                    </motion.div>
                </div>
                
                <div className="md:hidden flex mt-28">
                    <div className="w-10/12 m-auto flex justify-center gap-8 text-2xl mb-5">
                        <a href="https://github.com/Pamplemouss/" className="p-2 hover:-translate-y-1 justify-center items-center from-slate-400 to-slate-400 text-transparent bg-clip-text bg-gradient-to-r hover:from-firstColor hover:to-secondColor duration-300">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/john-dufaye/" className="p-2 hover:-translate-y-1 justify-center items-center from-slate-400 to-slate-400 text-transparent bg-clip-text bg-gradient-to-r hover:from-firstColor hover:to-secondColor duration-300">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="https://www.instagram.com/pampa_lemouss/" className="p-2 hover:-translate-y-1 justify-center items-center from-slate-400 to-slate-400 text-transparent bg-clip-text bg-gradient-to-r hover:from-firstColor hover:to-secondColor duration-300">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>

                <div className="text-sm text-slate-300 text-center mb-10">
                    Designed & Built by John Dufaye
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.8}}
                    viewport={{ once: true }}
                    className="fixed bottom-0 left-10 hidden md:flex flex-col gap-3 text-2xl text-slate-400 text-center"
                >
                    <a href="https://github.com/Pamplemouss/" className="p-2 hover:-translate-y-1 justify-center items-center from-slate-400 to-slate-400 text-transparent bg-clip-text bg-gradient-to-r hover:from-firstColor hover:to-secondColor duration-300">
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/john-dufaye/" className="p-2 hover:-translate-y-1 justify-center items-center from-slate-400 to-slate-400 text-transparent bg-clip-text bg-gradient-to-r hover:from-firstColor hover:to-secondColor duration-300">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a href="https://www.instagram.com/pampa_lemouss/" className="p-2 hover:-translate-y-1 justify-center items-center from-slate-400 to-slate-400 text-transparent bg-clip-text bg-gradient-to-r hover:from-firstColor hover:to-secondColor duration-300">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <div className="h-20">
                        <div className="m-auto h-full bg-slate-400 w-0.5"></div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.8}}
                    viewport={{ once: true }}
                    className="fixed w-6 bottom-0 right-12 hidden md:flex flex-col gap-8 text-slate-400 text-center"
                >
                    <a href="mailto:john.dufayeg@gmail.com" className="[writing-mode:vertical-lr] hover:-translate-y-2 font-semibold from-slate-400 to-slate-400 text-transparent bg-clip-text bg-gradient-to-b hover:from-firstColor hover:to-secondColor duration-300">
                        <span className="p-4">
                            john.dufaye@gmail.com
                        </span>
                    </a>
                    <div className="h-20">
                        <div className="m-auto h-full bg-slate-400 w-0.5"></div>
                    </div>
                </motion.div>

                <motion.div className="z-50 fixed bottom-0 left-0 bg-gradient-to-r from-firstColor to-secondColor origin-left h-1 w-screen" style={{ scaleX: scrollYProgress }} />
            
            </div>
        </>
    )
}
