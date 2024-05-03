import { create } from "lodash";
import tasks from "./tasks";
import projects from "./projects";

console.log("dom.js has been initialized")

const dom = (() => {
    const sideBar = document.querySelector(".projectContainer");
    const newProjectBtn = document.querySelector(".newProject");
    const createProjectBtn = document.getElementById("createProjectBtn");
    const removeProjectBtn = document.getElementById("confirmProjectDelete");
    const editProjectBtn = document.getElementById("editProjectBtn");
    const tasksProjectName = document.querySelector(".tasksProjectName");
    
    newProjectBtn.addEventListener("click", () => openProjectModal());
    createProjectBtn.addEventListener("click", () => {
        createProject()
        updateScreen()
    });
    removeProjectBtn.addEventListener("click", () => {
        projects.deleteProject(projectIndex)
        activeProject = projects.projectList[0]
        updateScreen()
    })
    editProjectBtn.addEventListener("click", () => {
        projects.editProject(projectIndex)
        setActiveProject()
        updateScreen()
        console.log(activeProject)
    })
    
    let projectIndex = "0"
    let activeProject = projects.projectList[projectIndex]
    function setActiveProject() {
        activeProject = projects.projectList[projectIndex]
    }

    function showProjects() {
        sideBar.textContent = '';
        let array = projects.projectList;

        array.forEach((project) => {
            const projectDiv = document.createElement("div")

            const projectName = document.createElement("button");
            projectName.textContent = project.title;
            projectName.addEventListener("click", () => {
                projectIndex = array.indexOf(project);
                setActiveProject()
                updateTasksProjectName()
            })

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.addEventListener("click", () => {
                projectIndex = array.indexOf(project);
                openDeleteProjectModal()
            })

            const editBtn = document.createElement("button");
            editBtn.textContent = "edit";
            editBtn.addEventListener("click", () => {
                projectIndex = array.indexOf(project);
                openEditProjectModal()
            }) 

            projectDiv.appendChild(projectName)
            projectDiv.appendChild(editBtn)
            projectDiv.appendChild(deleteBtn)

            sideBar.appendChild(projectDiv)
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
                    projectIndex = projects.projectList.length - 1
                    setActiveProject()
                    console.log(activeProject)
            }}

        function openDeleteProjectModal() {
            let dialog = document.getElementById("deleteProjectModal");
            dialog.showModal();
        }

        function openEditProjectModal() {
            const dialog = document.getElementById("editProjectModal")
            const input = document.getElementById("editProjectName")
            input.value = activeProject.title
            dialog.showModal();
            input.required = true
        }

    function updateTasksProjectName() {
        if (!projects.projectList.length) {
            tasksProjectName.textContent = "Create a project!"
        } else {
        tasksProjectName.textContent = activeProject.title
    }}

    function updateScreen() {
        showProjects()
        updateTasksProjectName()
    }

    return {
        updateScreen,
        activeProject
            }
})()

export default dom