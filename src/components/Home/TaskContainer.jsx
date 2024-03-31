
import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { toast } from 'react-hot-toast'
import { FaEdit } from "react-icons/fa";





const TaskContainer = () => {


    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [assigneesName, setAssigneesName] = useState("");

    const [searchInput , setSearchInput] = useState(""); // searcch aasignees name

    const [allTodos, setAllTodos] = useState([]);   //all task
    const [completedTask, setCompletedTask] = useState([]); // all completed task

    const [completeScreen, setCompleteScreen] = useState(false); //

    const [currentEdit, setCurrentEdit] = useState("");

    const [currentEditedItem, setCurrentEditedItem] = useState("");



        // filter container logic here ..searchInput and setSerchInput   
     
    const filterContent = (searchInput) => {
        return searchInput.toLowerCase().includes(searchInput.toLowerCase());
      };



    //handle added task logic here...

    const handleAddTasks = (e) => {


        let newTaskItem = {

            name: taskName,
            description: taskDescription,
            assigneesName: assigneesName
        }

        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTaskItem);
        setAllTodos(updatedTodoArr);
        localStorage.setItem("Task-List", JSON.stringify(updatedTodoArr))
    };

    //logic Delete Task here...

    const handleDeleteTask = index => {

        const deleteTask = window.confirm("Are you sure delete task ")

        if (deleteTask) {


        }


        let reduceTaskList = [...allTodos];

        //splice method will remove the item has specific index

        reduceTaskList.splice(index, 1);

        localStorage.setItem('Task-List', JSON.stringify(reduceTaskList));

        setAllTodos(reduceTaskList);






    }


    //handle completed task logic here.

    const handleCompleteTask = (index) => {



        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = dd + " - " + mm + "-" + yyyy + "at" + h + ":" + m + ":" + s;


        let filteredItem = {

            ...allTodos[index],
            completedOn: completedOn
        }

        let updatedCompletedArr = [...completedTask];
        updatedCompletedArr.push(filteredItem);
        setCompletedTask(updatedCompletedArr);
        handleDeleteTask(index);
        localStorage.setItem("Completed-Task", JSON.stringify(updatedCompletedArr))

    }


    // if you want to delete complete Task then logic here here...

    //  const handleCompletedDeleteTask=(index)=>{

    //     let reduceTaskList = [...completedTask];

    //         //splice method will remove the item has specific index

    //         reduceTaskList.splice(index);

    //         localStorage.setItem('Completed-Task', JSON.stringify(reduceTaskList));

    //         setCompletedTask(reduceTaskList);


    //  }


    useEffect(() => {

        let saveTask = JSON.parse(localStorage.getItem("Task-List"));

        let saveCompleteTask = JSON.parse(localStorage.getItem("Completed-Task"));

        if (saveTask) {

            setAllTodos(saveTask);

        }
        if (saveCompleteTask) {
            setCompletedTask(saveCompleteTask);
        }

    }, [])



    //All handle edited task logic here...

    const handleEditTask = (ind, item) => {
        console.log(ind)
        setCurrentEdit(ind)
        setCurrentEditedItem(item)

    }

    const handleUpdateTaskTitle = (value) => {

        setCurrentEditedItem((prev) => {
            return { ...prev, name: value }

        })

    }

    const handleUpdateTaskDescription = (value) => {

        setCurrentEditedItem((prev) => {
            return { ...prev, description: value }

        })


    }


    const handleUpdateTaskAssigneesName = (value) => {

        setCurrentEditedItem((prev) => {
            return { ...prev, assigneesName: value }

        })


    }


    const handleUpdateTaskButton = () => {

        let newTodo = [...allTodos];

        //find current index that we needs to updated

        newTodo[currentEdit] = currentEditedItem;
        setAllTodos(newTodo);
        setCurrentEdit("");


    }




    return (
        <>

            <div className='task-container'>

                <div className='task-container-items'>

                    <h2 className='task-container-logo-name'>Task Board</h2>

                    <div className='first-nav'>

                        <div className='filter-container'>

                            <label htmlFor="" className="lbl">
                                <span className='lbl-name' >Filter</span>
                                <input type="text" placeholder='Assignee Name' 
                                value={searchInput} className='filter-input'
                                onChange = { (e)=>{ setSearchInput(e.target.value)}}
                                
                                />
                            </label>

                        </div>

                        {/* <div className='prority-container'>

                            <select className='optionlist-container' >
                                <option value="" className='optionlist'>Select Prority</option>
                                <option value='P0' className='optionlist' >P0</option>
                                <option value='P1' className='optionlist'>P1</option>
                                <option value='P2' className='optionlist'>P2</option>
                            </select>

                        </div> */}

                        <div className='date-container'>

                            <input type="datetime-local" className='date-input' />
                        </div>

                        {/* <div className="task-added-logo-btn-container">     
                            

                            </div> */}




                        <div className='task-added-container'>

                            <IoMdAddCircle className='task-added-logo  btn' title="add task" onClick={() => document.getElementById('my_modal_1').showModal()} />

                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            {/* <button className="" >open modal</button> */}
                            <dialog id="my_modal_1" className="modal created-task-form-container">

                                <div className="modal-box ">

                                    <div className="modal-action  ">

                                        <form method="dialog" className="form">
                                            {/* if there is a button in form, it will close the modal */}
                                            <h3 className="font-bold text-lg heading">Create Task</h3>
                                            <div className='form-element'>
                                                <label htmlFor="" className="form-elements-label">Task Name</label>
                                                <input type="text" id='task-name' value={taskName}
                                                    className='created-task-input'
                                                    placeholder='Enter The Task Name'
                                                    onChange={(e) => { setTaskName(e.target.value); }}
                                                />

                                            </div>
                                            <div className='form-element'>
                                                <label htmlFor="" className="form-elements-label">Description</label>
                                                <textarea name="" id="task-description"
                                                    value={taskDescription}
                                                    cols="2" rows="3"
                                                    onChange={(e) => { setTaskDescription(e.target.value) }}
                                                ></textarea>

                                            </div>

                                            <div className='form-element'>
                                                <label htmlFor="" className="form-elements-label">Assignees</label>
                                                <input type="text" id='Assigees-name'
                                                    value={assigneesName}
                                                    className='created-task-input'

                                                    placeholder='Assignees Name'
                                                    onChange={(e) => { setAssigneesName(e.target.value) }}
                                                />

                                            </div>

                                            {/* <div className='form-element'>
                    <label htmlFor="">Prority</label>
                    <select className='optionlist-container' >
                        <option value="" className='optionlist'>Select Prority</option>
                        <option value='P0' className='optionlist' >P0</option>
                        <option value='P1' className='optionlist'>P1</option>
                        <option value='P2' className='optionlist'>P2</option>
                    </select>
                </div> */}

                                            <div className='form-element'>
                                                <button onClick={handleAddTasks} className='task-submit-button'>Add</button>
                                                <button className="btn  close-btn">Close</button>

                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </dialog>


                        </div>


                    </div>


                    <div className="completed-task-button">
                        <button className={`all-task-btn  ${completeScreen === false && 'active'}`} onClick={() => { setCompleteScreen(false) }}>All Task</button>
                        <button className={`completed-task-btn ${completeScreen === false && 'active'}`} onClick={() => { setCompleteScreen(true) }} >Completed Task</button>

                    </div>


                    <div className="Added-task-container">


                        {/* if complete scrren is false then only open the all task list */}

                        {

                            completeScreen === false && allTodos.map((item, index) => {


                                {/* currentEdit Item is equal to index then display other UI otherwise diplay the all task */ }

                                if (currentEdit === index) {
                                    return (


                                        //edit task form here...



                                        //   <dialog id="my_modal_1" className="modal created-task-form-container"> 

                                        //   <div className="modal-box ">

                                        //     <div className="modal-action" >

                                        <div id="my_modal_1" className="modal created-task-form-container  modal-box modal-action" key={index}>

                                            <form method="dialog" className="form">
                                                {/* if there is a button in form, it will close the modal */}

                                                <h3 className="font-bold text-lg heading">Create Task</h3>
                                                <div className='form-element'>
                                                    <label htmlFor="">Task Name</label>
                                                    <input type="text" id='task-name' value={currentEditedItem.name}
                                                        className='created-task-input'
                                                        placeholder='Enter The updated Task Name'
                                                        onChange={(e) => { handleUpdateTaskTitle(e.target.value) }}
                                                    />

                                                </div>
                                                <div className='form-element'>
                                                    <label htmlFor="">Description</label>
                                                    <textarea name="" id="task-description"
                                                        value={currentEditedItem.description}
                                                        cols="2" rows="3"
                                                        onChange={(e) => { handleUpdateTaskDescription(e.target.value) }}
                                                    ></textarea>

                                                </div>

                                                <div className='form-element'>
                                                    <label htmlFor="">Assignees</label>
                                                    <input type="text" id='Assigees-name'
                                                        value={currentEditedItem.assigneesName}
                                                        className='created-task-input'
                                                        placeholder='Assignees Name'
                                                        onChange={(e) => { handleUpdateTaskAssigneesName(e.target.value) }}
                                                    />

                                                </div>

                                                {/* <div className='form-element'>
                                                <label htmlFor="">Prority</label>
                                                <select className='optionlist-container' >
                                                    <option value="" className='optionlist'>Select Prority</option>
                                                    <option value='P0' className='optionlist' >P0</option>
                                                    <option value='P1' className='optionlist'>P1</option>
                                                    <option value='P2' className='optionlist'>P2</option>
                                                </select>
                                            </div> */}

                                                <div className='form-element'>
                                                    <button onClick={handleUpdateTaskButton} className='task-submit-button'>Update</button>
                                                    {/* <button className="btn  close-btn">Close</button> */}

                                                </div>

                                            </form>

                                        </div>


                                        //   </div>
                                        //   </div>


                                        // </dialog>




                                    )


                                } else {

                                    return (

                                        <div className="task-list-items" key={index}>

                                            <div className="task-list-items-details">
                                                <h3>{item.name} </h3>
                                                <p>{item.description}</p>
                                                <p>Assign By : {item.assigneesName}</p>

                                            </div>



                                            {/* document.getElementById('my_modal_1').showModal() */}
                                            <div className="icons-container">
                                                <MdDeleteOutline className="icon" onClick={() => { handleDeleteTask(index) }} title="Delete" />
                                                <BsCheckLg className="check-icon" onClick={() => { handleCompleteTask(index) }} title="Completed" />

                                                {/* onClick={() => document.getElementById('my_modal_1').showModal()} */}
                                                <FaEdit className="check-icon" onClick={() => { handleEditTask(index, item) }} title="Edit" />

                                            </div>



                                        </div>
                                    );


                                }


                            })

                        }


                        {/* if  complete screen is true then open the only completed task */}

                        {

                            completeScreen === true && completedTask.map((item, index) => {

                                return (

                                    <div className="task-list-items" key={index}>

                                        <div>
                                            <h3>{item.name} </h3>
                                            <p>{item.description}</p>
                                            <p><small>Completed On :{item.completedOn} </small></p>
                                            <p>Assign By : {item.assigneesName}</p>

                                        </div>

                                        <div>
                                            {/* <MdDeleteOutline className="icon" onClick={() => { handleCompletedDeleteTask(index) }} title="Delete" />
                                        <BsCheckLg className="check-icon" onClick={() => { handleCompleteTask(index) }} title="Completed" /> */}

                                        </div>



                                    </div>
                                )
                            })


                        }

                    </div>

                </div>

            </div>
        </>
    )
}

export default TaskContainer



