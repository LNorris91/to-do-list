
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

    function addProject(title) {
        const newProject = new Project(title);
        projectList.push(newProject);
    }

    function deleteProject(index) {
        projectList.splice(index, 1);
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
        editProject
    }
})()

export default projects;