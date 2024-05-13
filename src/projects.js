import { indexOf } from "lodash";

console.log("projects.js has been initialized")

const projects = (() => {
    
    const projectList = [
        // {
        //     title: "sample project",
        //     tasks: [
        //         {
        //             title: "title here!",
        //             description: "this is where your description would go",
        //             date: "2024-10-23",
        //             priority:"low",
        //             completed: false
        //         }
        //     ]
        // },
    ];

    class Project {
        constructor(title) {
            this.title = title
            this.tasks = []
            this.key = ''
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
        projectIndex = projectList.length - 1;
        newProject.key = projectIndex
        setActiveProject()
        incrementProjectId()
        localStorage.setItem(`project-${projectIndex}`, JSON.stringify(newProject))
        }

    function deleteProject(index) {
        localStorage.removeItem(`project-${projectList[index].key}`)
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
                }
        localStorage.setItem(`project-${index}`, JSON.stringify(projectList[index]))
    }

    function getProjects() {
        if (localStorage.length !== 0) {
            for (let i = 0 ; i <= getProjectId() ; i++) {
                localStorage.getItem(`project-${i}`) ? projectList.push(JSON.parse(localStorage.getItem(`project-${i}`))) : null;
            }
        } 
        activeProject = projectList[0]
    }

    function getProjectId() {
        if (!localStorage.getItem("projectId")) {
            localStorage.setItem("projectId", 0);
        }
        return localStorage.getItem("projectId");
    };
    
    function incrementProjectId() {
        let projectId = localStorage.getItem("projectId");
        projectId++
        localStorage.setItem("projectId", projectId);
    };

    return {
        projectList,
        addProject,
        deleteProject,
        editProject,
        getActiveProject,
        setActiveProject,
        getProjectIndex,
        setProjectIndex,
        getProjects
        }
})()

export default projects;