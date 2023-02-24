import * as fs from "fs/promises";

import NavBar from "../components/NavBar";
import { ProjectContainer, ProjectItem } from "../components/Project";
import { Scrollbars } from "react-custom-scrollbars";

type Props = {
  projects: {
    title: string;
    description: string;
    thumbnail: string;
    links: {
      github?: string;
      url?: string;
      docs?: string;
    };
  }[];
};

export default function Projects(props: Props) {
  const { projects } = props;

  return (
    <Scrollbars universal autoHeight autoHeightMin="100vh">
      <div style={{ paddingBottom: 100 }}>
        <NavBar showLogo exitDelay={0.2} />
        <ProjectContainer>
          {projects.map((project, i) => (
            <ProjectItem
              key={i}
              enterDelay={0.1 + 0.2 * i}
              title={project.title}
              image={project.thumbnail}
              description={project.description}
              github_url={project.links.github}
              project_url={project.links.url}
              docs_url={project.links.docs}
              portrait={false}
            />
          ))}
        </ProjectContainer>
      </div>
    </Scrollbars>
  );
}

export async function getStaticProps() {
  const files = await fs.readdir("_projects");
  const projects = await Promise.all(
    files.map(async (filename) => {
      const project = await import(`_projects/${filename}`);
      return project.meta;
    })
  );

  return { props: { projects } };
}
