import * as fs from "fs/promises";
import * as path from "path";

const _PROJECT_DIRECTORY = "_projects";

type GetProjectReturn = {
  filename: string;
  slug: string;
};

async function getProjects(): Promise<GetProjectReturn[]> {
  const files = await fs.readdir(_PROJECT_DIRECTORY);
  const projects = await Promise.all(
    files.map(async (filename) => {
      return {
        filename: path.join(_PROJECT_DIRECTORY, filename),
        slug: filename.replace(/\.mdx$/, ""),
      } as GetProjectReturn;
    })
  );

  return projects;
}

async function getProject(slug: string): Promise<GetProjectReturn> {
  const realSlug = slug.replace(/\.mdx$/, "");
  return {
    filename: path.join(_PROJECT_DIRECTORY, `${realSlug}.mdx`),
    slug: realSlug,
  } as GetProjectReturn;
}

export { getProject, getProjects };
