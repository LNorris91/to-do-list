import _ from "lodash";
import dom from "./dom";
import tasks from "./tasks"
import projects from "./projects"
import './style.css'

if (!localStorage.length) {
    projects.addProject("sample");
    tasks.createTask("Do something", "This is where your description would go", "2024-10-23", "low")
} else {
    projects.getProjects()
    console.log(projects.getActiveProject())
    }
dom.updateScreen()
