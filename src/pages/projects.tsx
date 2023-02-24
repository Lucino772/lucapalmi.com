import NavBar from "../components/NavBar";
import { ProjectContainer, ProjectItem } from "../components/Project";
import { Scrollbars } from "react-custom-scrollbars";
import { getProjects } from "@/lib/projects";

type Props = {
  projects: {
    meta: {
      title: string;
      thumbnail: string;
      description: string;
      links: {
        github?: string;
        url?: string;
        docs?: string;
      };
    };
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
              title={project.meta.title}
              image={project.meta.thumbnail}
              description={project.meta.description}
              github_url={project.meta.links.github}
              project_url={project.meta.links.url}
              docs_url={project.meta.links.docs}
              portrait={false}
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
