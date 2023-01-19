import Head from 'next/head'
import { motion } from "framer-motion"
import ProjectPreview from '../components/ProjectPreview';

export default function Portfolio() {
    const projects = [
        {
            solo: true,
            name: "To do List",
            year: "2022",
            description: "A Web App to keep track of tasks and build new habits. Schedule one time or repeatable tasks and class them by categories. Remind you of drinking water, and have a healthier life!",
            tags: ["NextJS", "TailwinCSS", "Golang", "MongoDB"],
            previewLink: "./todo.webm",
            gitLink: "https://github.com/Pamplemouss/elpis",
            redirectLink: "/showcase",
            mobile: false
        },
        {
            solo: false,
            name: "Hide and Seek Neural Network",
            year: "2021",
            description: "A 2D recreation of the Hide and Seek Google project: https://www.youtube.com/watch?v=Lu56xVlZ40M.",
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
            description: "Geolocalisation prototype to hide in your bike. Track its location in case of loosing or getting it stolen.",
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
            description: "A simple app to train yourself recognizing notes on a Piano. Supports ABC and Do Re Mi notation.",
            tags: ["NodeJS", "Express"],
            previewLink: "./pianolynn.mp4",
            gitLink: "https://github.com/Pamplemouss/piano-lynn",
            redirectLink: false,
            mobile: false
        }
    ];

    const projectsPreviews = projects.map((project) => {
        return <ProjectPreview key={project.name} data={project}></ProjectPreview>
    });

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

                <div className="m-auto w-9/12 xl:w-7/12 h-screen flex">
                    <div className="m-auto">
                        <div className="flex gap-5">
                            <span className="m-auto text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">01.</span>
                            <span className=" text-3xl font-semibold text-slate-300">About me</span>
                            <div className="flex-1 flex">
                                <div className="m-auto w-full h-0.5 bg-slate-700"></div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-4/5 flex">
                                <div className="m-auto text-slate-300">
                            Hello! My name is Brittany and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!

        Fast-forward to today, and I’ve had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences at Upstatement for a variety of clients.

        I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React.

        Here are a few technologies I’ve been working with recently:
                                </div>
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
                    
                </div>

                <div className="w-9/12 xl:w-8/12 m-auto mt-40">
                    <div className="flex gap-5 mb-40">
                        <span className="m-auto text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">02.</span>
                        <span className="text-3xl font-semibold text-slate-300">Some things I’ve built</span>
                        <div className="flex-1 flex">
                            <div className="m-auto w-full h-0.5 bg-slate-700"></div>
                        </div>
                    </div>
                    <div className="grid gap-60">
                        {projectsPreviews}
                    </div>
                </div>

                <div className="w-6/12 xl:w-5/12 h-screen m-auto text-center text-slate-300 flex-col flex">
                        <div className="m-auto">
                        <div className="flex gap-5 mb-10">
                            <span className="m-auto text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">03.</span>
                            <span className=" text-3xl font-semibold text-slate-300">Contact</span>
                            <div className="flex-1 flex">
                                <div className="m-auto w-full h-0.5 bg-slate-700"></div>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold">
                            Get in Touch
                        </h1>
                        <div className="mt-10">
                            Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
                        </div>
                        <div className="mt-20">
                            <a className="
                                relative rounded py-5 px-7 border-firstColor border-2
                                after:absolute after:h-full after:w-full after:bg-gradient-to-br after:from-firstColor after:to-secondColor after:block after:top-0 after:left-0 after:opacity-0 hover:after:opacity-20 before:duration-300
                            " href="mailto:john.dufayeg@gmail.com">
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-firstColor to-secondColor">
                                    Say hello
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-sm text-slate-300 text-center mb-10">
                    Designed & Built by John Dufaye
                </div>

                <div className="fixed bottom-0 left-10 flex flex-col gap-3 text-2xl text-slate-400 text-center">
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
                </div>

                <div className="fixed w-6 bottom-0 right-12 flex flex-col gap-8 text-slate-400 text-center">
                    <a href="mailto:john.dufayeg@gmail.com" className="[writing-mode:vertical-lr] hover:-translate-y-2 font-semibold from-slate-400 to-slate-400 text-transparent bg-clip-text bg-gradient-to-b hover:from-firstColor hover:to-secondColor duration-300">
                        <span className="p-4">
                            john.dufaye@gmail.com
                        </span>
                    </a>
                    <div className="h-20">
                        <div className="m-auto h-full bg-slate-400 w-0.5"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
