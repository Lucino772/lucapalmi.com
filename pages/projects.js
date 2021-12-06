import NavBar from "../components/NavBar";
import { ProjectContainer, ProjectItem } from "../components/Project";
import { Scrollbars } from "react-custom-scrollbars";

import projects from "./projects.json";


export default function Projects() {
    return (
        <Scrollbars universal autoHeight autoHeightMin="100vh">
            <div style={{paddingBottom: 100}}>
                <NavBar showLogo exitDelay={0.2} />
                <ProjectContainer>
                    {projects.map((project, i) => (
                        <ProjectItem key={i} enterDelay={0.1 + (0.2 * i)} title={project.title} image={project.thumbnail} description={project.description} github_url={project.links.github} project_url={project.links.url} docs_url={project.links.docs} />
                    ))}
                </ProjectContainer>
            </div>
        </Scrollbars>
    )
}