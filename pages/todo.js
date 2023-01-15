import Head from 'next/head'
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useQuery, useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import Task from '../components/Task';
import DatesSlider from '../components/DatesSlider';
import TaskModal from '../components/TaskModal';
import CategoriesModal from '../components/CategoriesModal';
import { sameDay, date1BeforeDate2, initDateToMidnight } from '../utilities/Utilities';
import { TodosQuery, CategoriesQuery } from '../utilities/Queries';
import { EditTodoMutation, EditCategoryMutation, ToggleTodoMutation, CreateTodoMutation, CreateCategoryMutation, DeleteTodoMutation, DeleteCategoryMutation } from '../utilities/Mutations';


export default function Todo() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showCategoriesModal, setShowCategoriesModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState("");
    const [taskToEdit, setTaskToEdit] = useState();
    const [activeDate, setActiveDate] = useState(initDateToMidnight(new Date()));
    const [toasts, setToasts] = useState([]);
    const toastRef = useRef('');

    const {loading: todosLoading, error: todosError, data: todosData} = useQuery(TodosQuery);
    const {loading: categoriesLoading, error: categoriesError, data: categoriesData} = useQuery(CategoriesQuery);

    const [createTodoMutate] = useMutation(CreateTodoMutation,{refetchQueries: [{ query: TodosQuery }]});
    const [createCategoryMutate] = useMutation(CreateCategoryMutation,{refetchQueries: [{ query: CategoriesQuery }]});
    const [editTodoMutate] = useMutation(EditTodoMutation);
    const [editCategoryMutate] = useMutation(EditCategoryMutation);
    const [deleteTodoMutate] = useMutation(DeleteTodoMutation,{refetchQueries: [{ query: TodosQuery }]});
    const [deleteCategoryMutate] = useMutation(DeleteCategoryMutation,{refetchQueries: [{ query: CategoriesQuery }, { query: TodosQuery }]});
    const [toggleMutate] = useMutation(ToggleTodoMutation);


    var tasks = (todosData !== undefined ? todosData.todos : []);
    var categories = categoriesData !== undefined ? categoriesData.categories : [];

    // FILTER TASK FROM ACTIVE DATE
    const taskListUnsorted = tasks.filter((task) => {
        if (!date1BeforeDate2(new Date(task.startDate), activeDate)) return;      // Filter if active date is before starting date

        if (!task.repeatable && task.checked.length > 0) {
            if (!sameDay(new Date(task.checked[0]), activeDate)) return;          // Filter if non repeatable task was checked another day
        }

        if (task.repeatable) {
            switch (task.repeat.rule) {
                case "daily":
                    break;
                case "week":
                    var day = activeDate.getDay() === 0 ? 6 : activeDate.getDay() - 1;  //Formate day back to Monday = 0, Tuesday = 1 etc..
                    if (!task.repeat.value.includes(day)) return;
                    break;
                case "month":
                    if (!task.repeat.value.includes(activeDate.getDate())) return;
                    break;
                case "day":
                    var testDate = new Date(new Date(task.startDate));
                    var isMultiple = false;
                    do {
                        if (sameDay(testDate, activeDate)) isMultiple = true;
                        testDate.setDate(testDate.getDate() + task.repeat.value[0]);
                    } while (date1BeforeDate2(testDate, activeDate))
                    if (!isMultiple) return;
                    break;
                default:
                    break;
            }
        }
        return task;
    });

    // SORT TASKS
    const taskListFinished = taskListUnsorted.filter((task) => {
        if (task.checked.find((date) => sameDay(new Date(date), activeDate))) return task;
    });
    const taskListUnfinished = taskListUnsorted.filter((task) => {
        if (!task.checked.find((date) => sameDay(new Date(date), activeDate))) return task;
    });

    const taskList = taskListUnfinished.concat(taskListFinished).map((task) => {
        return (
            <Task
                key={task.id}
                task={task}
                checked = {task.checked.find((date) => sameDay(new Date(date), activeDate)) == undefined ? false : true}
                category={task.category}
                toggleTask={toggleTask}
                deleteTask={askDelete}
                editTask={(id) => { setTaskToEdit(tasks.find((task) => task.id == id)); setShowTaskModal(true) }}
            />
        )
    });

    function toggleTask(id) {
        toggleMutate({variables: {input: {
            todoId: id,
            date: activeDate.getTime()
        }}})
    }

    function editTask(editedTask) {
        var toSend = {
            id: editedTask.id,
            name: editedTask.name,
            categoryId: editedTask.category.id,
            startDate: editedTask.startDate,
            repeatable: editedTask.repeatable,
            repeat: {
                rule: editedTask.repeat.rule,
                value: editedTask.repeat.value == "" ? null : editedTask.repeat.value
            }
        }
        editTodoMutate({
            variables: {input: toSend},
            onCompleted: (data) => {
                displayToast("Task edited !");
            }
        });
    }

    function askDelete(id) {
        setShowDeleteModal(true);
        setIdToDelete(id);
    }

    function deleteTask() {
        deleteTodoMutate({
            variables: {input: idToDelete},
            onCompleted: (data) => {
                if (data.deleteTodo) displayToast("Task deleted!");
            }
        });
    }

    function addTask(newTask) {
        var toSend = {
            name: newTask.name,
            categoryId: newTask.category.id,
            startDate: newTask.startDate,
            repeatable: newTask.repeatable,
            repeat: {
                rule: newTask.repeat.rule,
                value: newTask.repeat.value == "" ? null : newTask.repeat.value
            }
        }

        createTodoMutate({
            variables: {input: toSend},
            onCompleted: (data) => {
                displayToast("New task created!");
            }
        });
    }

    function displayToast(message) {
        const id = nanoid();
        var toast = (
            <motion.div key={id} className="fixed left-1/2 bottom-5 px-8 bg-emerald-500 text-sm rounded-lg"
                initial={{ scale: 0, y: -50-(50*toasts.length), x: "-50%" }}
                animate={{ scale: 1, y: 0-(50*toasts.length), x: "-50%" }}
                exit={{ opacity: 0, y: 10-(50*toasts.length) }}
                transition={{ duration: 0.3, type: "spring" }}
            >
            <div className="text-center flex justify-between items-center py-2 px-3">
                <svg className="absolute w-4 h-4 mr-2 left-3 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                </svg>
                <div className="font-bold text-center w-full">{message}</div>
            </div>
            </motion.div>
        )

        setToasts([...toasts, toast]);
    }

    useEffect(() => {
        setTimeout(() => {
            if (toasts.length != 0) {
                setToasts(toastRef.current.slice(1));}
        }, 3000);
        toastRef.current = toasts;
    }, [toasts])

    function editCategory(editedCategory) {
        editCategoryMutate({
            variables: {input: editedCategory},
            onCompleted: (data) => {
                displayToast("Category edited !");
            }
        });
    }

    function createCategory(newCategory) {
        delete newCategory.id
        createCategoryMutate({
            variables: {input: newCategory},
            onCompleted: (data) => {
                displayToast("Category created !");
            }
        });
    }

    function deleteCategory(id) {
        deleteCategoryMutate({
            variables: {input: id},
            onCompleted: (data) => {
                if (data.deleteCategory) displayToast("Category deleted!");
            }
        });
    }

    useEffect(() => {
        document.addEventListener("keydown", function(event){
            if (event.key == "Escape") {
                setShowDeleteModal(false);
                setShowTaskModal(false);
                setShowCategoriesModal(false);
            }
        });
    
        document.addEventListener("mouseup", function(event){
            var container = document.getElementsByClassName('modal');
    
            if (container.length === 0) return;
            if (container[0].contains(event.target)) return;
    
            setShowDeleteModal(false);
            setShowTaskModal(false);
            setShowCategoriesModal(false);
        });
    })

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet" />
            </Head>
            
            <div className="flex flex-col w-full h-screen pb-36 md:pb-20">
                {/* DATES */}
                <DatesSlider activeDate={activeDate} setActiveDate={setActiveDate} tasks={tasks} />

                {/* TASKS LIST */}
                <AnimatePresence>
                    { (todosLoading || categoriesLoading) ? (    
                        <motion.div
                            key="loading"
                            transition={{duration: 0.7}}
                            exit={{opacity: 0, y: 400}}
                            className="flex top-0 w-full h-full fixed place-content-center inline-flex justify-center items-center gap-8"
                        >
                            <motion.div
                                animate={{y: [0, -100, 0], backgroundColor: ["rgb(20 184 166)", "rgb(232 121 249)", "rgb(20 184 166)"]}}
                                transition={{repeat: Infinity, repeatDelay: 0.2, duration: 0.8 }}
                                className="w-10 h-10 bg-teal-500 rounded-full">
                            </motion.div>
                            <motion.div
                                animate={{y: [0, -100, 0], backgroundColor: ["rgb(20 184 166)", "rgb(232 121 249)", "rgb(20 184 166)"]}}
                                transition={{delay: 0.1, repeat: Infinity, repeatDelay: 0.2, duration: 0.8 }}
                                className="w-10 h-10 bg-teal-500 rounded-full">
                            </motion.div>
                            <motion.div
                                animate={{y: [0, -100, 0], backgroundColor: ["rgb(20 184 166)", "rgb(232 121 249)", "rgb(20 184 166)"]}}
                                transition={{delay: 0.1*2, repeat: Infinity, repeatDelay: 0.2, duration: 0.8 }}
                                className="w-10 h-10 bg-teal-500 rounded-full">
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="flex justify-center overflow-y-scroll h-full"
                            transition={{duration: 0.7, delay: 0.2}}
                            initial={{opacity: 0, y: -300}}
                            animate={{opacity: 1, y:0}}>
                            <div className="w-full lg:w-3/5 xl:w-2/5 relative h-fit grid gap-2">
                                <LayoutGroup>
                                    <AnimatePresence>
                                        {taskList}
                                    </AnimatePresence>
                                </LayoutGroup>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>  
            </div>

            

            <div onClick={() => setShowCategoriesModal(true)} className="fixed bottom-6 md:bottom-36 right-1/4 translate-x-1/2 md:translate-x-0 md:right-10 bg-pink-500 w-12 h-8 md:w-12 md:h-12 inline-flex justify-center items-center rounded-lg md:rounded-2xl cursor-pointer shadow-md hover:bg-pink-700 duration-150">
                <i className="fa-solid fa-tags" style={{ fontSize: "1.2em" }}></i>
            </div>

            <div onClick={() => { setTaskToEdit(); setShowTaskModal(true) }} className="fixed bottom-4 md:bottom-10 right-1/2 translate-x-1/2 md:translate-x-0 md:right-10 bg-blue-500 w-20 h-12 md:w-20 md:h-20 inline-flex justify-center items-center rounded-lg md:rounded-2xl cursor-pointer shadow-md hover:bg-blue-700 duration-150">
                <i className="fa-solid fa-plus" style={{ fontSize: "1.5em" }}></i>
            </div>

            <AnimatePresence>
                {showTaskModal ? (
                    <TaskModal addTask={addTask} editTask={editTask} setShowModal={setShowTaskModal} categories={categories} task={taskToEdit} />
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {showDeleteModal ? (
                    <>
                        <motion.div id="modal" aria-hidden="true" className="z-20 top-0 w-full h-full fixed bg-black/70 place-content-center inline-flex justify-center items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        ></motion.div>
                        <div className="z-30 top-0 w-full h-full fixed place-content-center inline-flex justify-center items-center">
                            <motion.div className="modal items-center bg-gray-700 text-gray-300 rounded-lg p-8"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.3, type: "spring" }}
                            >
                                <div className="flex justify-center mb-7">
                                    <i className="fa-solid fa-exclamation-circle" style={{ fontSize: "2em" }}></i>
                                </div>
                                <h3 className="text-lg mb-5">Are you sure you want to delete this task?</h3>
                                <div className="flex space-x-5">
                                    <button className="w-full border border-gray-400 hover:bg-gray-600 rounded-lg text-center px-3 py-2" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                    <button className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-center px-3 py-2" onClick={() => { deleteTask(); setShowDeleteModal(false) }}>Confirm</button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {showCategoriesModal ? (
                    <CategoriesModal categories={categories} setShowModal={setShowCategoriesModal} editCategory={editCategory} createCategory={createCategory} deleteCategory={deleteCategory} />
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {toasts}
            </AnimatePresence>

        </div>
    )
}
