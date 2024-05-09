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
        }
    }

    function createTask(title, description, date, priority){
        const newTask = new Task(title, description, date, priority)
        projects.getActiveProject().tasks.push(newTask)
    }

    function deleteTask(index) {
        projects.getActiveProject().tasks.splice(index, 1)
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
    }

    return {
        createTask,
        deleteTask,
        editTask
    }
     
})()

export default tasks