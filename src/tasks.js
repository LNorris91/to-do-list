import projects from "./projects"

console.log("tasks.js has been initialized")

const tasks = (() => {
    let projectList = projects.projectList

    class Task {
        constructor(title, description, date, priority) {
            this.title = title,
            this.description = description,
            this.date = date,
            this.priority = priority
            this.completed = false
            this.key = ''
        }
    }

    function createTask(title, description, date, priority){
        const newTask = new Task(title, description, date, priority)
        newTask.key = projects.getActiveProject().tasks.length
        projects.getActiveProject().tasks.push(newTask)
        localStorage.setItem(`project-${projects.getActiveProject().key}`, JSON.stringify(projects.getActiveProject()))
    }

    function deleteTask(index) {
        projects.getActiveProject().tasks.splice(index, 1)
        localStorage.setItem(`project-${projects.getActiveProject().key}`, JSON.stringify(projects.getActiveProject()))
    }

    function editTask(index) {
        const project = projects.getActiveProject()
        const name = document.getElementById("editTaskName").value
        const description = document.getElementById("editTaskDescription").value
        const date = document.getElementById("editTaskDate").value
        const priority = document.getElementById("editTaskPriority").value

        project.tasks[index].title = name
        project.tasks[index].description = description
        project.tasks[index].date = date
        project.tasks[index].priority = priority

        localStorage.setItem(`project-${projects.getActiveProject().key}`, JSON.stringify(projects.getActiveProject()))
    }

    function toggleComplete(index) {
        const project = projects.getActiveProject()
        project.tasks[index].completed = project.tasks[index].completed === true ? false : true

        localStorage.setItem(`project-${projects.getActiveProject().key}`, JSON.stringify(projects.getActiveProject()))
    }

    return {
        createTask,
        deleteTask,
        editTask,
        toggleComplete
    }
     
})()

export default tasks