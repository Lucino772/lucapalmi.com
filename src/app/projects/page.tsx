import NavBar from "@/components/NavBar";
import { ProjectMeta } from "@/lib/types";
import { ProjectList } from "@/components/projects";

import { getAllProjects } from "@/lib/cms"

async function getProjectsInfo() {
  return await Promise.all(
    (await getAllProjects()).items.map(async (project) => {
      return {
        meta: {
          title: project.fields.title,
          description: project.fields.description,
          links: project.fields.links,
          techs: [],
          thumbnail: project.fields.thumbnail
        } as ProjectMeta,
        slug: project.fields.slug as string
      }
    })
  );
}

export default async function Projects() {
  const projects = await getProjectsInfo();

  return (
    <div style={{ paddingBottom: 100 }}>
      <NavBar showLogo exitDelay={0.2} />
      <ProjectList projects={projects} />
    </div>
  );
}
