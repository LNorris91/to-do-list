import { create } from "lodash";
import projects from "./projects"
import tasks from "./tasks";

const dom = (() => {
    const sideBar = document.querySelector(".projectContainer");
    const newProjectBtn = document.querySelector(".newProject");
    const createProjectBtn = document.getElementById("createProjectBtn");
    const removeProjectBtn = document.getElementById("confirmProjectDelete");
    const editProjectBtn = document.getElementById("editProjectBtn")
    
    
    newProjectBtn.addEventListener("click", () => openProjectModal());
    createProjectBtn.addEventListener("click", () => createProject());
    removeProjectBtn.addEventListener("click", () => projects.deleteProject(projectIndex))
    editProjectBtn.addEventListener("click", () => projects.editProject(projectIndex))

    let projectIndex = ""

    function showProjects() {
        sideBar.textContent = '';
        let array = projects.projectList;

        array.forEach((project) => {
            const projectDiv = document.createElement("div")

            const projectName = document.createElement("button");
            projectName.textContent = project.title;
            projectName.addEventListener("click", () => {
                projectIndex = array.indexOf(project);
                showTasks(projectIndex)
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
        dialog.showModal();
        input.required = true
    }

    function createProject() {
        const title = document.getElementById("projectName").value;
        const input = document.getElementById("projectName")
        
        if (!title) return
            else {
                projects.addProject(title);
                document.getElementById("projectName").value = ""
                input.required = false
        }}

    function openDeleteProjectModal() {
        let dialog = document.getElementById("deleteProjectModal");
        dialog.showModal();
    }

    function openEditProjectModal() {
        const dialog = document.getElementById("editProjectModal")
        const input = document.getElementById("editProjectName")
        dialog.showModal();
        input.required = true
    }

    return {
        showProjects,
            }
})()

export default dom