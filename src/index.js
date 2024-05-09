import _ from "lodash";
import dom from "./dom";
import projects from "./projects";
import tasks from "./tasks";
import './style.css'

tasks.createTask("Groceries", "go to meijer and get groceries", "2024-06-09", "medium")
dom.updateScreen()
