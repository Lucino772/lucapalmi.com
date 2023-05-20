import * as fs from "fs/promises";
import matter from "gray-matter";
import * as path from "path";
import { ProjectMeta } from "./types";

const _PROJECT_DIRECTORY = "_projects";

type GetProjectReturn = {
  meta: ProjectMeta,
  content: string,
  slug: string
}

async function getProjects(): Promise<GetProjectReturn[]> {
  const files = await fs.readdir(_PROJECT_DIRECTORY);
  const projects = await Promise.all(
    files.map(async (filename) => {
      const fileBuffer = await fs.readFile(
        path.join(_PROJECT_DIRECTORY, filename)
      );
      const { data: meta, content } = matter(fileBuffer);
      return { meta, content, slug: filename.replace(/\.md$/, "") } as GetProjectReturn;
    })
  );

  return projects;
}

async function getProject(slug: string): Promise<GetProjectReturn> {
  const realSlug = slug.replace(/\.md$/, "");
  const fileBuffer = await fs.readFile(
    path.join(_PROJECT_DIRECTORY, `${realSlug}.md`)
  );
  const { data: meta, content } = matter(fileBuffer);
  return { meta, content, slug: realSlug } as GetProjectReturn;
}

export { getProject, getProjects };
