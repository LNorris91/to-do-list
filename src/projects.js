import { get } from "lodash";

console.log("projects.js has been initialized")

const projects = (() => {
    

    const projectList = [
        {
            title: "general",
            tasks: [
                {
                    title: "title here!",
                    description: "this is where your description would go",
                    date: "2024-10-23 ",
                    priority:"low"
                }
            ]
        },
    ];

    class Project {
        constructor(title) {
            this.title = title
            this.tasks = []
        }
    }

    let projectIndex = "0"
    function setProjectIndex(number) {
        return projectIndex = number
    }
    let activeProject = projectList[projectIndex]
    function setActiveProject() {
        return activeProject = projectList[projectIndex]
    }
    const getActiveProject = () => activeProject
    const getProjectIndex = () => projectIndex

    function addProject(title) {
        const newProject = new Project(title);
        projectList.push(newProject);
        projectIndex = projectList.length - 1
        setActiveProject()
        console.log(activeProject.title)
        }

    function deleteProject(index) {
        projectList.splice(index, 1);
        activeProject = projectList[0];
    }

    function editProject(index) {
        const name = document.getElementById("editProjectName").value
        const input = document.getElementById("editProjectName")
            if (!name) return
                else {
                    projectList[index].title = name
                    input.require = false
    }}

    return {
        projectList,
        addProject,
        deleteProject,
        editProject,
        getActiveProject,
        setActiveProject,
        getProjectIndex,
        setProjectIndex
        }
})()

export default projects;