import projects from "./projects"

console.log("tasks.js has been initialized")

const tasks = (() => {
    let projectList = projects.projectList

    class Tasks {
        constructor(title, description, date, priority) {
            this.title = title,
            this.description = description,
            this.date = date,
            this.priority = priority
        }
    }

    function createTask(title, description, date, priority){
        const newTask = new Tasks(title, description, date, priority)
        projectList[activeProject].tasks.push(newTask)
    }

    return {
        createTask,
    }
     
})()

export default tasks