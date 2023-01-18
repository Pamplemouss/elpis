import Head from 'next/head'
import { motion } from "framer-motion"
import Link from 'next/link'
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
        return <ProjectPreview data={project}></ProjectPreview>
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


                <div className="w-full mt-40 grid gap-60">
                    {projectsPreviews}
                </div>
            </div>
        </>
    )
}
