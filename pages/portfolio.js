import Head from 'next/head'
import Link from 'next/link'
import { AnimatePresence, motion, useScroll } from "framer-motion"
import { useState, useEffect } from 'react';

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Trans } from 'next-i18next';

import ProjectPreview from '../components/ProjectPreview';
import { initReactI18next } from 'react-i18next';


export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['portfolio'])),
      }
    }
}

export default function Portfolio() {
    const { t, i18n } = useTranslation('portfolio', { useSuspense: false });
    const { scrollYProgress } = useScroll();
    const [atTheTop, setAtTheTop] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const projects = [
        {
            solo: true,
            name: "To do",
            year: "2022",
            description: {
                fr:"Une application web pour garder une trace des choses à faire, et acquérir de nouvelles habitudes. Programmez des tâches uniques ou répétables et classez les par catégorie. Pensez à boire de l'eau, et rendez votre vie plus saine !",
                en: "A Web App to keep track of tasks and build new habits. Schedule one time or repeatable tasks and class them by categories. Remind you of drinking water, and have a healthier life!",
            },
            tags: ["NextJS", "TailwindCSS", "Go", "MongoDB"],
            previewLink: "/video/todo.webm",
            gitLink: "https://github.com/Pamplemouss/elpis",
            redirectLink: "/showcase",
            mobile: false
        },
        {
            solo: false,
            name: "Hide and Seek Neural Network",
            year: "2021",
            description: {
                fr: "Tentative de recréer une version 2D du projet <a class='font-medium text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor' href='https://openai.com/blog/emergent-tool-use'>Hide and Seek de Google</a> avec Qt. Des agents dôtés d'un réseau de neurones jouent à un simple jeu de cache-cache, où des comportements intelligents et surprenants peuvent émerger.",
                en: "An attempt to recreate a 2D version of the <a class='font-medium text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor' href='https://openai.com/blog/emergent-tool-use'>Hide and Seek Google project</a> in Qt. Agents with a neural network brain play a simple game of Hide & Seek, where intelligent and surprising behaviour can emerge.",
            },
            tags: ["Qt", "C++", "Neural Network"],
            previewLink: "/video/hideandseek.webm",
            gitLink: "https://gitlab.com/Pamplemouss/hideandseek",
            redirectLink: false,
            mobile: false
        },
        {
            solo: false,
            name: "Bike and Motorcycle tracker",
            year: "2019",
            description: {
                fr: "Prototype d'un appareil de géolocalisation à cacher dans une lampe pour vélo. L'application permet de retrouver sa position en cas de perte ou de vol.",
                en: "Geolocalisation device prototype hidden in a bike headlight. Use the app to track its location in case of loosing or getting it stolen.",
            },
            tags: ["AdobeXD", "Arduino"],
            previewLink: "/video/hermes.webm",
            gitLink: false,
            redirectLink: false,
            mobile: true
        },
        {
            solo: true,
            name: "Piano notes trainer",
            year: "2019",
            description: {
                fr: "Une simple application pour s'entraîner à reconnaître les notes rapidement sur un piano.",
                en: "A simple app to train yourself recognizing notes on a piano.",
            },
            tags: ["NodeJS", "Express"],
            previewLink: "/video/pianolynn.mp4",
            gitLink: "https://github.com/Pamplemouss/piano-lynn",
            redirectLink: false,
            mobile: false
        },
    ];

    const projectsPreviews = projects.map((project) => {
        return <ProjectPreview key={project.name} data={project} lang={i18n.language}></ProjectPreview>
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
            <div className="montSerrat bg-backgroundColor">
                {/* TOP BAR */}
                <div className={`z-30 fixed flex ${ atTheTop ? "h-24" : "h-16 shadow-xl"} w-screen ${menuOpen ? "shadow-none" : "backdrop-blur bg-backgroundColor/70"} duration-300`}>
                    <div className="w-12 h-12 grow m-auto ml-6 md:ml-12">
                        <motion.img
                            initial={{ opacity: 0, rotate: 500, x: 300 }}
                            whileInView={{ opacity: 1, rotate: 0, x: 0 }}
                            transition={{ type: "spring", duration: 1.5 }}
                            className="w-12 h-12" src="/img/logo.png">
                        </motion.img>
                    </div>

                    <motion.div
                        variants={menu}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex gap-4 mr-16 hidden md:flex"
                    >
                        <Link locale={`${i18n.language == "fr" ? "en" : "fr"}`} href="/portfolio" variants={item}>
                            <motion.span variants={item} className="mr-10 m-auto text-slate-500 hover:text-slate-400 font-semibold cursor-pointer">{i18n.language == "fr" ? "EN" : "FR"}</motion.span>
                        </Link>

                        {[{content: t("menu.about"), target: "#About"}, {content: t("menu.projects"), target: "#Projects"}, {content:t("menu.contact"), target: "#Contact"}].map((element, index) => {
                            var before = "0" + (index+1) + ".";
                            return (
                                <motion.a
                                    key={index+element}
                                    before={before}
                                    href={element.target}
                                    variants={item}
                                    className={`
                                        p-4 m-auto from-slate-400 to-slate-400 font-semibold text-sm text-transparent bg-clip-text bg-gradient-to-r hover:from-firstColor hover:to-secondColor
                                        before:content-[attr(before)] before:mr-2 before:font-semibold before:text-transparent before:bg-clip-text before:bg-gradient-to-r before:from-firstColor before:to-secondColor
                                    `}
                                >
                                    {element.content}
                                </motion.a>
                            )
                        })}
                        <motion.span variants={item} className="flex">
                            <a className="
                                m-auto relative rounded py-2 px-4 border-firstColor border
                                after:absolute after:h-full after:w-full after:bg-gradient-to-br after:from-firstColor after:to-secondColor after:block after:top-0 after:left-0 after:opacity-0 hover:after:opacity-20 before:duration-300
                            " href={t("resumeURL")}>
                                <span className="font-semibold text-sm -translate-y-2 text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">
                                    {t("menu.resume")}
                                </span>
                            </a>
                        </motion.span>
                    </motion.div>
                    <Link locale={`${i18n.language == "fr" ? "en" : "fr"}`} href="/portfolio">
                        <motion.span variants={item} className="md:hidden p-3 mr-6 m-auto text-slate-500 hover:text-slate-400 font-semibold cursor-pointer">{i18n.language == "fr" ? "EN" : "FR"}</motion.span>
                    </Link>
                    <div className="z-30 flex md:hidden mr-6">
                        <div onClick={() => setMenuOpen(!menuOpen)} id="nav-icon" className="m-auto w-[34px] h-[34px] rotate-0 cursor-pointer">
                            {Array(4).fill("").map((element, index) => {
                                return (
                                    <span key={`navbar${index}`} className="duration-300 ease-in-out h-0.5 left-0 w-full rotate-0 absolute block bg-gradient-to-r from-firstColor to-secondColor"></span>
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
                        {[t("menu.about"), t("menu.projects"), t("menu.contact")].map((element, index) => {
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
                            " href={t("resumeURL")}>
                                <span className="font-semibold text-sm -translate-y-2 text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">
                                    {t("menu.resume")}
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
                        <Trans t={t} i18nKey="intro">
                            <motion.div variants={titleVariants} className="text-xl font-semibold mb-5 md:mb-10">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">Hi, my name is</span>
                            </motion.div>
                            <motion.div variants={titleVariants} className="text-slate-300 text-4xl md:text-5xl xl:text-6xl font-bold mb-1 md:mb-4">
                                John Dufaye.
                            </motion.div>
                            <motion.div variants={titleVariants} className="text-slate-500 text-4xl md:text-5xl xl:text-6xl font-bold">
                                I am a web & software developer.
                            </motion.div>
                        </Trans>
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
                            <span className="text-lg md:text-3xl font-semibold text-slate-300">{t("about.title")}</span>
                            <div className="flex-1 flex">
                                <div className="m-auto w-full h-0.5 bg-slate-700"></div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-4/5 flex flex-col">
                                <div className="m-auto text-slate-300 text-sm md:text-base">
                                    <Trans t={t} i18nKey="about.presentation"></Trans>
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
                                            src="/img/me.png"
                                            initial={{filter: "grayscale(1) brightness(1.4) contrast(0.85)"}}
                                            whileHover={{filter: "grayscale(0) brightness(1) contrast(1)"}}
                                            whileTap={{filter: "grayscale(0) brightness(1) contrast(1)"}}
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
                        <span className="text-lg md:text-3xl font-semibold text-slate-300">{t("projects.title")}</span>
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
                            <span className="text-lg md:text-3xl font-semibold text-slate-300">{t("contact.title")}</span>
                            <div className="flex-1 flex">
                                <div className="m-auto w-full h-0.5 bg-slate-700"></div>
                            </div>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold">
                            {t("contact.getInTouch")}
                        </h1>
                        <div className="text-sm md:text-base mt-4 md:mt-10">
                            {t("contact.content")}
                        </div>
                        <div className="mt-16 md:mt-20">
                            <a className="
                                relative rounded py-5 px-7 border-firstColor border-2
                                after:absolute after:h-full after:w-full after:bg-gradient-to-br after:from-firstColor after:to-secondColor after:block after:top-0 after:left-0 after:opacity-0 hover:after:opacity-20 before:duration-300
                            " href="mailto:john.dufayeg@gmail.com">
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">
                                    {t("contact.sayHello")}
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

                <div className="text-sm text-slate-300 text-center pb-10">
                    {t("credit")}
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
