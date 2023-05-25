import NavBar from "../components/NavBar";
import { Scrollbars } from "react-custom-scrollbars";
import { getProjects } from "@/lib/projects";
import { ProjectMeta } from "@/lib/types";
import { ProjectList } from "@/components/projects";

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
        <ProjectList projects={projects} />
      </div>
    </Scrollbars>
  );
}

export async function getStaticProps() {
  return { props: { projects: await getProjects() } };
}
