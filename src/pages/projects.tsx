import NavBar from "../components/NavBar";
import { ProjectContainer, ProjectItem } from "../components/Project";
import { Scrollbars } from "react-custom-scrollbars";
import { getProjects } from "@/lib/projects";
import { ProjectMeta } from "@/lib/types";

type Props = {
  projects: {
    meta: ProjectMeta;
    content: string;
    slug: string;
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
              slug={project.slug}
              project={project.meta}
            />
          ))}
        </ProjectContainer>
      </div>
    </Scrollbars>
  );
}

export async function getStaticProps() {
  return { props: { projects: await getProjects() } };
}
