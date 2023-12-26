import { ProjectList } from "@/components/projects";
import { getAllProjects } from "@/lib/cms";

export default async function Projects() {
    const projects = await getAllProjects();
    return <ProjectList projects={projects.items} />;
}
