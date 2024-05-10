import {formatDistanceToNow, isPast} from "date-fns";

import tasks from "./tasks";
import projects from "./projects";

console.log("dom.js has been initialized")

const dom = (() => {
    const menu = document.getElementById("menu");
    const sideBar = document.querySelector(".sideBar")
    const projectContainer = document.querySelector(".projectContainer");
    const newProjectBtn = document.querySelector(".newProject");
    const createProjectBtn = document.getElementById("createProjectBtn");
    const removeProjectBtn = document.getElementById("confirmProjectDelete");
    const editProjectBtn = document.getElementById("editProjectBtn");
    const tasksProjectName = document.querySelector(".tasksProjectName");
    const tasksContainer = document.querySelector(".tasksContainer");
    const editTaskCloseBtn = document.getElementById("editTaskCloseBtn");
    const updateTaskBtn = document.getElementById("updateTask");
    const completeTaskBtn = document.getElementById("completeTask");
    const deleteTaskBtn = document.getElementById("deleteTask");
    const addTaskBtn = document.querySelector(".addTaskBtn");
    const createTaskBtn = document.getElementById("createTask");
    const confirmTaskDelete = document.getElementById("confirmTaskDelete");

    let taskIndex = ''

    menu.addEventListener("click", showMenu)
    
    newProjectBtn.addEventListener("click", openProjectModal);

    createProjectBtn.addEventListener("click", () => {
        createProject()
        updateScreen()
    });
    removeProjectBtn.addEventListener("click", () => {
        projects.deleteProject(projects.getProjectIndex())
        updateScreen()
    })
    editProjectBtn.addEventListener("click", () => {
        projects.editProject(projects.getProjectIndex())
        updateScreen()
    })

    editTaskCloseBtn.addEventListener("click", closeEditTaskModal);

    updateTaskBtn.addEventListener("click", () => {
        tasks.editTask(taskIndex)
        showTasks()
    })

    completeTaskBtn.addEventListener("click", () => {
        tasks.toggleComplete(taskIndex)
        showTasks()})

    deleteTaskBtn.addEventListener("click", openDeleteTaskModal)

    addTaskBtn.addEventListener("click", openAddTaskModal)

    createTaskBtn.addEventListener("click", createTask)

    confirmTaskDelete.addEventListener("click", () => {
        tasks.deleteTask(taskIndex)
        showTasks()
    })



    function showProjects() {
        projectContainer.textContent = '';
        let array = projects.projectList;

        array.forEach((project) => {
            const projectDiv = document.createElement("div");
            projectDiv.classList = "project"

            const projectName = document.createElement("button");
            projectName.classList = "projectName"
            projectName.textContent = project.title;
            projectName.addEventListener("click", () => {
                projects.setProjectIndex(array.indexOf(project));
                projects.setActiveProject()
                updateScreen()
            })

            const deleteBtn = document.createElement("button");
            deleteBtn.classList = "projectDelete"
            deleteBtn.textContent = "X";
            deleteBtn.addEventListener("click", () => {
                projects.setProjectIndex(array.indexOf(project));
                openDeleteProjectModal()
            })

            const editBtn = document.createElement("button");
            editBtn.classList = "projectEdit"
            editBtn.textContent = "edit";
            editBtn.addEventListener("click", () => {
                projects.setProjectIndex(array.indexOf(project));
                projects.setActiveProject()
                openEditProjectModal()
            }) 

            projectDiv.appendChild(projectName)
            projectDiv.appendChild(editBtn)
            projectDiv.appendChild(deleteBtn)

            projectContainer.appendChild(projectDiv)
        })

        console.log(projects.projectList)
    }

        function openProjectModal() {
            const dialog = document.getElementById("addProjectModal")
            const input = document.getElementById("projectName")
            input.value = ""
            dialog.showModal();
            input.required = true
        }

        function createProject() {
            const title = document.getElementById("projectName").value;
            const input = document.getElementById("projectName")
            
            if (!title) return
                else {
                    projects.addProject(title);
                    input.required = false
            }
        }

        function openDeleteProjectModal() {
            let dialog = document.getElementById("deleteProjectModal");
            dialog.showModal();
        }

        function openEditProjectModal() {
            const dialog = document.getElementById("editProjectModal")
            const input = document.getElementById("editProjectName")
            input.value = projects.getActiveProject().title
            dialog.showModal();
            input.required = true
        }

    function updateTasksProjectName() {
        if (!projects.projectList.length) {
            tasksProjectName.textContent = "Create a project!"
        } else {
        tasksProjectName.textContent = projects.getActiveProject().title
        }
    }


    function showTasks() {
        if(!projects.projectList.length) {
            tasksContainer.textContent = ''
            addTaskBtn.style.visibility = "hidden"
        } else {
        
        addTaskBtn.style.visibility = "visible"
        const tasks = projects.getActiveProject().tasks
        tasksContainer.textContent = ''

        tasks.forEach((task, index) => {
            const taskDiv = document.createElement("div")
            const taskName = document.createElement("p")
            const taskDate = document.createElement("p")

            taskDiv.classList.add("task")
            taskDiv.dataset.index = index

            taskName.classList.add("taskName")
            taskName.textContent = tasks[index].title

            if (isPast(tasks[index].date)) {
                taskDate.textContent = "Overdue!"
            } else {
                taskDate.textContent = `Due in ${formatDistanceToNow(tasks[index].date)}`
                }

            taskDiv.addEventListener("click", () => {
                updateTaskBtn.style.visibility = "visible"
                completeTaskBtn.style.visibility = "visible"
                deleteTaskBtn.style.visibility = "visible"
                createTaskBtn.style.visibility = "hidden"
                openEditTasksModal(index)
            })

            let priority = tasks[index].priority
            switch (priority) {
                case "low":
                    taskDiv.classList.add("low")
                    if (taskDiv.className.includes("medium")) {
                        taskDiv.classList.remove("medium")
                    } else if (taskDiv.className.includes("high")) {
                        taskDiv.classList.remove("high")
                    }
                    break;
                case "medium":
                    taskDiv.classList.add("medium")
                    if (taskDiv.className.includes("low")) {
                        taskDiv.classList.remove("low")
                    } else if (taskDiv.className.includes("high")) {
                        taskDiv.classList.remove("high")
                    }
                    break;
                case "high":
                    taskDiv.classList.add("high")
                    if (taskDiv.className.includes("medium")) {
                        taskDiv.classList.remove("medium")
                    } else if (taskDiv.className.includes("low")) {
                        taskDiv.classList.remove("low")
                    }
                    break;
            }

            let complete = tasks[index].completed
            switch (complete) {
                case true:
                    taskDiv.classList.add("completed")
                    break;
                case false:
                    if (taskDiv.className.includes("completed")) {
                        taskDiv.classList.remove("completed")
                    }
                    break;
            }

            taskDiv.appendChild(taskName)
            taskDiv.appendChild(taskDate)
            tasksContainer.appendChild(taskDiv)
            })

        }
    }

    function openEditTasksModal(index) {
        const dialog = document.getElementById("editTaskModal")
        const task = projects.getActiveProject().tasks[index]
        let name = document.getElementById("editTaskName")
        let description = document.getElementById("editTaskDescription")
        let date = document.getElementById("editTaskDate")
        let priority = document.getElementById("editTaskPriority")

        name.required = true
        date.required = true

        name.value = task.title
        description.value = task.description
        date.value = task.date
        priority.value = task.priority

        taskIndex = index

        dialog.showModal()
    }

    function closeEditTaskModal() {
        const dialog = document.getElementById("editTaskModal")
        let name = document.getElementById("editTaskName")
        let date = document.getElementById("editTaskDate")
        let priority = document.getElementById("editTaskPriority")

        name.required = false
        date.required = false
        priority.required = false

        dialog.close()
    }

    function openDeleteTaskModal() {
        let dialog = document.getElementById("deleteTaskModal");
        dialog.showModal();
    }

    function openAddTaskModal() {
        const dialog = document.getElementById("editTaskModal")
        let name = document.getElementById("editTaskName")
        let description = document.getElementById("editTaskDescription")
        let date = document.getElementById("editTaskDate")
        let priority = document.getElementById("editTaskPriority")

        name.required = true
        date.required = true
        priority.required = true

        updateTaskBtn.style.visibility = "hidden"
        completeTaskBtn.style.visibility = "hidden"
        deleteTaskBtn.style.visibility = "hidden"
        createTaskBtn.style.visibility = "visible"

        name.value = ''
        description.value = ''
        date.value = ''
        priority.value = ''

        dialog.showModal()
    }

    function createTask() {
        let name = document.getElementById("editTaskName").value
        let description = document.getElementById("editTaskDescription").value
        let date = document.getElementById("editTaskDate").value
        let priority = document.getElementById("editTaskPriority").value

        if(name == '' || date == '' || priority == '') {
            return
        } else {
            tasks.createTask(name, description, date, priority)
            showTasks()
    }}

    function showMenu() {
        sideBar.style.visibility = sideBar.style.visibility === "visible" ? "hidden" : "visible"
    }

    function updateScreen() {
        showProjects()
        updateTasksProjectName()
        showTasks()
    }

    return {
        updateScreen,
            }
})()

export default dom